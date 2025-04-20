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
          isRead: false, // 👈 mark as unread
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
  
  async findFiltered(
    type?: 'reservation' | 'non_reservation' | 'venue_message',
    fromId?: string,
    toId?: string,
    page = 1,
    limit = 10
  ) {
    const where: any = {};
  
    if (type) where.type = type;
    if (fromId) where.from = { id: +fromId };
    if (toId) where.to = { id: +toId };
  
    const [fullData, totalCount] = await this.repo.findAndCount({
      where,
      relations: ['reservation', 'venue', 'from', 'to'],
    });
  
    const currentUserId = toId ? +toId : fromId ? +fromId : null;
  
    const sortedData = fullData
      .map(comm => {
        const replies = comm.replies || [];
        const unreadCount = replies.filter((reply: any) => {
          return reply.to?.id === currentUserId && reply.isRead === false;
        }).length;
  
        return {
          ...comm,
          unreadCount,
        };
      })
      .sort((a, b) => {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(); // DESC by updated_at
      })
      .slice((page - 1) * limit, page * limit);
  
    const totalPages = Math.ceil(totalCount / limit);
  
    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: sortedData,
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
      where : {reservation: { id } } ,
      relations: ['from', 'to', 'venue', 'reservation'],
    });

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
      isRead: false, // 👈 mark as unread
    };

    message.replies = [...(message.replies || []) as any , replyEntry];

    return this.repo.save(message);
  }


  async markRepliesAsRead(communicationId: number, userId: number) {
    const communication = await this.repo.findOne({
      where: { id: communicationId },
    });
  
    if (!communication) {
      throw new NotFoundException('Communication not found');
    }
  
    let updated = false;
  
    // Go through each reply and mark it as read if it's addressed to the current user
    communication.replies = (communication.replies || []).map((reply:any) => {
      // If reply.to is an object with `id`
      if (reply.to?.id === userId && reply.isRead !== true) {
        updated = true;
        return { ...reply, isRead: true };
      }
      return reply;
    });
  
    if (updated) {
      await this.repo.save(communication);
    }
  
    return { success: true };
  }



  async resetAllRepliesToUnread() {
    const communications = await this.repo.find();
  
    for (const comm of communications) {
      if (Array.isArray(comm.replies)) {
        comm.replies = comm.replies.map(reply => ({
          ...reply,
          isRead: false,
        }));
  
        await this.repo.save(comm);
      }
    }
  
    return { success: true, updated: communications.length };
  }
  
  
}
