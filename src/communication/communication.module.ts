import { Module } from '@nestjs/common';
import { CommunicationService } from './communication.service';
import { CommunicationController } from './communication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from 'entity/reservation/reservation.entity';
import { Communication } from 'entity/venue/communication.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Reservation , Communication])],
  controllers: [CommunicationController],
  providers: [CommunicationService],
})
export class CommunicationModule {}
