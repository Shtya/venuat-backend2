import { Controller, Post, Get, Body, Param, Delete, Query, UseGuards, Patch } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { CreateReservationDto } from 'dto/venue/reservation.dto';
import { AuthGuard } from 'src/01_auth/auth.guard';
import { Permissions } from 'src/01_auth/permissions.decorators';
import { EPermissions } from 'enums/Permissions.enum';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  // reservation.controller.ts
  @Patch('status-and-payment')
  @UseGuards(AuthGuard)
  async updateReservationStatusAndPayment(
    @Body()
    body: {
      reservationId: any;
      status: 'approved' | 'cancelled';
      payment_method?: string;  
    }
  ) {
    return this.reservationService.updateReservationStatusAndPayment(body.reservationId, body.status, body.payment_method);
  }

  @Post()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_CREATE)
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.createCustom(dto);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  async findAll(@Query() query) {
    const { page, limit, search, sortBy, sortOrder, ...restQueryParams } = query;

    return this.reservationService.FIND_Objects(
      'reservations',
      search,
      page,
      limit,
      sortBy,
      sortOrder,
      [], // excluded fields
      ['user', 'venue', 'package'], // relations
      ['status', 'total_price'], // direct fields
      restQueryParams, // specific search
      false, // customRelations
      undefined, // status
      undefined, // occasion
      {
        user: ['full_name', 'email', 'phone'],
        venue: ['name:jsonb'],
      }
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  findOne(@Param('id') id: number) {
    return this.reservationService.findOne(id, ['user', 'venue', 'package']);
  }

  @Get(':id/user')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  findOneVenue(@Param('id') id: number) {
    return this.reservationService.findUserReservations(id);
  }

  @Get(':id/owner-venue')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_READ)
  findOneVenueEmail(@Param('id') id: number) {
    return this.reservationService.findOneVenueEmail(id);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @Permissions(EPermissions.RESERVATIONS_DELETE)
  delete(@Param('id') id: number) {
    return this.reservationService.remove(id);
  }
}
