import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

import { MailService } from 'common/nodemailer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'entity/user/user.entity';
import { Role } from 'entity/permission/role.entity';
import { Reservation } from 'entity/reservation/reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User , Role , Reservation])],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
