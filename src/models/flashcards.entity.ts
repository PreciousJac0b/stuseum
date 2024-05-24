import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('flashcard')
export class FlashCard {
  numberOfFlashcards: number = 0;


  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: false})
  question: string;

  @Column({ nullable: false })
  answer: string;

  @Column({ default: 0 })
  score: number;

  getNumberOfFlashcards(): number {
    return this.numberOfFlashcards;
  }

  setNumberOfFlashcards(value: number) {
    this.numberOfFlashcards = value;
  }

  increaseFlashcards() {
    this.numberOfFlashcards++;
  }
}