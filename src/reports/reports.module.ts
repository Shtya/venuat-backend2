import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { Reservation } from 'entity/reservation/reservation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation])],
  controllers: [ReportsController],
  providers: [ReportsService],
})
export class ReportsModule {}
