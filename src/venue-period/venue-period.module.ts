import { Module } from '@nestjs/common';
import { VenuePeriodService } from './venue-period.service';
import { VenuePeriodController } from './venue-period.controller';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([VenuePeriod])],
  controllers: [VenuePeriodController],
  providers: [VenuePeriodService],
})
export class VenuePeriodModule {}
