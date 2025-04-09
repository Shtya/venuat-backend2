import { IsString, IsNumber, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateVenuePeriodDto {
  @IsString()
  @IsNotEmpty()
  day: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsNumber()
  price: number;
}


import { PartialType } from '@nestjs/mapped-types';
export class UpdateVenuePeriodDto extends PartialType(CreateVenuePeriodDto) {}
