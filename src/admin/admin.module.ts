import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { AdminBooksController } from './admin.books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';

@Module({
  controllers: [AdminController, AdminBooksController],
  imports: [TypeOrmModule.forFeature([User]), UsersModule, BooksModule]
})
export class AdminModule {}
