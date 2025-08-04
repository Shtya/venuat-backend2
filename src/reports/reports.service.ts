// reports.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationReportDto } from 'dto/venue/reservaation-report.dto';
import { Reservation } from 'entity/reservation/reservation.entity';
import { Venue } from 'entity/venue/venue.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReportsService {
  constructor(
    @InjectRepository(Reservation) private reservationRepo: Repository<Reservation>,
    @InjectRepository(Venue) private venueRepo: Repository<Venue>
  ) {}


  // For Vendor 
  async getVendorReservationCityReport(dto: any) {
    const { from, to, userId, limit = 20, page = 1 } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue') 
      .leftJoin('venue.property', 'property') 
      .leftJoin('reservation.user', 'vendor') 
      .leftJoin('property.city', 'city') 
      .select('city.name', 'city') 
      .addSelect('COUNT(reservation.id)', 'totalReservations') 
      .addSelect('SUM(reservation.total_price)', 'totalRevenue') 
      .groupBy('city.name'); 


    if (userId) query.andWhere('vendor.id = :userId', { userId });

  
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
  
    // Execute the query and get the results
    const fullData = await query.getRawMany();
  
    // Pagination logic
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


  async getVendorReservationOccasionReport(dto: any) {
    const {from , to, userId, limit = 20, page = 1 } = dto;
  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue') 
      .leftJoin('venue.property', 'property') 
      .leftJoin('reservation.user', 'vendor') 
      .leftJoin('venue.occasion', 'occasion') // Join with occasion table
      .select('occasion.name', 'occasion') 
      .addSelect('COUNT(reservation.id)', 'totalReservations') 
      .addSelect('SUM(reservation.total_price)', 'totalRevenue') 
      .groupBy('occasion.name'); 
  
    // Filter by vendor's user ID
    if (userId) {
      query.andWhere('vendor.id = :userId', { userId });
    }
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
  
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
  

async getHomeStatistics(dto: any) {
  const { from, to } = dto;

  const totalVendors = await this.venueRepo
    .createQueryBuilder('venue')
    .leftJoin('venue.property', 'property')
    .leftJoin('property.vendor', 'user')
    .select('COUNT(DISTINCT user.id)', 'count')
    .getRawOne();


  // 2. New vendors this month
  const currentMonthStart = new Date();
  currentMonthStart.setDate(1);
  currentMonthStart.setHours(0, 0, 0, 0);

  const newVendorsThisMonth = await this.venueRepo
    .createQueryBuilder('venue')
    .leftJoin('venue.property', 'property')
    .leftJoin('property.vendor', 'user')
    .where('user.created_at >= :start', { start: currentMonthStart })
    .select('COUNT(DISTINCT user.id)', 'count')
    .getRawOne();


    
    // 3. Total reservations this month
    const reservationsThisMonth = await this.reservationRepo
    .createQueryBuilder('reservation')
    .where('reservation.created_at >= :start', { start: currentMonthStart })
    .select('COUNT(reservation.id)', 'count')
    .getRawOne();
    
    // 4. Total sales this month
    const salesThisMonth = await this.reservationRepo
    .createQueryBuilder('reservation')
    .where('reservation.created_at >= :start', { start: currentMonthStart })
    .select('SUM(reservation.total_price)', 'total')
    .getRawOne();
    
    // // 5. Monthly stats (last 5 months)
    const monthlyData = await this.reservationRepo
    .createQueryBuilder('reservation')
    .select("TO_CHAR(reservation.created_at, 'Mon')", 'month')
    .addSelect('COUNT(reservation.id)', 'reservationCount')
    .addSelect('SUM(reservation.total_price)', 'revenue')
    .where('reservation.created_at >= NOW() - INTERVAL \'5 months\'')
    .groupBy('month')
    .orderBy('MIN(reservation.created_at)', 'ASC')
    .getRawMany();
    
  const months = monthlyData.map(item => item.month);
  const reservationsPerMonth = monthlyData.map(item => +item.reservationCount);
  const revenuePerMonth = monthlyData.map(item => +item.revenue);

  return {
    totalVendors: +totalVendors.count || 0,
    newVendorsThisMonth: +newVendorsThisMonth.count || 0,
    reservationsThisMonth: +reservationsThisMonth.count || 0,
    salesThisMonth: +salesThisMonth.total || 0,
    charts: {
      reservations: {
        labels: months,
        data: reservationsPerMonth,
      },
      revenue: {
        labels: months,
        data: revenuePerMonth,
      },
    },
  };
}





  async getVendorReservationVenueReport(dto: any) {
    const {from , to, userId, limit = 20, page = 1 } = dto;

  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue') 
      .leftJoin('venue.property', 'property') 
      .leftJoin('reservation.user', 'vendor') 
      .select('venue.id', 'venueId')
      .addSelect('venue.name', 'venueName') 
      .addSelect('COUNT(reservation.id)', 'totalReservations') 
      .addSelect('SUM(reservation.total_price)', 'totalRevenue') 
      .groupBy('venue.id') 
      .addGroupBy('venue.name'); 
  
    // Filter by vendor's user ID
    if (userId) {
      query.andWhere('vendor.id = :userId', { userId });
    }
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
  
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



  async getVendorReservationPerDayReport(dto: any) {
    const {from , to, userId, limit = 20, page = 1 } = dto;

  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue') 
      .leftJoin('venue.property', 'property') 
      .leftJoin('reservation.user', 'vendor') 
      .select("TO_CHAR(reservation.check_in, 'YYYY-MM-DD')", 'date')
      .addSelect('COUNT(reservation.id)', 'amount') 
      .addSelect('SUM(reservation.total_price)', 'total') 
      .groupBy('date'); 
  
    // Filter by vendor's user ID
    if (userId) {
      query.andWhere('vendor.id = :userId', { userId });
    }
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
  
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
  



  async getVendorReservationPerMonthReport(dto: any) {
    const {from , to, userId, limit = 20, page = 1 } = dto;

  
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue') 
      .leftJoin('venue.property', 'property') 
      .leftJoin('reservation.user', 'vendor') 
      // .select('EXTRACT(MONTH FROM reservation.check_in)', 'month') // Extract the month from check_in date
      .select("TO_CHAR(reservation.check_in, 'FMMonth YYYY')", 'month')  // استخدام FM لعدم إضافة المسافات
      .addSelect('COUNT(reservation.id)', 'amount') 
      .addSelect('SUM(reservation.total_price)', 'total') 
      .groupBy('month')
      .orderBy("MIN(reservation.check_in)", 'ASC');


    if (userId) {
      query.andWhere('vendor.id = :userId', { userId });
    }

    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
  
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
  
  
  
  
  

  // For Admin 

  

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

  async getReservationOccasionReport(dto: any) {
    const { from, to, occasionId, limit = 20, page = 1 } = dto;
  
    // Create the query builder with reservation and occasion relations
    const query = this.reservationRepo.createQueryBuilder('reservation')
      .leftJoin('reservation.venue', 'venue')  // Join with the venue
      .leftJoin('venue.occasion', 'occasion')
      .select('occasion.id', 'id')
      .addSelect('occasion.name', 'occasionType')
      .addSelect('COUNT(reservation.id)', 'reservationCount')  // Count the number of reservations for each occasion
      .addSelect('SUM(reservation.total_price)', 'totalRevenue')  // Calculate the total revenue for the occasion
      .groupBy('occasion.id, occasion.name');
  
    // Apply filters for the date range and occasionId
    if (from) query.andWhere('reservation.check_in >= :from', { from });
    if (to) query.andWhere('reservation.check_in <= :to', { to });
    if (occasionId) query.andWhere('occasion.id = :occasionId', { occasionId });
  
    // Execute the query to get the full data
    const fullData = await query.getRawMany();
    
    // Handle pagination
    const totalCount = fullData.length;
    const totalPages = Math.ceil(totalCount / limit);
  
    const paginatedData = fullData.slice((page - 1) * limit, page * limit);
  
    // Return the paginated data with metadata
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
