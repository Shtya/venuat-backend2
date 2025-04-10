
import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReservationReportDto } from 'dto/venue/reservaation-report.dto';

@Controller('report')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}



  @Get('vendor/city')
  async getVendorReservationCityReport(@Query() dto: any) {
    const { userId } = dto; 
    if (!userId)  throw new BadRequestException('User ID is required');
    return await this.reportsService.getVendorReservationCityReport(dto);
  }

  @Get('vendor/occasion')
  async getVendorReservationOccasionReport(@Query() dto: any) {
    const { userId } = dto;
    if (!userId)  throw new BadRequestException('User ID is required');
    return await this.reportsService.getVendorReservationOccasionReport(dto);
  }

  @Get('vendor/venue')
  async getVendorReservationVenueReport(@Query() dto: any) {
    const { userId } = dto;
    if (!userId)  throw new BadRequestException('User ID is required');
    return await this.reportsService.getVendorReservationVenueReport(dto);
  }

  @Get('vendor/daily')
  async getVendorReservationPerDayReport(@Query() dto: any) {
    const { userId } = dto;
    if (!userId)  throw new BadRequestException('User ID is required');
    return await this.reportsService.getVendorReservationPerDayReport(dto);
  }

  @Get('vendor/monthly')
  async getVendorReservationPerMonthReport(@Query() dto: any) {
    const { userId } = dto;
    if (!userId)  throw new BadRequestException('User ID is required');
    return await this.reportsService.getVendorReservationPerMonthReport(dto);
  }




















  // RESERVATION REPORTS
  @Get('reservation/city')
  getReservationByCity(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationCityReport(dto);
  }

  @Get('reservation/vendor')
  getReservationByVendor(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationVendorReport(dto);
  }


  @Get('reservation/occasion')
  getReservationByOccasion(@Query() dto: ReservationReportDto) {
    return this.reportsService.getReservationOccasionReport(dto);
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






