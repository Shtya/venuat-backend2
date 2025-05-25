import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from 'typeorm';
import { VenuePackageService } from './venue_package_service.entity';
import { VenuePackageEquipment } from './venue_package_equipment.entity';
import { Reservation } from 'entity/reservation/reservation.entity';
import { Venue } from './venue.entity';
import { VenuePeriod } from './venue_period.entity';

@Entity('venue_packages')
export class VenuePackage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Venue, e => e.venuePackages)
  @JoinColumn({ name: 'venue_id' })
  venue: Venue;

  @Column()
  venue_id: number;

  @Column('jsonb')
  package_name: object; // دعم تعدد اللغات

  @Column('decimal', { default: 0, nullable: true })
  package_main_price: number;


  @Column('decimal', { default: 0, nullable: true })
  package_price: number;


  @Column({ type: 'timestamp', nullable: false })
  start_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  end_date: Date;

  @OneToMany(() => VenuePackageService, vps => vps.package)
  services: VenuePackageService[];

  @OneToMany(() => VenuePackageEquipment, vpe => vpe.package)
  equipments: VenuePackageEquipment[];

  @OneToMany(() => Reservation, reservation => reservation.package)
  reservations: Reservation[];

  @ManyToMany(() => VenuePeriod, { cascade: true })
  @JoinTable({
    name: 'venue_package_period', // اسم جدول الربط
    joinColumn: {
      name: 'package_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'period_id',
      referencedColumnName: 'id',
    },
  })
  periods: VenuePeriod[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
