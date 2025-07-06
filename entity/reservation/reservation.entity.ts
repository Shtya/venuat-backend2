import { User } from 'entity/user/user.entity';
import { Venue } from 'entity/venue/venue.entity';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';



@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations, { eager: true, onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Venue, (venue) => venue.reservations, { onDelete: 'CASCADE' })
  venue: Venue;

  @ManyToOne(() => VenuePackage, (e) => e.reservations, { onDelete: 'CASCADE' , nullable : true })
  package: VenuePackage | null;;

  @Column('jsonb', { nullable: true })
  package_details: object | null;


  @Column({ nullable: true , default : "pending" })
  status: string;

  @Column({ type: 'date' })
  check_in: Date;

  @Column({ type: 'date' })
  check_out: Date;


  @Column('jsonb', { nullable: true })
  reservation_details: object | null;


  @Column('decimal')
  total_price: number;
  
  @Column({ type: 'varchar', length: 255 , nullable: true  })
  payment_method: string | null;


  @Column('jsonb', { nullable: true })
  special_requests: object | null;

  @Column({ type: 'jsonb', nullable: true })
  temp_periods: Record<string, number>; // الفترات المؤقتة
  
  @Column({ type: 'jsonb', nullable: true })
  periods: Record<string, number>; // الفترات النهائية بعد القبول
  
  @Column('jsonb', { nullable: true })
  temp_period_details: Record<string, any> | null; // تفاصيل الفترات المؤقتة
  
  @Column('jsonb', { nullable: true })
  period_details: Record<string, any> | null; // تفاصيل الفترات النهائية

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
