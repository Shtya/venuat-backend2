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
  day: string; 

  @Column()
  from: string; 

  @Column()
  to: string; 

  @Column('double precision')
  price: number;

  @Column('double precision' , {nullable : true , default : 0} )
  package_price: number;

  @Column("text", { array: true, default: () => 'ARRAY[]::text[]' })
  booked_dates: string[]; 
}
