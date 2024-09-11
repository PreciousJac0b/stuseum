import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/models/comment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommentService {
  constructor(@InjectRepository(Comments) private commentsRepository: Repository<Comments>) {}

  async create(comment: Comments): Promise<Partial<Comments>> {
    return this.commentsRepository.save(comment);
  }
  
}
