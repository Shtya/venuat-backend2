// src/communication/dto/create-communication.dto.ts
import { IsEmail, IsOptional, IsEnum, IsString } from 'class-validator';

export class CreateCommunicationDto {
  @IsEmail()
  from: string;

  @IsEmail()
  to: string;

  @IsString()
  reply: string;

  @IsOptional()
  @IsString()
  flag?: string;

  @IsEnum(['reservation', 'non_reservation', 'venue_message'])
  type: 'reservation' | 'non_reservation' | 'venue_message';

  @IsOptional()
  reservationId?: number;

  @IsOptional()
  venueId?: number;
}
