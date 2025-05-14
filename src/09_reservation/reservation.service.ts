import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { CreateReservationDto } from 'dto/venue/reservation.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';

@Injectable()
export class ReservationService extends BaseService<Reservation> {
  constructor(
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Venue) private venueRepo: Repository<Venue>,
    @InjectRepository(VenuePackage) private packageRepo: Repository<VenuePackage>,
    @InjectRepository(VenuePeriod) private venuePeriodRepo: Repository<VenuePeriod>
  ) {
    super(reservationRepo);
  }

  async createCustom(dto) {
    // 1. Validate related entities
    await checkFieldExists(this.userRepo, { id: dto.user }, this.i18n.t('events.user_not_exist'), true, 404);
    await checkFieldExists(this.venueRepo, { id: dto.venue }, this.i18n.t('events.venue_not_exist'), true, 404);

    if (dto.package) {
      await checkFieldExists(this.packageRepo, { id: dto.package }, this.i18n.t('events.package_not_exist'), true, 404);
    }

    const periodIds = Object.values(dto.periods);
    const periods = await this.venuePeriodRepo.findByIds(periodIds);

    if (periods.length !== periodIds.length) {
      const foundIds = periods.map(p => p.id);
      const missing = periodIds.filter((id: any) => !foundIds.includes(id));
      throw new BadRequestException(` period id (${missing.join(', ')}) doens't exist `);
    }

    let conflicts = [];
    for (const [dateStr, periodId] of Object.entries(dto.periods)) {
      const existingReservation = await this.reservationRepo
        .createQueryBuilder('reservation')
        .where('reservation.venueId = :venueId', { venueId: dto.venue })
        .andWhere(`(reservation.periods ->> :date) = :periodId`, {
          date: dateStr,
          periodId: periodId.toString(),
        })
        .getOne();

      if (existingReservation) {
        conflicts.push(dateStr);
      }
    }

    if (conflicts.length > 0) {
      throw new BadRequestException(this.i18n.t('events.period_already_reserved', { args: { date: conflicts.join(', ') } }));
    }

    for (const [dateStr, periodId] of Object.entries(dto.periods)) {
      await this.venuePeriodRepo
        .createQueryBuilder()
        .update()
        .set({ booked_dates: () => `array_append(booked_dates, '${dateStr}')` })
        .where('id = :id', { id: periodId })
        .execute();
    }

    
    const reservation: any = this.reservationRepo.create(dto);
    reservation.period_details = periods;
    const savedReservation = await this.reservationRepo.save(reservation);


    return {
      ...savedReservation,
      period_details: periods,
    };
  }

  async findUserReservations(id) {
    const reservations = await this.reservationRepo
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.package', 'package')

      .leftJoinAndSelect('package.services', 'services')
      .leftJoinAndSelect('services.service', 'service')
      .leftJoinAndSelect('package.equipments', 'equipments')
      .leftJoinAndSelect('equipments.equipment', 'equipment')

      .leftJoinAndSelect('reservation.venue', 'venue')

      .leftJoinAndSelect('venue.venueServices', 'venueServices')
      .leftJoinAndSelect('venueServices.service', 'venueService')

      .leftJoinAndSelect('venue.venueEquipments', 'venueEquipments')
      .leftJoinAndSelect('venueEquipments.equipment', 'venueEquipment')

      .where('user.id = :userId', { userId: id })
      .getMany();

    return reservations;
  }
}
