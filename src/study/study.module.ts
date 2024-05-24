import { Module } from '@nestjs/common';
import { StudyService } from './study.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlashCard } from 'src/models/flashcards.entity';
import { StudyController } from './study.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FlashCard])],
  providers: [StudyService],
  controllers: [StudyController],
})
export class StudyModule {}
