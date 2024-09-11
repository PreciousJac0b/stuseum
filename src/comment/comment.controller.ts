import { Body, Controller, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { Comments } from 'src/models/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentsService: CommentService) {}

  @Get()
  create(@Body() createCommentDto: Comments): Promise<Partial<Comments>> {
    return this.commentsService.create(createCommentDto);
  }
}
