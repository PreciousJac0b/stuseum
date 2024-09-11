import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('flashcard')
export class FlashCard {
  private static numberOfFlashcards: number = 0;


  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ nullable: false})
  question: string;

  @Column({ nullable: false })
  answer: string;

  @Column({ default: 0 })
  score: number;

  // holds the same number as the number of flashcards in the table for easy access by an instance
  @Column({ default: 0 })
  sharedNumberOfFlashCard: number;

  @BeforeInsert()
  incrementFlashCard() {
    FlashCard.numberOfFlashcards++;
    this.sharedNumberOfFlashCard = FlashCard.numberOfFlashcards;
  }

  getNumberOfFlashcards(): number {
    return FlashCard.numberOfFlashcards;
  }

  setNumberOfFlashcards(value: number) {
    FlashCard.numberOfFlashcards = value;
  }

  // increaseFlashcards() {
  //   FlashCard.numberOfFlashcards++;
  // }
}