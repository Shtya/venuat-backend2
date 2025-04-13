// src/communication/communication.controller.ts
import { Controller, Post, Get, Body, Query, Param } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CreateCommunicationDto } from 'dto/venue/communication.dto';

@Controller('communications')
export class CommunicationController {
  constructor(private readonly service: CommunicationService) {}

  @Post()
  create(@Body() dto: CreateCommunicationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll(@Query('type') type?: any, @Query('venueId') venueId?: string) {
    return this.service.findFiltered(type , venueId ? +venueId : undefined);
  }


  @Post(':id/reply')
  replyToMessage(
    @Param('id') parentId: number,
    @Body() dto: any,
  ) {
    return this.service.replyTo(parentId, dto);
  }

}
