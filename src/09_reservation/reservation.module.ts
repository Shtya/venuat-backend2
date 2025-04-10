import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { Reservation } from 'entity/reservation/reservation.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { VenuePeriod } from 'entity/venue/venue_period.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation , VenuePackage , VenuePeriod])],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
