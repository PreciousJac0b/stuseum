import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AdminController],
  imports: [UsersModule]
})
export class AdminModule {}
