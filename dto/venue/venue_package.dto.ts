import {
  ArrayNotEmpty,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  ValidateNested
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';

class PeriodItemDto {
  @IsNumber({}, { message: 'Each period must have a numeric ID.' })
  id: number;

  @IsNumber({}, { message: 'Each period must have a numeric price.' })
  price: number;
}

export class CreateVenuePackageDto {
  @IsNotEmpty({ message: "Venue ID is required." })
  @IsNumber({}, { message: "Venue ID must be a number." })
  venue_id: number;

  @IsNotEmpty({ message: "Package name is required." })
  @IsObject({ message: "Package name must be an object for multilingual support." })
  package_name: object;

  package_price: number;

  @IsNotEmpty({ message: "Start date is required." })
  @IsDate({ message: "Start date must be a valid date." })
  @Type(() => Date)
  start_date: Date;

  @IsNotEmpty({ message: "End date is required." })
  @IsDate({ message: "End date must be a valid date." })
  @Type(() => Date)
  end_date: Date;

  venue_price: number;

  @IsArray({ message: 'Period list must be an array.' })
  @ArrayNotEmpty({ message: 'At least one period must be selected.' })
  @ValidateNested({ each: true })
  @Type(() => PeriodItemDto)
  periods: PeriodItemDto[];
}

export class UpdateVenuePackageDto extends PartialType(CreateVenuePackageDto) {}
