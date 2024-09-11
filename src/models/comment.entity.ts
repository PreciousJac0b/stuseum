import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./book.entity";

@Entity('comments')
export class Comments {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column('text')
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Book, book => book.comments)
  book: Book;

  getUsername() {
    return this.username;
  }

  setUsername(username) {
    return this.username = username;
  }

  getText() {
    return this.text;
  }
  setText(comment) {
    return this.text = comment;
  }
}