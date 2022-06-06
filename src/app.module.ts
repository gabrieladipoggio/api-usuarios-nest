import { Module } from '@nestjs/common';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { databaseProviders } from './core/database/database.providers';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
  ],
  controllers: [],
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class AppModule {}
