import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { BaseService } from 'common/base/base.service';
import { Equipment } from 'entity/venue/equipment.entity';
import { Service } from 'entity/venue/service.entity';
import { checkFieldExists } from 'utils/checkFieldExists';
import { Venue } from 'entity/venue/venue.entity';
import { CreateVenuePackageDto } from 'dto/venue/venue_package.dto';
import { VenuePackageEquipment } from 'entity/venue/venue_package_equipment.entity';
import { VenuePackageService as VenuePackageServiceDif } from 'entity/venue/venue_package_service.entity';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { Reservation } from 'entity/reservation/reservation.entity';
import { getDay, addDays, differenceInDays } from 'date-fns';

@Injectable()
export class VenuePackageService extends BaseService<VenuePackage> {
  constructor(
    @InjectRepository(Venue) private readonly venueRepo: Repository<Venue>,
    @InjectRepository(Equipment) private equipmentRepo: Repository<Equipment>,
    @InjectRepository(Service) private serviceRepo: Repository<Service>,
    @InjectRepository(VenuePackage) private venuePackageRepo: Repository<VenuePackage>,

    @InjectRepository(VenuePackageEquipment) private readonly venuePackageEquipmentRepo: Repository<VenuePackageEquipment>,

    @InjectRepository(VenuePackageServiceDif) private readonly venuePackageServiceRepo: Repository<VenuePackageServiceDif>,
    @InjectRepository(VenuePeriod) private readonly venuePeriodRepo: Repository<VenuePeriod>,
    @InjectRepository(Reservation) private readonly reservationRepo: Repository<Reservation>
  ) {
    super(venuePackageRepo);
  }

  async customCreate(dto: CreateVenuePackageDto, req: any) {
    await checkFieldExists(this.venueRepo, { id: dto.venue_id }, "venue doesn't exist.", true, 404);
    const venue = await this.venueRepo.findOne({ where: { id: dto.venue_id } });

    const periods = await this.venuePeriodRepo.find({ where: { venue: { id: dto.venue_id } } });

    const existingIds = periods.map(p => p.id);
    const missingIds = dto.period_ids.filter(id => !existingIds.includes(id));

    if (missingIds.length > 0) { throw new BadRequestException(`Invalid period IDs: ${missingIds.join(', ')}`); }

    dto.package_price = dto.venue_price || venue?.price || 0;

    if (new Date(dto.start_date) >= new Date(dto.end_date)) {
      throw new BadRequestException('Start date must be before end date.');
    }

    if (dto.start_date && new Date(dto.start_date) <= new Date()) {
      throw new BadRequestException('The offer end date must be in the future.');
    }

    const predefinedEquipments = await this.getPredefinedEquipments(req.user.id);
    const predefinedServices = await this.getPredefinedServices(req.user.id);

    // ✅ Create the package
    const venuePackage = this.venuePackageRepo.create({
      ...dto,
      package_main_price: dto.venue_price || venue?.price || 0,
      periods: periods,
    });

    await this.venuePackageRepo.save(venuePackage);

    const venuePackageEquipments = predefinedEquipments.map(equipment => ({ package: venuePackage, equipment: equipment, count: 0, price: 0 }));
    await this.venuePackageEquipmentRepo.save(venuePackageEquipments);

    const venuePackageServices = predefinedServices.map(service => ({ package: venuePackage, service: service, price: 0, count: 0 }));
    await this.venuePackageServiceRepo.save(venuePackageServices);

    return venuePackage;
  }

  countDayOccurrences(start: Date, end: Date, targetDay: string): number {
    const daysMap: Record<string, number> = { sunday: 0, monday: 1, tuesday: 2, wednesday: 3, thursday: 4, friday: 5, saturday: 6 };

    const targetDayNumber = daysMap[targetDay.toLowerCase()];
    let count = 0;
    let current = new Date(start);

    while (current <= end) {
      if (current.getDay() === targetDayNumber) {
        count++;
      }
      current.setDate(current.getDate() + 1);
    }

    return count;
  }

  async getForVenue(venue_id: any, status: 'expired' | 'current' | 'upcoming') {
    const relations = status ? ['periods'] : ['periods', 'services.service', 'services.service.iconMedia', 'equipments.equipment', 'equipments.equipment.iconMedia'];

    const venuePackages = await this.venuePackageRepo.find({ where: { venue_id }, relations, order: { created_at: 'DESC' } });

    const targetDate = new Date();

    const filtered = venuePackages.filter(pkg => {
      const start = new Date(pkg.start_date);
      const end = new Date(pkg.end_date);

      if (status === 'expired') {
        return end < targetDate;
      }

      if (status === 'current') {
        return start >= targetDate;
      }

      return true;
    });

    return filtered;
  }

  async getPredefinedEquipments(userId: number) {
    return this.equipmentRepo.find({
      where: [{ is_predefined: true }, { user_id: userId }],
    });
  }

  async getPredefinedServices(userId: number) {
    return this.serviceRepo.find({
      where: [{ is_predefined: true }, { user_id: userId }],
    });
  }
}
