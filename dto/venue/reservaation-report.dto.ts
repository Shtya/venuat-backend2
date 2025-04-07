
export enum GroupByEnum {
  RESERVATION = 'reservation',
  VENUE = 'venue'
}

export enum ReservationFilterEnum {
  VENDOR = 'vendor',
  CITY = 'city',
  STATUS = 'status',
  VENUE = 'venue'
}

export enum VenueFilterEnum {
  OCCASION_TYPE = 'occasionType',
  CITY = 'city'
}


import { IsOptional, IsString, IsEnum, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer';

export class ReservationReportDto {
  @IsOptional()
  @IsEnum(GroupByEnum)
  groupBy?: GroupByEnum = GroupByEnum.RESERVATION;

  @IsOptional()
  @IsString()
  filterBy?: string;

  @IsOptional()
  @IsEnum(VenueFilterEnum, { each: true })
  filterByVenue?: VenueFilterEnum;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  from?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  to?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  limit?: number;
}

