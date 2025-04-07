// reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupByEnum, ReservationFilterEnum, ReservationReportDto, VenueFilterEnum } from 'dto/venue/reservaation-report.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(Venue) private venueRepo: Repository<Venue>
  ) {}

  

  async getReservationCityReport(dto: any) {
    const { from, to, cityId, limit = 20, page = 1 } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue')
      .leftJoin('venue.property', 'property')
      .leftJoin('property.city', 'city')
      .select('city.id', 'id')
      .addSelect('city.name', 'city')
      .addSelect('COUNT(reservation.id)', 'totalReservation')
      .addSelect('SUM(reservation.total_price)', 'totalRevenue')
      .groupBy('city.id, city.name');
  
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
    if (cityId) query.andWhere('city.id = :cityId', { cityId });
  
    const fullData = await query.getRawMany();
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);
  
    const paginatedData = fullData.slice((page - 1) * limit, page * limit);
  
    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: paginatedData,
    };
  }
  
  async getReservationVendorReport(dto: any) {
    const { from, to, userId, limit = 20, page = 1 } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.user', 'user')
      .select('user.id', 'id')
      .addSelect('user.full_name', 'vendor')
      .addSelect('COUNT(reservation.id)', 'totalReservation')
      .addSelect('SUM(reservation.total_price)', 'totalRevenue')
      .groupBy('user.id, user.full_name');
  
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
    if (userId) query.andWhere('user.id = :userId', { userId });
  
    const fullData = await query.getRawMany();
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);
  
    const paginatedData = fullData.slice((page - 1) * limit, page * limit);
  
    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: paginatedData,
    };
  }
  
  async getReservationVenueReport(dto: any) {
    const { from, to, venueId, page = 1, limit = 20 } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue')
      .select('venue.id', 'venueId')
      .addSelect('venue.name', 'venueName')
      .addSelect('COUNT(reservation.id)', 'totalReservation')
      .addSelect('SUM(reservation.total_price)', 'totalRevenue')
      .groupBy('venue.id, venue.name');
  
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
    if (venueId) query.andWhere('venue.id = :venueId', { venueId });
  
    const fullData = await query.getRawMany();
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);
  
    const paginatedData = fullData.slice((page - 1) * limit, page * limit);
  
    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: paginatedData,
    };
  }


  async getReservationPerDayReport(dto: ReservationReportDto) {
    const { from, to } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .select("TO_CHAR(reservation.check_in, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(reservation.total_price)', 'amount')
      .groupBy("TO_CHAR(reservation.check_in, 'YYYY-MM-DD')")
      .orderBy("TO_CHAR(reservation.check_in, 'YYYY-MM-DD')", 'ASC');
  
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
    return await query.getRawMany();
  }
  

  async getReservationPerMonthReport(dto: ReservationReportDto) {
    const { from, to } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .select("TO_CHAR(reservation.check_in, 'FMMonth YYYY')", 'month')  // استخدام FM لعدم إضافة المسافات
      .addSelect('COUNT(*)', 'total')
      .addSelect('SUM(reservation.total_price)', 'amount')
      .groupBy("TO_CHAR(reservation.check_in, 'FMMonth YYYY')")  // استخدام FM هنا أيضا
      .orderBy("MIN(reservation.check_in)", 'ASC');
  
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
  
    return await query.getRawMany();
  }
  

  // VENUE REPORTS

  async getVenueCityReport(dto: any) {
    const { from, to, cityId, limit = 20, page = 1 } = dto;

    const query = this.venueRepo.createQueryBuilder('venue').leftJoin('venue.property', 'property').leftJoin('property.city', 'city').select('city.id', 'id').addSelect('city.name', 'city').addSelect('COUNT(venue.id)', 'venueCount').groupBy('city.id, city.name');

    if (from) query.andWhere('venue.created_at >= :from', { from });
    if (to) query.andWhere('venue.created_at <= :to', { to });
    if (cityId) query.andWhere('city.id = :cityId', { cityId });

    const fullData = await query.getRawMany();
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedData = fullData.slice((page - 1) * limit, page * limit);

    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: paginatedData,
    };
  }

  async getVenueOccasionReport(dto: any) {
    const { from, to, occasionId, limit = 20, page = 1 } = dto;

    const query = this.venueRepo.createQueryBuilder('venue').leftJoin('venue.occasion', 'occasion').select('occasion.id', 'id').addSelect('occasion.name', 'occasionType').addSelect('COUNT(venue.id)', 'venueCount').groupBy('occasion.id, occasion.name');

    if (from) query.andWhere('venue.created_at >= :from', { from });
    if (to) query.andWhere('venue.created_at <= :to', { to });
    if (occasionId) query.andWhere('occasion.id = :occasionId', { occasionId });

    const fullData = await query.getRawMany();
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedData = fullData.slice((page - 1) * limit, page * limit);

    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: paginatedData,
    };
  }

  async getVenueVendorReport(dto: any) {
    const { from, to, userId, limit = 20, page = 1 } = dto;

    const query = this.venueRepo.createQueryBuilder('venue').leftJoin('venue.property', 'property').leftJoin('property.vendor', 'vendor').select('vendor.id', 'id').addSelect('vendor.full_name', 'vendor').addSelect('COUNT(venue.id)', 'venueCount').groupBy('vendor.id, vendor.full_name');

    if (from) query.andWhere('venue.created_at >= :from', { from });
    if (to) query.andWhere('venue.created_at <= :to', { to });
    if (userId) query.andWhere('vendor.id = :userId', { userId });

    const fullData = await query.getRawMany();
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);

    const paginatedData = fullData.slice((page - 1) * limit, page * limit);

    return {
      totalCount,
      totalPages,
      currentPage: +page,
      limit: +limit,
      data: paginatedData,
    };
  }
}

/* 

Reservation
Group by City , Event name , Vendor
Filter by  City , Event name , Vendor + (from date , to date )
data {
  city name , 
  total reservation , 
  value reservation 
}

  !Per Day
  data [{
      date : 1-1-2025
      total : 300
      amount : 500 
    }]

  !per month
  data[{
      month : "March"
      total : 300
      amount : 500 
    }],






Venues 
Group by City , Event name , Vendor
Filter by  City , Event name , Vendor 

data {
  city name , 
  Venue count 
}



*/
