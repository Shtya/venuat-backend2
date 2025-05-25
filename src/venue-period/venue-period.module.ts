import { Module } from '@nestjs/common';
import { VenuePeriodService } from './venue-period.service';
import { VenuePeriodController } from './venue-period.controller';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VenuePackage } from 'entity/venue/venue_package.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VenuePeriod , VenuePackage])],
  controllers: [VenuePeriodController],
  providers: [VenuePeriodService],
})
export class VenuePeriodModule {}
