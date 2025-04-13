// src/communication/entities/communication.entity.ts
import { Reservation } from 'entity/reservation/reservation.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class Communication {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: string; // email

  @Column()
  to: string; // email

  @Column('text')
  reply: string;

  @Column({ nullable: true })
  flag: string; // venue name or other identifier

  @Column()
  type: 'reservation' | 'non_reservation' | 'venue_message';

  @ManyToOne(() => Reservation, { nullable: true })
  reservation: Reservation;

  @ManyToOne(() => Venue, { nullable: true })
  venue: Venue;

  @Column({ type: 'jsonb', nullable: true })
  reservationDetails?: any; 
  
  @Column({type: 'jsonb',default: [],})
  replies: {from: string;to: string;message: string;createdAt: string;}[];
}



// import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// @Entity()
// export class Communication {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   sender_id: number;

//   @Column()
//   receiver_id: number;

//   @Column()
//   message: string;

//   @Column()
//   sender_type: string;

//   @Column()
//   receiver_type: string;

//   @CreateDateColumn()
//   created_at: Date;

//   @UpdateDateColumn()
//   updated_at: Date;
// }


