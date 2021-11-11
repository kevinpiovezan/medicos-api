import { Module } from '@nestjs/common';
import { databaseProviders } from './index';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
