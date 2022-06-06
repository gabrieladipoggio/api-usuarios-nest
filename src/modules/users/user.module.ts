import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';

@Module({
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
  imports: [],
})
export class UserModule {}
