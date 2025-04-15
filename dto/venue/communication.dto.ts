// src/communication/dto/create-communication.dto.ts
import { IsEmail, IsOptional, IsEnum, IsString, isNumber, IsNumber } from 'class-validator';

export class CreateCommunicationDto {
  @IsNumber()
  fromId: number;

  @IsOptional()
  toId: number;

  @IsString()
  msg: string;


  @IsEnum(['reservation', 'non_reservation', 'venue_message'])
  type: 'reservation' | 'non_reservation' | 'venue_message';

  @IsOptional()
  reservationId?: number;

  @IsOptional()
  venueId?: number;
}
