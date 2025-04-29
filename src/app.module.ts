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
import { APP_FILTER } from '@nestjs/core';
import { HttpErrorFilter } from './filters/http-exception.filter';
import { AisupportModule } from './aisupport/aisupport.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AuthModule, UsersModule, AdminModule, TypeOrmModule.forRoot({
    "type": "mysql",
    "host": process.env.DB_HOST,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASSWORD,
    "port": parseInt(process.env.DB_PORT, 10),
    "database": process.env.DB_NAME, // Keep it lowercase, matching that in the SQL database
    "entities": [
      "dist/**/*.entity{.ts,.js}"
    ],
    "synchronize": true
  }), BooksModule, StudyModule, CommentModule, AisupportModule, ConfigModule.forRoot({
    isGlobal: true,
  })],
  controllers: [AppController],
  providers: [{
    provide: APP_FILTER,
    useClass: HttpErrorFilter,
  }],
})
export class AppModule {}
