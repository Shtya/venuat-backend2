// src/communication/communication.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommunicationDto } from 'dto/venue/communication.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { User } from 'entity/user/user.entity';
import { Communication } from 'entity/venue/communication.entity';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectRepository(Communication) private repo: Repository<Communication>,
    @InjectRepository(Venue) private venueReop: Repository<Venue>,
    @InjectRepository(User) private userRepo: Repository<User>,

    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>
  ) {}

  // async create(dto: CreateCommunicationDto) {
  //   const communication = this.repo.create({
  //     reply: dto.msg,
  //     type: dto.type,
  //   });

  //   communication.from = dto.fromId as any;
  //   if (dto.toId) communication.to = dto.toId as any;

  //   if (dto.type === 'reservation' && dto.reservationId) {
  //     const reservation = await this.reservationRepo.findOne({
  //       where: { id: dto.reservationId },
  //       relations: ['venue', 'venue.property.vendor', 'user'],
  //     });

  //     if (!reservation) throw new NotFoundException('Reservation not found');

  //     communication.venue = reservation.venue;
  //     communication.to = reservation.venue.property.vendor.id as any;
  //     communication.reservation = reservation;
  //   }

  //   if (dto.venueId && !communication.venue) {
  //     const venue = await this.venueReop.findOne({ where: { id: dto.venueId }, relations: ['property.vendor'] });
  //     communication.to = venue?.property?.vendor?.id as any;

  //     communication.venue = dto.venueId as any;
  //   }

  //   return this.repo.save(communication);
  // }

  async create(dto: CreateCommunicationDto) {
    // STEP 1: If it's a reservation-based message, check for existing communication
    if (dto.type === 'reservation' && dto.reservationId) {
      const existingCommunication = await this.repo.findOne({
        where: {
          reservation: { id: dto.reservationId },
          type: 'reservation',
        },
        relations: [ 'from', 'to', 'reservation', 'venue'],
      });
  
      if (existingCommunication) {
        // Add reply to existing communication
        const fromUser = await this.userRepo.findOne({ where: { id: dto.fromId } });
        const toUser = existingCommunication.to ?? (await this.userRepo.findOne({ where: { id: dto.toId } }));
  
        const replyEntry = {
          from: {
            id: fromUser.id,
            name: fromUser.full_name,
            email: fromUser.email,
            avatar: fromUser.avatar,
          },
          to: {
            id: toUser.id,
            name: toUser.full_name,
            email: toUser.email,
            avatar: toUser.avatar,
          },
          message: dto.msg,
          type: 'sender', // or 'receiver' based on context, or pass in DTO
          createdAt: new Date().toISOString(),
        };
  
        existingCommunication.replies = [...(existingCommunication.replies || []) as any, replyEntry];
        return this.repo.save(existingCommunication);
      }
    }
  
    // STEP 2: If no existing communication, create a new one
    const communication = this.repo.create({
      reply: dto.msg,
      type: dto.type,
    });
  
    communication.from = dto.fromId as any;
    if (dto.toId) communication.to = dto.toId as any;
  
    if (dto.type === 'reservation' && dto.reservationId) {
      const reservation = await this.reservationRepo.findOne({
        where: { id: dto.reservationId },
        relations: ['venue', 'venue.property.vendor', 'user'],
      });
  
      if (!reservation) throw new NotFoundException('Reservation not found');
  
      communication.venue = reservation.venue;
      communication.to = reservation.venue.property.vendor.id as any;
      communication.reservation = reservation;
    }
  
    if (dto.venueId && !communication.venue) {
      const venue = await this.venueReop.findOne({
        where: { id: dto.venueId },
        relations: ['property.vendor'],
      });
      communication.to = venue?.property?.vendor?.id as any;
      communication.venue = dto.venueId as any;
    }
  
    return this.repo.save(communication);
  }
  

  async findFiltered(type?: 'reservation' | 'non_reservation' | 'venue_message', fromId?: string, toId?: string, page = 1, limit = 10) {
    const where: any = {};

    if (type) where.type = type;
    if (fromId) where.from = { id: +fromId };
    if (toId) where.to = { id: +toId };

    const [fullData, totalCount] = await this.repo.findAndCount({
      where,
      relations: ['reservation', 'venue', 'from', 'to'],
      order: { id: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(totalCount / limit);

    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: fullData,
    };
  }

  async findOne(id: number) {
    const communication = await this.repo.findOne({
      where: { id },
      relations: ['from', 'to', 'venue', 'reservation'],
    });

    if (!communication) {
      throw new NotFoundException(`Communication with ID ${id} not found`);
    }

    return communication;
  }

  async findOneByReservationId(id: number) {

    const communication = await this.repo.findOne({
      where : {reservation: { id },} ,
      relations: ['from', 'to', 'venue', 'reservation'],
    });

    // if (!communication) {
    //   throw new NotFoundException(`Communication with ID ${id} not found`);
    // }

    return communication;
  }

  async replyTo(id: number, dto: { type: 'sender' | 'receiver'; message: string }) {
    const message = await this.repo.findOne({
      where: { id },
      relations: ["from" , "to" , 'venue', 'reservation'], // You don’t need to preload relations
    });


    if (!message) throw new Error('Message not found');

    const fromId = dto.type === 'sender' ? message.from.id : message.to.id  ;
    const toId = dto.type === 'sender' ? message.to.id : message.from.id  ;

    // Fetch both users from the user service or repository
    const fromUser = await this.userRepo.findOne({where: { id : fromId as any }});
    const toUser = await this.userRepo.findOne({where : {id :toId  as any }});

    if (!fromUser || !toUser) {
      throw new Error('One or both users not found');
    }



    const replyEntry = {
      from: {
        id: fromUser.id,
        name: fromUser.full_name,
        email: fromUser.email,
        avatar: fromUser.avatar,
      },
      to: {
        id: toUser.id,
        name: toUser.full_name,
        email: toUser.email,
        avatar: toUser.avatar,
      },
      message: dto.message,
      type: dto.type,
      createdAt: new Date().toISOString(),
    };

    message.replies = [...(message.replies || []) as any , replyEntry];

    return this.repo.save(message);
  }
}
