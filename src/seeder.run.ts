import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource, In, Repository } from 'typeorm';
import { OccasionType } from 'entity/venue/occasion_type.entity';
import { Country } from 'entity/property/country.entity';
import { City } from 'entity/property/city.entity';
import { Permission } from 'entity/permission/permissions.entity';
import { EPermissions } from 'enums/Permissions.enum';
import { Role } from 'entity/permission/role.entity';
import { ERole } from 'enums/Role.enum';
import { Media } from 'entity/media/media.entity';
type CitySeedInput = { name: string; country: string };

export const seedOccasionTypes = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository(OccasionType);

  const items = [{ name: { en: 'Wedding', ar: 'زفاف' } }, { name: { en: 'Birthday', ar: 'عيد ميلاد' } }, { name: { en: 'Conference', ar: 'مؤتمر' } }, { name: { en: 'Concert', ar: 'حفلة موسيقية' } }, { name: { en: 'Exhibition', ar: 'معرض' } }, { name: { en: 'Graduation', ar: 'حفل تخرج' } }, { name: { en: 'Corporate', ar: 'فعالية الشركات' } }, { name: { en: 'Engagement', ar: 'خطوبة' } }, { name: { en: 'Baby Shower', ar: 'حفل استقبال مولود' } }];

  for (const item of items) {
    const exists = await repo.createQueryBuilder('o').where("o.name->>'en' = :en", { en: item.name.en }).getOne();

    if (!exists) {
      const entity = repo.create(item);
      await repo.save(entity);
    }
  }

  console.log('✅ OccasionTypes seeded');
};

export const seedCities = async (dataSource: DataSource) => {
  const cityRepo: Repository<City> = dataSource.getRepository(City);
  const countryRepo: Repository<Country> = dataSource.getRepository(Country);

  const items: CitySeedInput[] = [
    { name: 'Cairo', country: 'Egypt' },
    { name: 'Giza', country: 'Egypt' },
    { name: 'Alexandria', country: 'Egypt' },
    { name: 'Riyadh', country: 'Saudi Arabia' },
    { name: 'Jeddah', country: 'Saudi Arabia' },
    { name: 'Dammam', country: 'Saudi Arabia' },
    { name: 'Dubai', country: 'United Arab Emirates' },
    { name: 'Abu Dhabi', country: 'United Arab Emirates' },
    { name: 'Sharjah', country: 'United Arab Emirates' },
    { name: 'Amman', country: 'Jordan' },
    { name: 'Beirut', country: 'Lebanon' },
    { name: 'Doha', country: 'Qatar' },
  ];

  for (const item of items) {
    let country = await countryRepo.findOne({ where: { name: item.country } });
    if (!country) {
      // If you prefer strict integrity, throw instead
      country = await countryRepo.save(countryRepo.create({ name: item.country }));
    }

    const exists = await cityRepo.createQueryBuilder('c').leftJoin('c.country', 'country').where('LOWER(c.name) = LOWER(:name)', { name: item.name }).andWhere('country.id = :countryId', { countryId: country.id }).withDeleted().getOne();

    if (!exists) {
      await cityRepo.save(cityRepo.create({ name: item.name, country }));
    } else if (exists.deletedAt) {
      await cityRepo.restore(exists.id);
    }
  }

  console.log('✅ Cities seeded');
};

export const seedCountries = async (dataSource: DataSource) => {
  const repo: Repository<Country> = dataSource.getRepository(Country);

  const items: Array<Pick<Country, 'name'>> = [{ name: 'Egypt' }, { name: 'Saudi Arabia' }, { name: 'United Arab Emirates' }, { name: 'Jordan' }, { name: 'Lebanon' }, { name: 'Qatar' }, { name: 'Kuwait' }, { name: 'Bahrain' }, { name: 'Oman' }, { name: 'Turkey' }, { name: 'Morocco' }, { name: 'Tunisia' }];

  for (const item of items) {
    const exists = await repo
      .createQueryBuilder('c')
      .where('LOWER(c.name) = LOWER(:name)', { name: item.name })
      .withDeleted() // skip if soft-deleted version exists; resurrect instead
      .getOne();

    if (!exists) {
      const entity = repo.create(item);
      await repo.save(entity);
    } else if (exists.deletedAt) {
      // revive soft-deleted record to prevent dupes
      await repo.restore(exists.id);
    }
  }

  console.log('✅ Countries seeded');
};

export const seedPermissions = async (dataSource: DataSource) => {
  const permRepo: Repository<Permission> = dataSource.getRepository(Permission);

  // Deduplicate enum values (you have duplicates pointing to 'admin.admin')
  const allPermValues = Array.from(new Set(Object.values(EPermissions)));

  for (const permission_name of allPermValues) {
    const existing = await permRepo.createQueryBuilder('p').where('LOWER(p.permission_name) = LOWER(:name)', { name: permission_name }).withDeleted().getOne();

    if (!existing) {
      await permRepo.save(permRepo.create({ permission_name }));
    } else if ((existing as any).deletedAt) {
      await permRepo.restore(existing.id);
    }
  }

  console.log('✅ Permissions seeded');
};

async function loadPerms(permRepo: Repository<Permission>, names: string[]) {
  if (!names.length) return [];
  // Normalize unique
  const unique = Array.from(new Set(names));
  // Using IN is case-sensitive; we’ll fetch broadly then filter in JS for safety
  const rough = await permRepo.find({ where: { permission_name: In(unique) } });
  const map = new Map(rough.map(p => [p.permission_name.toLowerCase(), p]));
  return unique.map(n => map.get(n.toLowerCase())).filter(Boolean) as Permission[];
}

export const seedRoles = async (dataSource: DataSource) => {
  const roleRepo = dataSource.getRepository(Role);
  const permRepo = dataSource.getRepository(Permission);

  // All permissions
  const ALL = Array.from(new Set(Object.values(EPermissions)));

  // Pragmatic subsets (tune to your policy)
  const READ_ONLY = ALL.filter(p => p.endsWith('.read'));
  const VENDOR_CRUD = ALL.filter(
    p =>
      // vendor can CRUD their venue-side entities, reservations, media, etc.
      p.startsWith('venues.') || p.startsWith('venue_') || p.startsWith('services.') || p.startsWith('equipment.') || p.startsWith('media.') || p.startsWith('venue_gallery.') || p.startsWith('venue_calendar.') || p.startsWith('venue_package') || p.startsWith('reservations.') || p.startsWith('communication.') || p.startsWith('tickets.') || p.startsWith('payments.') || p.startsWith('website_settings.read') // read settings only
  );

  // Role → permission names
  const rolePerms: Record<ERole, string[]> = {
    [ERole.ADMIN]: ALL,
    [ERole.VENDOR]: Array.from(new Set([...READ_ONLY, ...VENDOR_CRUD])),
    [ERole.USER]: READ_ONLY, // users get read-only across the system by default
  };

  for (const roleName of Object.values(ERole)) {
    // Upsert role
    let role = await roleRepo.createQueryBuilder('r').where('LOWER(r.name) = LOWER(:n)', { n: roleName }).withDeleted().getOne();

    if (!role) {
      role = roleRepo.create({ name: roleName });
      role = await roleRepo.save(role);
    } else if ((role as any).deletedAt) {
      await roleRepo.restore(role.id);
      role = await roleRepo.findOneOrFail({ where: { id: role.id } });
    }

    // Attach permissions
    const perms = await loadPerms(permRepo, rolePerms[roleName] || []);
    role.permissions = perms;
    await roleRepo.save(role);
  }

  console.log('✅ Roles seeded (with permissions)');
};

export const seedMedia = async (dataSource: DataSource) => {
  const repo: Repository<Media> = dataSource.getRepository(Media);

   const totalIcons = 287;  

  const items: Partial<Media>[] = [];
  for (let i = 0; i < totalIcons; i++) {
    items.push({
      model_id: 0, // you can adjust if linked to another model
      model_type: 'icon',
      collection_name: 'system-icons',
      name: `icon-${i}`,
      url: `https://api.venuat.com/uploads/icons/${i}.png`,
      file_name: `${i}.png`,
      mime_type: 'image/png',
      disk: 'local',
      size: 0, // you can compute real file size if needed
      manipulations: {},
      custom_properties: {},
      order: i,
    });
  }

  for (const item of items) {
    const exists = await repo.findOne({ where: { url: item.url } });
    if (!exists) {
      const entity = repo.create(item);
      await repo.save(entity);
    }
  }

  console.log('✅ Media (icons) seeded');
};



async function runSeeder() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'], // Adjusted path
    synchronize: true,
  });

  try {
    await dataSource.initialize();
		
		// await seedOccasionTypes(dataSource)
    // await seedCountries(dataSource);
    // await seedCities(dataSource);
		// await seedPermissions(dataSource);
    // await seedRoles(dataSource);
    await seedMedia(dataSource);

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder();
