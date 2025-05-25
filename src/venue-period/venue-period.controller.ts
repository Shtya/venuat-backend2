// venue-period.controller.ts
import { Controller, Post, Get, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { VenuePeriodService } from './venue-period.service';
import { CreateVenuePeriodDto, UpdateVenuePeriodDto } from 'dto/venue/venue-period.dto';

@Controller('venues/:venueId/periods')
export class VenuePeriodController {
  constructor(private readonly service: VenuePeriodService) {}

  @Post()
  create(@Param('venueId') venueId: number, @Body() dto : any) {
    return this.service.create(venueId, dto);
  }

  @Get()
  findAll(@Param('venueId') venueId: number) {
    return this.service.findAllByVenue(venueId);
  }

  @Get('/range')
  findByDateRange(
    @Param('venueId') venueId: number,
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('packageId') packageId: string,
  ) {
    return this.service.findPeriodsInRange(venueId, from, to , packageId);
  }


  @Put('')
  update( @Param('venueId') venueId: number, @Body() dto: any, ) {
    return this.service.updateMultipleVenuePeriods(venueId, dto);
  }


  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.service.delete(id);
  }


}
