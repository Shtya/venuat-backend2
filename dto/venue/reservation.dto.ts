import { Type } from 'class-transformer';
import { 
  IsNotEmpty, 
  IsDate, 
  IsEnum, 
  IsNumber, 
  IsOptional, 
  IsString, 
  isObject
} from 'class-validator';
import { ReservationStatus } from 'entity/reservation/reservation.entity';

export class CreateReservationDto {
  @IsNotEmpty({ message: "events.userIdRequired" }) 
  @IsNumber({}, { message: "events.userIdMustBeNumber" }) 
  user: number;

  @IsNotEmpty({ message: "events.venueIdRequired" }) 
  @IsNumber({}, { message: "events.venueIdMustBeNumber" }) 
  venue: number;

  @IsOptional() 
  @IsNumber({}, { message: "events.packageIdMustBeNumber" }) 
  package: number | string;

  @IsOptional()
  package_details: object;

  @IsNotEmpty({ message: "events.reservationStatusRequired" }) 
  @IsEnum(ReservationStatus, { message: "events.invalidReservationStatus" }) 
  status: ReservationStatus;

  @IsNotEmpty({ message: "events.checkInDateRequired" }) 
  @Type(() => Date)
  @IsDate({ message: "events.checkInMustBeDate" }) 
  check_in: Date;

  @IsNotEmpty({ message: "events.checkOutDateRequired" }) 
  @Type(() => Date)
  @IsDate({ message: "events.checkOutMustBeDate" }) 
  check_out: Date;

  @IsNotEmpty({ message: "events.totalPriceRequired" }) 
  @IsNumber({}, { message: "events.totalPriceMustBeNumber" }) 
  total_price: number;

  @IsOptional()
  special_requests?: object;

  @IsOptional()
  @IsString({ message: "events.paymentMethodMustBeString" }) 
  payment_method: string;
}
