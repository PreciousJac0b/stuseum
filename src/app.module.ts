import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { StudyController } from './study/study.controller';
import { StudyModule } from './study/study.module';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, UsersModule, AdminModule, TypeOrmModule.forRoot({
    "type": "mysql",
    "host": "localhost",
    "username": "testuser",
    "password": "testuser123",
    "port": 3306,
    "database": "lms", // Keep it lowercase, matching that in the SQL database
    "entities": [
      "dist/**/*.entity{.ts,.js}"
    ],
    "synchronize": true
  }), BooksModule, StudyModule, CommentModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
