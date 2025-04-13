// src/communication/communication.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommunicationDto } from 'dto/venue/communication.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { Communication } from 'entity/venue/communication.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommunicationService {
  constructor(
    @InjectRepository(Communication)
    private repo: Repository<Communication>,

    @InjectRepository(Reservation)
    private reservationRepo: Repository<Reservation>,
  ) {}



  async create(dto: CreateCommunicationDto) {
    const communication = this.repo.create(dto);

    if (dto.type === 'reservation' && dto.reservationId) {
      const reservation = await this.reservationRepo.findOne({
        where: { id: dto.reservationId },
        relations: ['venue'],
      });

      communication.venue = reservation?.venue;
      communication.flag = reservation?.venue?.name?.en;
      communication.reservationDetails = {
        reservation: reservation,
        user: reservation.user,
      };
    }

    if (dto.venueId && !communication.venue) {
      communication.venue = { id: dto.venueId } as any;
    }

    return this.repo.save(communication);
  }

  
  async findFiltered( type?: 'reservation' | 'non_reservation' | 'venue_message', venueId?: number, ) {
    const where: any = {};

    if (type) where.type = type; 

    if (venueId) where.venue = { id: venueId }; 

    return this.repo.find({
      where,
      relations: ['reservation', 'venue'],
      order: { id: 'DESC' },
    });
  }

  async replyTo(id: number, dto: any) {
    const message = await this.repo.findOne({ where: { id } });
  
    if (!message) throw new Error('Message not found');
  
    let from = '';
    let to = '';
  
    if (dto.type === 'sender') {
      from = message.from;
      to = message.to;
    } else if (dto.type === 'receiver') {
      from = message.to;
      to = message.from;
    } else {
      throw new Error('Invalid type. Use "sender" or "receiver"');
    }
  
    const replyEntry = {
      from,
      to,
      message: dto.message,
      createdAt: new Date().toISOString(),
    };
  
    message.replies = [...(message.replies || []), replyEntry];
  
    return this.repo.save(message);
  }
  

}
