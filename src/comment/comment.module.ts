import { Module } from '@nestjs/common';
import { Comments } from 'src/models/comment.entity';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Comments])],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}
