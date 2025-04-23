// src/communication/communication.controller.ts
import { Controller, Post, Get, Body, Query, Param, Patch } from '@nestjs/common';
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
  findAll( @Query('type') type?: any , @Query('fromId') fromId ?:string, @Query('toId') toId?: string ) {
    return this.service.findFiltered(type , fromId , toId );
  }


  @Get(':id')
  async getOne(@Param('id') id: number) {
    return this.service.findOne(id);
  }

  
  @Get('reservation/:id')
  async getOneByReservationId(@Param('id') id: number) {
    return this.service.findOneByReservationId(id);
  }

  @Get('venue/:id')
  async getAllByVenueId(
    @Param('id') id: number,
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.service.findAllByVenueId(+id, +page, +limit);
  }
  

  @Patch(':id/mark-read/:userId')
  markAsRead( @Param('id') communicationId: number, @Param('userId') userId: number, ) {
    return this.service.markRepliesAsRead(communicationId, userId);
  }


  @Patch('reset-all-replies-unread')
  resetRepliesUnread() {
    return this.service.resetAllRepliesToUnread();
  }




  @Post(':id/reply')
  replyToMessage(
    @Param('id') parentId: number,
    @Body() dto: any,
  ) {
    return this.service.replyTo(parentId, dto);
  }

}
