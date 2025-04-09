// venue-period.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateVenuePeriodDto, UpdateVenuePeriodDto } from 'dto/venue/venue-period.dto';
import { VenuePeriod } from 'entity/venue/venue_period.entity';
import { Repository } from 'typeorm';
import { format, addDays, differenceInCalendarDays } from 'date-fns';


@Injectable()
export class VenuePeriodService {
  constructor(
    @InjectRepository(VenuePeriod)
    private periodRepo: Repository<VenuePeriod>,
  ) {}

// ...


private timeStringToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}


async create(venueId: number, dto: CreateVenuePeriodDto[]) {
  for (const periodDto of dto) {
    // Check for overlapping periods on the same venue and day
    const existingPeriods = await this.periodRepo.find({
      where: {
        venue: { id: venueId },
        day: periodDto.day,
      },
    });

    const newFrom = this.timeStringToMinutes(periodDto.from);
    const newTo = this.timeStringToMinutes(periodDto.to);

    // Check for exact matches or overlaps with existing periods
    const isExistingPeriod = existingPeriods.some(period => {
      const existingFrom = this.timeStringToMinutes(period.from);
      const existingTo = this.timeStringToMinutes(period.to);

      // Check if the exact period exists (exact match)
      if (newFrom === existingFrom && newTo === existingTo) {
        return true;
      }

      // Check for overlap (new period overlaps with existing period)
      return newFrom < existingTo && newTo > existingFrom;
    });

    if (isExistingPeriod) {
      throw new BadRequestException(`Time period ${periodDto.from} - ${periodDto.to} overlaps with or is the same as an existing period on ${periodDto.day}.`);
    }

    // Create and save each period
    const period = this.periodRepo.create({ ...periodDto, venue: { id: venueId } });
    await this.periodRepo.save(period);
  }

  return { message: 'Periods created successfully.' };
}



  findAllByVenue(venueId: number) {
    return this.periodRepo.find({ where: { venue: { id: venueId } } });
  }

  async update(id: number, dto: UpdateVenuePeriodDto) {
    const period = await this.periodRepo.findOne({
      where: { id },
      relations: ['venue'],
    });
  
    if (!period) throw new NotFoundException('Period not found');
  
    // use updated values if provided, otherwise use existing values
    const day = dto.day ?? period.day;
    const from = dto.from ?? period.from;
    const to = dto.to ?? period.to;
  
    // Fetch other periods on the same day for the same venue
    const existingPeriods = await this.periodRepo.find({
      where: {
        venue: { id: period.venue.id },
        day: day,
      },
    });
  
    const newFrom = this.timeStringToMinutes(from);
    const newTo = this.timeStringToMinutes(to);
  
    const isOverlapping = existingPeriods.some(p => {
      if (p.id === id) return false; // skip self
      const existingFrom = this.timeStringToMinutes(p.from);
      const existingTo = this.timeStringToMinutes(p.to);
      return newFrom < existingTo && newTo > existingFrom;
    });
  
    if (isOverlapping) {
      throw new BadRequestException('Updated time period overlaps with an existing period.');
    }
  
    Object.assign(period, dto);
    return this.periodRepo.save(period);
  }
  

  async delete(id: number) {
    const period = await this.periodRepo.findOne({ where: { id } });
    if (!period) throw new NotFoundException('Period not found');
  
    await this.periodRepo.remove(period);
  
    return { message: 'Period deleted successfully', id };
  }


  async findPeriodsInRange(venueId: number, from: string, to: string) {
    const fromDate = new Date(from);
    const toDate = new Date(to);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      throw new BadRequestException('Invalid date format');
    }
  
    if (fromDate > toDate) {
      throw new BadRequestException('"from" date cannot be after "to" date');
    }
  
    const allPeriods = await this.periodRepo.find({
      where: { venue: { id: venueId } },
    });
  
    const result: Record<string, { from: string; to: string; price: number }[]> = {};
    const daysCount = differenceInCalendarDays(toDate, fromDate);
  
    for (let i = 0; i <= daysCount; i++) {
      const date = addDays(fromDate, i);
      const dayName = format(date, 'EEEE');         // مثل Friday
      const dateFormatted = format(date, 'd/M');    // مثل 10/4
  
      const key = `${dayName} : ${dateFormatted} `;  // النهائي: 10/4 - Friday
  
      const periodsForDay = allPeriods
        .filter(p => p.day.toLowerCase() === dayName.toLowerCase())
        .map(p => {
          // Helper function to add a leading zero if the number is less than 10
          const formatTime = (time) => {
            const [hour, minute] = time.split(':').map(Number);
            return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
          };
      
          return {
            from: formatTime(p.from),
            to: formatTime(p.to),
            price: p.price,
            id: p.id
          };
        });
  
      result[key] = periodsForDay;
    }
  
    return result;
  }
  
  
}


