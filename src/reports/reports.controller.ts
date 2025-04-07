
import { Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReservationReportDto } from 'dto/venue/reservaation-report.dto';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // RESERVATION REPORTS
  @Get('reservation/city')
  getReservationByCity(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationCityReport(dto);
  }

  @Get('reservation/vendor')
  getReservationByVendor(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationVendorReport(dto);
  }

  @Get('reservation/venue')
  getReservationByVenue(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationVenueReport(dto);
  }

  @Get('reservation/daily')
  getReservationPerDay(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationPerDayReport(dto);
  }

  @Get('reservation/monthly')
  getReservationPerMonth(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationPerMonthReport(dto);
  }

  // VENUE REPORTS
  @Get('venue/city')
  getVenueByCity(@Query() dto: any) {
    return this.reportsService.getVenueCityReport(dto);
  }

  @Get('venue/occasion')
  getVenueByOccasion(@Query() dto: any) {
    return this.reportsService.getVenueOccasionReport(dto);
  }

  @Get('venue/vendor')
  getVenueByVendor(@Query() dto: any) {
    return this.reportsService.getVenueVendorReport(dto);
  }

}
