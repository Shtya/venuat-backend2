import { DataSource, Repository } from 'typeorm';
import * as argon from 'argon2';

// Helper function to generate random data
const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
const randomBool = () => Math.random() > 0.5;
const randomDate = (start: Date, end: Date) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));



export const seedCountries = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('Countries');

  const data = [
    { name: 'United Arab Emirates', created_at: new Date(), updated_at: new Date() },
    { name: 'Saudi Arabia', created_at: new Date(), updated_at: new Date() },
    { name: 'Qatar', created_at: new Date(), updated_at: new Date() },
  ];

  await repo.query(`TRUNCATE "countries" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedCities = async (dataSource: DataSource, countries: any[]) => {
  const repo = dataSource.getRepository('City');

  const data = [
    { name: 'Dubai', country_id: countries[0].id, created_at: new Date(), updated_at: new Date() },
    { name: 'Abu Dhabi', country_id: countries[0].id, created_at: new Date(), updated_at: new Date() },
    { name: 'Riyadh', country_id: countries[1].id, created_at: new Date(), updated_at: new Date() },
  ];

  await repo.query(`TRUNCATE "city" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedRoles = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('Roles');

  const data = [{ name: 'admin' }, { name: 'vendor' }, { name: 'user' }];

  await repo.query(`TRUNCATE "roles" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedPermissions = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('Permissions');

  const data = [
    { permission_name: 'admin.admin' },
    { permission_name: 'users.create' },
    { permission_name: 'users.read' },
    { permission_name: 'users.update' },
    { permission_name: 'users.delete' },
    { permission_name: 'user_preferences.create' },
    { permission_name: 'user_preferences.read' },
    { permission_name: 'user_preferences.update' },
    { permission_name: 'user_preferences.delete' },
    { permission_name: 'user_notifications.create' },
    { permission_name: 'user_notifications.read' },
    { permission_name: 'user_notifications.update' },
    { permission_name: 'user_notifications.delete' },
    { permission_name: 'permissions.create' },
    { permission_name: 'permissions.read' },
    { permission_name: 'permissions.update' },
    { permission_name: 'permissions.delete' },
    { permission_name: 'roles.create' },
    { permission_name: 'roles.read' },
    { permission_name: 'roles.update' },
    { permission_name: 'roles.delete' },
    { permission_name: 'role_permissions.create' },
    { permission_name: 'role_permissions.read' },
    { permission_name: 'role_permissions.update' },
    { permission_name: 'role_permissions.delete' },
    { permission_name: 'properties.create' },
    { permission_name: 'properties.read' },
    { permission_name: 'properties.update' },
    { permission_name: 'properties.delete' },
    { permission_name: 'cities.create' },
    { permission_name: 'cities.read' },
    { permission_name: 'cities.update' },
    { permission_name: 'cities.delete' },
    { permission_name: 'countries.create' },
    { permission_name: 'countries.read' },
    { permission_name: 'countries.update' },
    { permission_name: 'countries.delete' },
    { permission_name: 'occasion_types.create' },
    { permission_name: 'occasion_types.read' },
    { permission_name: 'occasion_types.update' },
    { permission_name: 'occasion_types.delete' },
    { permission_name: 'features.create' },
    { permission_name: 'features.read' },
    { permission_name: 'features.update' },
    { permission_name: 'features.delete' },
    { permission_name: 'venue_feature.create' },
    { permission_name: 'venue_feature.read' },
    { permission_name: 'venue_feature.update' },
    { permission_name: 'venue_feature.delete' },
    { permission_name: 'venues.create' },
    { permission_name: 'venues.read' },
    { permission_name: 'venues.update' },
    { permission_name: 'venues.delete' },
    { permission_name: 'equipment.create' },
    { permission_name: 'equipment.read' },
    { permission_name: 'equipment.update' },
    { permission_name: 'equipment.delete' },
    { permission_name: 'venue_equipment.create' },
    { permission_name: 'venue_equipment.read' },
    { permission_name: 'venue_equipment.update' },
    { permission_name: 'venue_equipment.delete' },
    { permission_name: 'services.create' },
    { permission_name: 'services.read' },
    { permission_name: 'services.update' },
    { permission_name: 'services.delete' },
    { permission_name: 'venue_service.create' },
    { permission_name: 'venue_service.read' },
    { permission_name: 'venue_service.update' },
    { permission_name: 'venue_service.delete' },
    { permission_name: 'policies.create' },
    { permission_name: 'policies.read' },
    { permission_name: 'policies.update' },
    { permission_name: 'policies.delete' },
    { permission_name: 'venue_policy.create' },
    { permission_name: 'venue_policy.read' },
    { permission_name: 'venue_policy.update' },
    { permission_name: 'venue_policy.delete' },
    { permission_name: 'venue_calendar.create' },
    { permission_name: 'venue_calendar.read' },
    { permission_name: 'venue_calendar.update' },
    { permission_name: 'venue_calendar.delete' },
    { permission_name: 'venue_package.create' },
    { permission_name: 'venue_package.read' },
    { permission_name: 'venue_package.update' },
    { permission_name: 'venue_package.delete' },
    { permission_name: 'venue_package_service.create' },
    { permission_name: 'venue_package_service.read' },
    { permission_name: 'venue_package_service.update' },
    { permission_name: 'venue_package_service.delete' },
    { permission_name: 'venue_package_equipment.create' },
    { permission_name: 'venue_package_equipment.read' },
    { permission_name: 'venue_package_equipment.update' },
    { permission_name: 'venue_package_equipment.delete' },
    { permission_name: 'venue_gallery.create' },
    { permission_name: 'venue_gallery.read' },
    { permission_name: 'venue_gallery.update' },
    { permission_name: 'venue_gallery.delete' },
    { permission_name: 'media.create' },
    { permission_name: 'media.read' },
    { permission_name: 'media.update' },
    { permission_name: 'media.delete' },
    { permission_name: 'venue_faq.create' },
    { permission_name: 'venue_faq.read' },
    { permission_name: 'venue_faq.update' },
    { permission_name: 'venue_faq.delete' },
    { permission_name: 'reservations.create' },
    { permission_name: 'reservations.read' },
    { permission_name: 'reservations.update' },
    { permission_name: 'reservations.delete' },
    { permission_name: 'payments.create' },
    { permission_name: 'payments.read' },
    { permission_name: 'payments.update' },
    { permission_name: 'payments.delete' },
    { permission_name: 'communication.create' },
    { permission_name: 'communication.read' },
    { permission_name: 'communication.update' },
    { permission_name: 'communication.delete' },
    { permission_name: 'tickets.create' },
    { permission_name: 'tickets.read' },
    { permission_name: 'tickets.update' },
    { permission_name: 'tickets.delete' },
    { permission_name: 'otp.create' },
    { permission_name: 'otp.read' },
    { permission_name: 'otp.update' },
    { permission_name: 'otp.delete' },
    { permission_name: 'website_settings.create' },
    { permission_name: 'website_settings.read' },
    { permission_name: 'website_settings.update' },
    { permission_name: 'website_settings.delete' },
    { permission_name: 'fcms.create' },
    { permission_name: 'fcms.read' },
    { permission_name: 'fcms.update' },
    { permission_name: 'fcms.delete' },
  ];

  await repo.query(`TRUNCATE "permissions" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedRolePermissions = async (dataSource: DataSource, roles: any[], permissions: any[]) => {
  const repo = dataSource.getRepository('RolePermissions');

  const data = [
    { roleId: roles[0].id, permissionId: permissions[0].id },
    { roleId: roles[0].id, permissionId: permissions[1].id },
    { roleId: roles[1].id, permissionId: permissions[1].id },
    { roleId: roles[2].id, permissionId: permissions[2].id },
  ];

  await repo.query(`TRUNCATE "role_permissions" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};


export const seedUsers = async (dataSource: DataSource, roles: any[]) => {
  const repo = dataSource.getRepository('User');

  // Hash passwords using Argon2
  const adminPassword = await argon.hash('Admin@123');
  const vendorPassword = await argon.hash('Vendor@123');
  const userPassword = await argon.hash('User@123');

  const data = [
    {
      full_name: 'Admin User',
      email: 'admin@example.com',
      password: adminPassword,
      status: 'active',
      roleId: roles[0].id, // admin role
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      full_name: 'Vendor User',
      email: 'vendor@example.com',
      password: vendorPassword,
      status: 'active',
      roleId: roles[1].id, // vendor role
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      full_name: 'Regular User',
      email: 'user@example.com',
      password: userPassword,
      status: 'active',
      roleId: roles[2].id, // user role
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "user" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedAddresses = async (dataSource: DataSource, users: any[]) => {
  const repo = dataSource.getRepository('Address');

  const data = [
    {
      street: '123 Main St',
      city: 'Dubai',
      state: 'Dubai',
      postalCode: '12345',
      country: 'UAE',
      userId: users[0].id,
    },
    {
      street: '456 Vendor Ave',
      city: 'Abu Dhabi',
      state: 'Abu Dhabi',
      postalCode: '67890',
      country: 'UAE',
      userId: users[1].id,
    },
    {
      street: '789 User Blvd',
      city: 'Riyadh',
      state: 'Riyadh',
      postalCode: '54321',
      country: 'KSA',
      userId: users[2].id,
    },
  ];

  await repo.query(`TRUNCATE "address" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedOccasionTypes = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('OccasionType');

  const data = [
    { name: { ar: 'حفلة زفاف', en: 'Wedding' }, created_at: new Date(), updated_at: new Date() },
    { name: { ar: 'اجتماع عمل', en: 'Business Meeting' }, created_at: new Date(), updated_at: new Date() },
    { name: { ar: 'حفل موسيقي', en: 'Concert' }, created_at: new Date(), updated_at: new Date() },
  ];

  await repo.query(`TRUNCATE "occasion_type" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedProperties = async (dataSource: DataSource, users: any[], cities: any[]) => {
  const repo = dataSource.getRepository('Property');

  const data = [
    {
      name: { ar: 'فندق دبي', en: 'Dubai Hotel' },
      description: { ar: 'فندق فاخر', en: 'Luxury hotel' },
      file: '/uploads/venues/1.png',
      vendor_id: users[1].id,
      city_id: cities[0].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'قصر الرياض', en: 'Riyadh Palace' },
      description: { ar: 'قصر ملكي', en: 'Royal palace' },
      file: '/uploads/venues/2.png',
      vendor_id: users[1].id,
      city_id: cities[2].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'منتجع أبو ظبي', en: 'Abu Dhabi Resort' },
      description: { ar: 'منتجع على الشاطئ', en: 'Beach resort' },
      file: '/uploads/venues/3.png',
      vendor_id: users[1].id,
      city_id: cities[1].id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "property" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenues = async (dataSource: DataSource, properties: any[], occasionTypes: any[]) => {
  const repo = dataSource.getRepository('Venue');

  const data = [
    {
      name: { ar: 'قاعة الزفاف', en: 'Wedding Hall' },
      description: { ar: 'قاعة فاخرة للزفاف', en: 'Luxury wedding hall' },
      phone: '+971501234567',
      email: 'wedding@venue.com',
      contact_person: 'Ahmed Mohamed',
      opens_at: '08:00',
      closes_at: '22:00',
      area: 500,
      price: 10000,
      max_capacity: 300,
      min_capacity: 50,
      is_fixed_setup: false,
      u_shape: true,
      theatre_style: true,
      round_table: true,
      classroom: false,
      is_featured: true,
      occasion_id: occasionTypes[0].id, // Wedding
      property_id: properties[0].id, // Dubai Hotel
      vat: 0.05,
      type_place: 'indoor',
      is_multi_place: false,
      responsiblePersonName: 'Mohamed Ali',
      nearestMainAddress: 'Near Dubai Mall',
      profile_image: '/uploads/venues/1.png',
      acceptTerms: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'قاعة المؤتمرات', en: 'Conference Hall' },
      description: { ar: 'قاعة مجهزة لاجتماعات العمل', en: 'Fully equipped business meeting hall' },
      phone: '+966501234567',
      email: 'conference@venue.com',
      contact_person: 'Khalid Abdullah',
      opens_at: '07:00',
      closes_at: '20:00',
      area: 300,
      price: 5000,
      max_capacity: 150,
      min_capacity: 10,
      is_fixed_setup: true,
      u_shape: false,
      theatre_style: true,
      round_table: false,
      classroom: true,
      is_featured: false,
      occasion_id: occasionTypes[1].id, // Business Meeting
      property_id: properties[1].id, // Riyadh Palace
      vat: 0.15,
      type_place: 'indoor',
      is_multi_place: false,
      responsiblePersonName: 'Abdullah Omar',
      nearestMainAddress: 'Near King Abdullah Road',
      profile_image: '/uploads/venues/2.png',
      acceptTerms: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'المسرح المفتوح', en: 'Open Theater' },
      description: { ar: 'مسرح خارجي للحفلات الموسيقية', en: 'Outdoor theater for concerts' },
      phone: '+971501234568',
      email: 'theater@venue.com',
      contact_person: 'Fatima Ahmed',
      opens_at: '10:00',
      closes_at: '23:00',
      area: 1000,
      price: 20000,
      max_capacity: 500,
      min_capacity: 100,
      is_fixed_setup: true,
      u_shape: false,
      theatre_style: true,
      round_table: false,
      classroom: false,
      is_featured: true,
      occasion_id: occasionTypes[2].id, // Concert
      property_id: properties[2].id, // Abu Dhabi Resort
      vat: 0.05,
      type_place: 'outdoor',
      is_multi_place: true,
      responsiblePersonName: 'Ali Hassan',
      nearestMainAddress: 'Near Corniche Road',
      profile_image: '/uploads/venues/3.png',
      acceptTerms: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenueGalleries = async (dataSource: DataSource, venues: any[]) => {
  const repo = dataSource.getRepository('VenueGallery');

  const data = [
    {
      venue_id: venues[0].id,
      imgs: ['/uploads/venues/1.jpg', '/uploads/venues/2.jpg', '/uploads/venues/3.jpg'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[1].id,
      imgs: ['/uploads/venues/4.jpg', '/uploads/venues/5.jpg'],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[2].id,
      imgs: ['/uploads/venues/6.jpg', '/uploads/venues/7.jpg', '/uploads/venues/8.jpg', '/uploads/venues/9.jpg'],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_gallery" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};



export const seedEquipment = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('Equipment');

  const data = [
    {
      name: { ar: 'كراسي', en: 'Chairs' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'طاولات', en: 'Tables' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'شاشة عرض', en: 'Projector Screen' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "equipment" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenueEquipment = async (dataSource: DataSource, venues: any[], equipment: any[]) => {
  const repo = dataSource.getRepository('VenueEquipment');

  const data = [
    {
      venue_id: venues[0].id,
      equipment_id: equipment[0].id, // Chairs
      count: 300,
      price: 10,
      price_per: 'item',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[0].id,
      equipment_id: equipment[1].id, // Tables
      count: 30,
      price: 50,
      price_per: 'item',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[1].id,
      equipment_id: equipment[2].id, // Projector Screen
      count: 2,
      price: 100,
      price_per: 'item',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_equipment" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedServices = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('Service');

  const data = [
    {
      name: { ar: 'خدمة الطعام', en: 'Catering Service' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'الحماية الأمنية', en: 'Security Service' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'خدمة التصوير', en: 'Photography Service' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "service" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenueServices = async (dataSource: DataSource, venues: any[], services: any[]) => {
  const repo = dataSource.getRepository('VenueService');

  const data = [
    {
      venue_id: venues[0].id,
      service_id: services[0].id, // Catering
      count: 1,
      price: 5000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[0].id,
      service_id: services[1].id, // Security
      count: 5,
      price: 1000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[2].id,
      service_id: services[2].id, // Photography
      count: 2,
      price: 3000,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_service" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedVenuePeriods = async (dataSource: DataSource, venues: any[]) => {
  const repo = dataSource.getRepository('VenuePeriod');

  const data = [
    {
      venue_id: venues[0].id, // Wedding Hall
      day: 'Friday',
      from: '08:00',
      to: '12:00',
      price: 5000,
      package_price: 4000,
    },
    {
      venue_id: venues[0].id, // Wedding Hall
      day: 'Friday',
      from: '13:00',
      to: '17:00',
      price: 6000,
      package_price: 5000,
    },
    {
      venue_id: venues[1].id, // Conference Hall
      day: 'Monday',
      from: '09:00',
      to: '17:00',
      price: 3000,
      package_price: 2500,
    },
  ];

  await repo.query(`TRUNCATE "venue_period" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenuePackages = async (dataSource: DataSource, venues: any[]) => {
  const repo = dataSource.getRepository('VenuePackages');

  const now = new Date();
  const futureDate = new Date();
  futureDate.setMonth(now.getMonth() + 3);

  const data = [
    {
      venue_id: venues[0].id, // Wedding Hall
      package_name: { ar: 'باقة الزفاف الأساسية', en: 'Basic Wedding Package' },
      start_date: now,
      end_date: futureDate,
      package_price: 15000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[1].id, // Conference Hall
      package_name: { ar: 'باقة الاجتماعات', en: 'Meeting Package' },
      start_date: now,
      end_date: futureDate,
      package_price: 8000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[2].id, // Open Theater
      package_name: { ar: 'باقة الحفلات', en: 'Concert Package' },
      start_date: now,
      end_date: futureDate,
      package_price: 25000,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_packages" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenuePackagePeriods = async (dataSource: DataSource, packages: any[], periods: any[]) => {
  const repo = dataSource.getRepository('VenuePackagePeriod');

  const data = [
    { package_id: packages[0].id, period_id: periods[0].id }, // Wedding package includes morning period
    { package_id: packages[0].id, period_id: periods[1].id }, // Wedding package includes afternoon period
    { package_id: packages[1].id, period_id: periods[2].id }, // Conference package includes full day
  ];

  await repo.query(`TRUNCATE "venue_package_period" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedVenuePackageEquipment = async (dataSource: DataSource, packages: any[], equipment: any[]) => {
  const repo = dataSource.getRepository('VenuePackageEquipment');

  const data = [
    {
      packageId: packages[0].id,
      equipmentId: equipment[0].id, // Chairs
      count: 200,
      price: 8,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      packageId: packages[0].id,
      equipmentId: equipment[1].id, // Tables
      count: 20,
      price: 40,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      packageId: packages[1].id,
      equipmentId: equipment[2].id, // Projector Screen
      count: 1,
      price: 80,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_package_equipment" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedVenuePackageServices = async (dataSource: DataSource, packages: any[], services: any[]) => {
  const repo = dataSource.getRepository('VenuePackageService');

  const data = [
    {
      packageId: packages[0].id,
      serviceId: services[0].id, // Catering
      count: 1,
      price: 4000,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      packageId: packages[0].id,
      serviceId: services[1].id, // Security
      count: 3,
      price: 800,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      packageId: packages[2].id,
      serviceId: services[2].id, // Photography
      count: 1,
      price: 2500,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_package_service" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedPolicies = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('Policy');

  const data = [
    {
      name: { ar: 'سياسة الإلغاء', en: 'Cancellation Policy' },
      description: { ar: 'يمكنك الإلغاء قبل 7 أيام', en: 'You can cancel up to 7 days before' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'سياسة الدفع', en: 'Payment Policy' },
      description: { ar: '50% دفعة مقدمة', en: '50% advance payment' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: { ar: 'سياسة الضيوف', en: 'Guest Policy' },
      description: { ar: 'الحد الأقصى للضيوف حسب القاعة', en: 'Maximum guests according to venue capacity' },
      is_predefined: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "policy" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedVenuePolicies = async (dataSource: DataSource, venues: any[], policies: any[]) => {
  const repo = dataSource.getRepository('VenuePolicy');

  const data = [
    { venueId: venues[0].id, policyId: policies[0].id }, // Wedding Hall has Cancellation Policy
    { venueId: venues[0].id, policyId: policies[1].id }, // Wedding Hall has Payment Policy
    { venueId: venues[1].id, policyId: policies[0].id }, // Conference Hall has Cancellation Policy
    { venueId: venues[1].id, policyId: policies[2].id }, // Conference Hall has Guest Policy
    { venueId: venues[2].id, policyId: policies[1].id }, // Open Theater has Payment Policy
    { venueId: venues[2].id, policyId: policies[2].id }, // Open Theater has Guest Policy
  ];

  await repo.query(`TRUNCATE "venue_policy" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedReservations = async (dataSource: DataSource, users: any[], venues: any[], packages: any[]) => {
  const repo = dataSource.getRepository('Reservations');

  const now = new Date();
  const futureDate1 = new Date();
  futureDate1.setDate(now.getDate() + 7);
  const futureDate2 = new Date();
  futureDate2.setDate(now.getDate() + 14);

  const data = [
    {
      userId: users[2].id, // Regular user
      venueId: venues[0].id, // Wedding Hall
      packageId: packages[0].id, // Basic Wedding Package
      check_in: now,
      check_out: futureDate1,
      total_price: 15000,
      payment_method: 'credit_card',
      status: 'confirmed',
      periods: [{ day: 'Friday', from: '08:00', to: '12:00' }],
      period_details: [{ day: 'Friday', from: '08:00', to: '12:00', price: 5000 }],
      reservation_details: { notes: 'We need extra chairs' },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      userId: users[2].id, // Regular user
      venueId: venues[1].id, // Conference Hall
      packageId: packages[1].id, // Meeting Package
      check_in: futureDate1,
      check_out: futureDate2,
      total_price: 8000,
      payment_method: 'bank_transfer',
      status: 'pending',
      periods: [{ day: 'Monday', from: '09:00', to: '17:00' }],
      period_details: [{ day: 'Monday', from: '09:00', to: '17:00', price: 3000 }],
      reservation_details: { notes: 'Need projector setup' },
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      userId: users[0].id, // Admin user (testing admin can also make reservations)
      venueId: venues[2].id, // Open Theater
      packageId: packages[2].id, // Concert Package
      check_in: futureDate2,
      check_out: new Date(futureDate2.getTime() + 7 * 24 * 60 * 60 * 1000), // +7 days
      total_price: 25000,
      payment_method: 'credit_card',
      status: 'confirmed',
      periods: [{ day: 'Saturday', from: '18:00', to: '23:00' }],
      period_details: [{ day: 'Saturday', from: '18:00', to: '23:00', price: 10000 }],
      reservation_details: { notes: 'Outdoor concert setup' },
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "reservations" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);

  return data;
};

export const seedPayments = async (dataSource: DataSource, reservations: any[]) => {
  const repo = dataSource.getRepository('Payment');

  const data = [
    {
      reservationId: reservations[0].id,
      amount: 15000,
      payment_method: 'credit_card',
      transaction_id: 'txn_' + Math.random().toString(36).substring(2, 15),
      status: 'completed',
      payment_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      reservationId: reservations[2].id,
      amount: 12500,
      payment_method: 'credit_card',
      transaction_id: 'txn_' + Math.random().toString(36).substring(2, 15),
      status: 'completed',
      payment_date: new Date(),
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "payment" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

export const seedVenueFaqs = async (dataSource: DataSource, venues: any[], users: any[]) => {
  const repo = dataSource.getRepository('VenueFaq');

  const data = [
    {
      venue_id: venues[0].id, // Wedding Hall
      user_id: users[2].id, // Regular user
      question: { ar: 'هل يمكن تغيير التاريخ؟', en: 'Can we change the date?' },
      answer: { ar: 'نعم، قبل 7 أيام من الحدث', en: 'Yes, up to 7 days before the event' },
      status: 'answered',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[0].id, // Wedding Hall
      user_id: users[2].id, // Regular user
      question: { ar: 'ما هي سعة القاعة؟', en: 'What is the venue capacity?' },
      status: 'pending',
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      venue_id: venues[1].id, // Conference Hall
      user_id: users[0].id, // Admin user
      question: { ar: 'هل يوجد إنترنت سريع؟', en: 'Is there fast internet?' },
      answer: { ar: 'نعم، سرعة الإنترنت 100 ميجابت', en: 'Yes, 100 Mbps internet speed' },
      status: 'answered',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "venue_faq" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};


export const seedCommunications = async (dataSource: DataSource, reservations: any[], venues: any[], users: any[]) => {
  const repo = dataSource.getRepository('Communication');

  const data = [
    {
      reservationId: reservations[0].id,
      venueId: venues[0].id,
      fromId: users[2].id, // Regular user
      toId: users[1].id, // Vendor user
      reply: 'Can we add more chairs?',
      type: 'question',
      replies: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      reservationId: reservations[0].id,
      venueId: venues[0].id,
      fromId: users[1].id, // Vendor user
      toId: users[2].id, // Regular user
      reply: 'Yes, we can add 50 more chairs for $500',
      type: 'reply',
      replies: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      reservationId: reservations[1].id,
      venueId: venues[1].id,
      fromId: users[2].id, // Regular user
      toId: users[1].id, // Vendor user
      reply: 'Do you provide projectors?',
      type: 'question',
      replies: [],
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "communication" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};


export const seedHomeSettings = async (dataSource: DataSource) => {
  const repo = dataSource.getRepository('HomeSettings');

  const data = [
    {
      titleHome: { ar: 'مرحبا بكم في منصتنا', en: 'Welcome to our platform' },
      secondTitleHome: { ar: 'أفضل القاعات في المنطقة', en: 'Best venues in the region' },
      urlVideo: 'https://www.youtube.com/watch?v=example',
      specialVenues: '1,2,3', // Assuming venue IDs 1,2,3
      bestRatedVenues: '1,3', // Assuming venue IDs 1,3
      termsAndCondition: { ar: 'الشروط والأحكام', en: 'Terms and Conditions' },
      dataPrivacy: { ar: 'سياسة الخصوصية', en: 'Privacy Policy' },
      necessaryLaws: { ar: 'القوانين الضرورية', en: 'Necessary Laws' },
      faqs: [{ question: { ar: 'كيف أحجز؟', en: 'How to book?' }, answer: { ar: 'اختر القاعة ثم اضغط احجز', en: 'Select venue then click book' } }],
      policies: [{ title: { ar: 'سياسة الإلغاء', en: 'Cancellation Policy' }, content: { ar: 'يمكن الإلغاء قبل 7 أيام', en: 'Can cancel up to 7 days before' } }],
      socialMedia: {
        facebook: 'https://facebook.com/example',
        twitter: 'https://twitter.com/example',
        instagram: 'https://instagram.com/example',
      },
      contractPdfUrl: '/uploads/contracts/contract_ar.pdf',
      contractPdfUrl_en: '/uploads/contracts/contract_en.pdf',
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  await repo.query(`TRUNCATE "home_settings" RESTART IDENTITY CASCADE`);
  await repo.save(data as any);
};

async function runSeeder() {
  const dataSource = new DataSource({
    type: 'postgres',
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 5432,
    username: 'postgres.sghvszzxubiyocwhfczj',
    password: 'ahmedshtya-083',
    database: 'venuat-project',
    entities: [__dirname + '/entity/*.entity{.ts,.js}'],
    synchronize: true,
    logging: true,
  });

  try {
    await dataSource.initialize();

    // Seed in proper order considering dependencies
    const countries = await seedCountries(dataSource);
    const cities = await seedCities(dataSource, countries);
    const roles = await seedRoles(dataSource);
    const permissions = await seedPermissions(dataSource);
    await seedRolePermissions(dataSource, roles, permissions);
    const users = await seedUsers(dataSource, roles);
    await seedAddresses(dataSource, users);
    const occasionTypes = await seedOccasionTypes(dataSource);
    const properties = await seedProperties(dataSource, users, cities);
    const venues = await seedVenues(dataSource, properties, occasionTypes);
    await seedVenueGalleries(dataSource, venues);
    const equipment = await seedEquipment(dataSource);
    await seedVenueEquipment(dataSource, venues, equipment);
    const services = await seedServices(dataSource);
    await seedVenueServices(dataSource, venues, services);
    const venuePeriods = await seedVenuePeriods(dataSource, venues);
    const venuePackages = await seedVenuePackages(dataSource, venues);
    await seedVenuePackagePeriods(dataSource, venuePackages, venuePeriods);
    await seedVenuePackageEquipment(dataSource, venuePackages, equipment);
    await seedVenuePackageServices(dataSource, venuePackages, services);
    const policies = await seedPolicies(dataSource);
    await seedVenuePolicies(dataSource, venues, policies);
    const reservations = await seedReservations(dataSource, users, venues, venuePackages);
    await seedPayments(dataSource, reservations);
    await seedVenueFaqs(dataSource, venues, users);
    await seedCommunications(dataSource, reservations, venues, users);
    await seedHomeSettings(dataSource);

    console.log('✅ Seeding completed successfully!');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await dataSource.destroy();
  }
}

runSeeder();
