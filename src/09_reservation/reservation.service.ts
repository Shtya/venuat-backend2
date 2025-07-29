import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'common/base/base.service';
import { MailService } from 'common/nodemailer';
import { CreateReservationDto } from 'dto/venue/reservation.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { In, Repository } from 'typeorm';
import { checkFieldExists } from 'utils/checkFieldExists';

@Injectable()
export class ReservationService extends BaseService<Reservation> {
  constructor(
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Venue) private venueRepo: Repository<Venue>,
    @InjectRepository(VenuePackage) private packageRepo: Repository<VenuePackage>,
    @InjectRepository(VenuePeriod) private venuePeriodRepo: Repository<VenuePeriod>,
    public readonly mailService: MailService
  ) {
    super(reservationRepo);
  }

  //   async updateReservationStatusAndPayment(
  //   id: number,
  //   status: 'approved' | 'cancelled',
  //   paymentMethod?: string
  // ) {
  //   const reservation = await this.reservationRepo.findOne({ where: { id } });

  //   if (!reservation) {
  //     throw new NotFoundException(this.i18n.t('events.reservation_not_found'));
  //   }

  //   // Handle approval
  //   if (status === 'approved') {
  //     if (reservation.status === 'approved') {
  //       return reservation; // Already approved
  //     }

  //     // Move temp to permanent
  //     reservation.periods = reservation.temp_periods;
  //     reservation.period_details = reservation.temp_period_details;

  //     // Add booked dates
  //     for (const [dateStr, periodId] of Object.entries(reservation.periods)) {
  //       await this.venuePeriodRepo
  //         .createQueryBuilder()
  //         .update()
  //         .set({ booked_dates: () => `array_append(booked_dates, '${dateStr}')` })
  //         .where('id = :id', { id: periodId })
  //         .execute();
  //     }
  //   }
  //   // Handle cancellation
  //   else if (status === 'cancelled') {
  //     if (reservation.status === 'cancelled') {
  //       return reservation; // Already cancelled
  //     }

  //     // If previously approved, remove booked dates
  //     if (reservation.periods) {
  //       for (const [dateStr, periodId] of Object.entries(reservation.periods)) {
  //         await this.venuePeriodRepo
  //           .createQueryBuilder()
  //           .update()
  //           .set({ booked_dates: () => `array_remove(booked_dates, '${dateStr}')` })
  //           .where('id = :id', { id: periodId })
  //           .execute();
  //       }
  //     }

  //     // Clear periods
  //     reservation.periods = null;
  //     reservation.period_details = null;
  //   }

  //   // Update payment method if provided
  //   if (paymentMethod) {
  //     reservation.payment_method = paymentMethod;
  //   }

  //   // Update status
  //   reservation.status = status;
  //   return await this.reservationRepo.save(reservation);
  // }
  async updateReservationStatusAndPayment(id: number, status: 'approved' | 'cancelled', paymentMethod?: string) {
    const reservation = await this.reservationRepo.findOne({ where: { id } , relations : ['venue'] });

    if (!reservation) {
      throw new NotFoundException(this.i18n.t('events.reservation_not_found'));
    }

    // Check if the reservation overlaps with any already approved reservation
    if (status === 'approved') {
      if (reservation.status === 'approved') {
        return reservation; // Already approved
      }

      // Check if the periods overlap with other approved reservations
      const overlapCheck = await this.reservationRepo.find({
        where: {
          status: 'approved',
          venue: {id :reservation.venue.id}, // Check only for the same venue
        },
      });

      for (const existingReservation of overlapCheck) {
        for (const [dateStr, periodId] of Object.entries(reservation.temp_periods)) {
          // Check if the period is already booked in any approved reservation
          if (existingReservation.periods && existingReservation.periods[dateStr]) {
            throw new BadRequestException('You cannot accept two reservations in the same period.');
          }
        }
      }

      // Move temp periods to permanent
      reservation.periods = reservation.temp_periods;
      reservation.period_details = reservation.temp_period_details;

      // Add booked dates to the venue periods
      for (const [dateStr, periodId] of Object.entries(reservation.periods)) {
        await this.venuePeriodRepo
          .createQueryBuilder()
          .update()
          .set({ booked_dates: () => `array_append(booked_dates, '${dateStr}')` })
          .where('id = :id', { id: periodId })
          .execute();
      }
    }

    // Handle cancellation
    else if (status === 'cancelled') {
      if (reservation.status === 'cancelled') {
        return reservation; // Already cancelled
      }

      // If previously approved, remove booked dates
      if (reservation.periods) {
        for (const [dateStr, periodId] of Object.entries(reservation.periods)) {
          await this.venuePeriodRepo
            .createQueryBuilder()
            .update()
            .set({ booked_dates: () => `array_remove(booked_dates, '${dateStr}')` })
            .where('id = :id', { id: periodId })
            .execute();
        }
      }

      // Clear periods
      reservation.periods = null;
      reservation.period_details = null;
    }

    // Update payment method if provided
    if (paymentMethod) {
      reservation.payment_method = paymentMethod;
    }

    // Update status
    reservation.status = status;
    return await this.reservationRepo.save(reservation);
  }

  async createCustom(dto) {
    await checkFieldExists(this.userRepo, { id: dto.user }, this.i18n.t('events.user_not_exist'), true, 404);
    const venue = await this.venueRepo.findOne({
      where: { id: dto.venue },
    });

    if (!venue) {
      throw new BadRequestException(this.i18n.t('events.venue_not_exist'));
    }

    if (dto.package) {
      await checkFieldExists(this.packageRepo, { id: dto.package }, this.i18n.t('events.package_not_exist'), true, 404);
    }

    const periodIds = Object.values(dto.periods);
    const periods = await this.venuePeriodRepo.find({ where: { id: In(periodIds) } });

    let conflicts = [];
    // for (const [dateStr, periodId] of Object.entries(dto.periods)) {
    //   const existingReservation = await this.reservationRepo
    //     .createQueryBuilder('reservation')
    //     .where('reservation.venueId = :venueId', { venueId: dto.venue })
    //     .andWhere(`(reservation.periods ->> :date) = :periodId OR (reservation.temp_periods ->> :date) = :periodId`, {
    //       date: dateStr,
    //       periodId: periodId.toString(),
    //     })
    //     .getOne();

    //   if (existingReservation) {
    //     conflicts.push(dateStr);
    //   }
    // }

    if (conflicts.length > 0) {
      throw new BadRequestException(this.i18n.t('events.period_already_reserved', { args: { date: conflicts.join(', ') } }));
    }

    // Create reservation with temporary periods
    const reservation: any = this.reservationRepo.create({
      ...dto,
      temp_periods: dto.periods,
      temp_period_details: periods,
      periods: null, // Will be filled when approved
      period_details: null, // Will be filled when approved
      status: 'pending', // Waiting for approval
    });

    const savedReservation = await this.reservationRepo.save(reservation);

    // Send email notification to venue owner
    await this.mailService.sendReservationNotification(venue.email, {
      reservationId: savedReservation.id,
      venueName: venue.name,
      dates: Object.keys(dto.periods).join(', '),
      userName: dto.user.name, // Assuming user info is available
      totalPrice: dto.total_price,
    });

    return savedReservation;
  }

  async findUserReservations(id) {
    const reservations = await this.reservationRepo.find({ where: { user: { id } }, relations: ['venue'] });
    console.log(id);
    return reservations;
  }

  async findOneVenueEmail(id) {
    const reservations = await this.reservationRepo
      .createQueryBuilder('reservation')
      .leftJoinAndSelect('reservation.user', 'user')
      .leftJoinAndSelect('reservation.venue', 'venue')
      .leftJoinAndSelect('venue.property', 'property')
      .leftJoinAndSelect('property.vendor', 'vendor')

      .where('vendor.id = :userId', { userId: id })
      .getMany();

    return reservations;
  }
}
