import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Venue } from './venue.entity';

@Entity()
export class VenuePeriod {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, venue => venue.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column()
  day: string; // ex: 'sunday', 'monday'...

  @Column()
  from: string; // format: 'HH:MM'

  @Column()
  to: string; // format: 'HH:MM'

  @Column('double precision')
  price: number;
}
