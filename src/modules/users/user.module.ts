import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';

@Module({
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}
