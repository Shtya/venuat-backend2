// venue-period.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVenuePeriodDto, UpdateVenuePeriodDto } from 'dto/venue/venue-period.dto';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { Repository } from 'typeorm';
import { format, addDays, differenceInCalendarDays } from 'date-fns';
import { VenuePackage } from 'entity/venue/venue_package.entity';
import { Venue } from 'entity/venue/venue.entity';

@Injectable()
export class VenuePeriodService {
  constructor(
    @InjectRepository(VenuePeriod) private periodRepo: Repository<VenuePeriod>,
    @InjectRepository(VenuePackage) private packageRepo: Repository<VenuePackage>,
    @InjectRepository(Venue) private venueRepo: Repository<Venue>
  ) {}

  // ...

  private timeStringToMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  async create(venueId: number, dto: CreateVenuePeriodDto[]) {
    for (const periodDto of dto) {
      const existingPeriods = await this.periodRepo.find({
        where: {
          venue: { id: venueId },
          day: periodDto.day,
        },
      });

      const newFrom = this.timeStringToMinutes(periodDto.from);
      const newTo = this.timeStringToMinutes(periodDto.to);

      const isExistingPeriod = existingPeriods.some(period => {
        const existingFrom = this.timeStringToMinutes(period.from);
        const existingTo = this.timeStringToMinutes(period.to);

        if (newFrom === existingFrom && newTo === existingTo) {
          return true;
        }

        return newFrom < existingTo && newTo > existingFrom;
      });

      if (isExistingPeriod) {
        throw new BadRequestException(`Time period ${periodDto.from} - ${periodDto.to} overlaps with or is the same as an existing period on ${periodDto.day}.`);
      }

      const period = this.periodRepo.create({ ...periodDto, venue: { id: venueId } });
      await this.periodRepo.save(period);
    }

    const allPeriods = await this.periodRepo.find({ where: { venue: { id: venueId } } });

    const minPrice = allPeriods.reduce((min, period) => {
      return period.price < min ? period.price : min;
    }, Number.POSITIVE_INFINITY);

    if (isFinite(minPrice)) {
      await this.venueRepo.update(venueId, { price: minPrice });
    }

    return { message: 'Periods created successfully.' };
  }

  findAllByVenue(venueId: number) {
    return this.periodRepo.find({ where: { venue: { id: venueId } } });
  }

  async updateMultipleVenuePeriods(venueId: number, dtoList: any) {
    const updatedPeriods = [];

    for (const dto of dtoList) {
      const period = await this.periodRepo.findOne({
        where: {
          id: dto.periodId,
          venue: { id: venueId },
        },
        relations: ['venue'],
      });

      if (!period) {
        throw new NotFoundException(`Period with id ${dto.periodId} not found for venue ${venueId}`);
      }

      const day = dto.day ?? period.day;
      const from = dto.from ?? period.from;
      const to = dto.to ?? period.to;
      const price = dto.price ?? period.price;

      const newFrom = this.timeStringToMinutes(from);
      const newTo = this.timeStringToMinutes(to);

      const otherPeriods = await this.periodRepo.find({
        where: {
          venue: { id: venueId },
          day,
        },
      });

      const isOverlapping = otherPeriods.some(p => {
        if (p.id === period.id) return false;
        const existingFrom = this.timeStringToMinutes(p.from);
        const existingTo = this.timeStringToMinutes(p.to);
        return newFrom < existingTo && newTo > existingFrom;
      });

      if (isOverlapping) {
        throw new BadRequestException(`Period ${dto.periodId} overlaps with another period on ${day}`);
      }

      Object.assign(period, { day, from, to, price });
      updatedPeriods.push(period);
    }

    return this.periodRepo.save(updatedPeriods);
  }

  async delete(id: number) {
    const period = await this.periodRepo.findOne({ where: { id } });
    if (!period) throw new NotFoundException('Period not found');

    await this.periodRepo.remove(period);

    return { message: 'Period deleted successfully', id };
  }

  //   async findPeriodsInRange(venueId: number, from: string, to: string , packageId: string )  {

  //     const allPeriods = await this.periodRepo.find({
  //       where: { venue: { id: venueId } },
  //     });

  //     const result: Record<string, { from: string; to: string; price: number }[]> = {};
  //     const daysCount = differenceInCalendarDays(toDate, fromDate);

  //     for (let i = 0; i <= daysCount; i++) {
  //       const date = addDays(fromDate, i);
  //       const dayName = format(date, 'EEEE');
  //       const dateFormatted = format(date, 'dd/MM/yyyy');

  //       const key = `${dayName} : ${dateFormatted} `;

  //       const periodsForDay = allPeriods
  //         .filter(p => p.day.toLowerCase() === dayName.toLowerCase())
  //         .map(p => {
  //           // Helper function to add a leading zero if the number is less than 10
  //           const formatTime = (time) => {
  //             const [hour, minute] = time.split(':').map(Number);
  //             return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
  //           };

  //           return {
  //             from: formatTime(p.from),
  //             to: formatTime(p.to),
  //             price: p.price,
  //             id: p.id ,
  //             booked_dates: p.booked_dates,
  //           };
  //         });

  //       result[key] = periodsForDay;
  //     }

  //     return result;
  //   }

  async findPeriodsInRange(venueId: number, from: string, to: string, packageId?: string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }

    if (fromDate > toDate) {
      throw new BadRequestException('"from" date cannot be after "to" date');
    }

    let allPeriods = [];
    let packageStartDate: Date | null = null;
    let packageEndDate: Date | null = null;

    // 🎯 If packageId provided, load periods from the package
    if (packageId) {
      const packageEntity = await this.packageRepo.findOne({
        where: { id: packageId as any },
        relations: ['periods'],
      });

      if (!packageEntity) {
        throw new NotFoundException('Package not found');
      }

      packageStartDate = new Date(packageEntity.start_date);
      packageEndDate = new Date(packageEntity.end_date);

      allPeriods = packageEntity.periods;
    } else {
      // 🎯 Else load periods from venue directly
      allPeriods = await this.periodRepo.find({
        where: { venue: { id: venueId } },
      });
    }

    const daysCount = differenceInCalendarDays(toDate, fromDate);
    const result: Record<string, any[]> = {};

    for (let i = 0; i <= daysCount; i++) {
      const date = addDays(fromDate, i);
      const dayName = format(date, 'EEEE');
      const dateFormatted = format(date, 'dd/MM/yyyy');
      const key = `${dayName} : ${dateFormatted}`;

      // ⛔️ For package, skip dates outside the package range
      if (packageId && packageStartDate && packageEndDate && (date < packageStartDate || date > packageEndDate)) {
        result[key] = [];
        continue;
      }

      const periodsForDay = allPeriods
        .filter(p => p.day.toLowerCase() === dayName.toLowerCase())
        .map(p => {
          const formatTime = (time: string) => {
            const [hour, minute] = time.split(':').map(Number);
            return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
          };

          return {
            from: formatTime(p.from),
            to: formatTime(p.to),
            price: p.price,
            package_price: p.package_price || 0,
            id: p.id,
            booked_dates: p.booked_dates,
          };
        });

      result[key] = periodsForDay;
    }

    return result;
  }
}
