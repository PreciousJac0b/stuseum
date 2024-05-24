import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlashCard } from 'src/models/flashcards.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StudyService {
  constructor(
    @InjectRepository(FlashCard) 
    private readonly FlashcardRepository: Repository<FlashCard>
  ) {}

  async createFlashCard(fCarddto: Partial<FlashCard>) {
    return this.FlashcardRepository.save(fCarddto);
  }
  
    async findAllCards(): Promise<FlashCard[]> {
      return this.FlashcardRepository.find();
    }

  async findCardById(id: number): Promise<FlashCard> {
    return this.FlashcardRepository.findOneBy({id: id});
  }

  async deleteCard(id: number): Promise<void> {
    await this.FlashcardRepository.delete(id);
  }

}
