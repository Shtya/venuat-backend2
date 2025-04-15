// src/communication/entities/communication.entity.ts
import { Reservation } from 'entity/reservation/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Venue } from './venue.entity';
import { User } from 'entity/user/user.entity';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  from: User;

  @ManyToOne(() => User)
  to: User;

  @Column('text')
  reply: string;

  @Column()
  type: 'reservation' | 'non_reservation' | 'venue_message';

  @ManyToOne(() => Reservation, { nullable: true })
  reservation: Reservation;

  @ManyToOne(() => Venue, { nullable: true })
  venue: Venue;

  
  @Column({type: 'jsonb',default: [],})
  replies: {from: string;to: string;message: string;createdAt: string;}[];

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
}

