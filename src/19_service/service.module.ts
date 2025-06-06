// src/service/service.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { Service } from 'entity/venue/service.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Service])],
  providers: [ServiceService],
  controllers: [ServiceController],
})
export class ServiceModule {}
