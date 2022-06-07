import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { userProviders } from './user.providers';
import { UserController } from './user.controller';
import { IsEmailUniqueConstraint } from './is-email-unique.validator';

@Module({
  providers: [UserService, ...userProviders, IsEmailUniqueConstraint],
  exports: [UserService, ...userProviders],
  controllers: [UserController],
  imports: [],
})
export class UserModule {}
