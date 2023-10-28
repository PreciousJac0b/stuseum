import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthModule, UsersModule, AdminModule, TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "username": "testuser",
    "password": "testuser123",
    "port": 3306,
    "database": "LMS",
    "entities": [
      "dist/**/*.entity{.ts,.js}"
    ],
    "synchronize": false
  })],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
