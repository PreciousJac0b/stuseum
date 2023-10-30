import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { AdminBooksController } from './admin.books.controller';

@Module({
  controllers: [AdminController, AdminBooksController],
  imports: [UsersModule, BooksModule]
})
export class AdminModule {}
