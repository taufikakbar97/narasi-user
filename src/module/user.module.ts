import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entity/User.entity';
import { UserController } from '../controller/user.controller';
import { UserService } from '../service/user.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    HttpModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}