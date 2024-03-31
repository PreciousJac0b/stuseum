import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/user.entity';
import { UsersController } from './users.controller';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), BooksModule],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
