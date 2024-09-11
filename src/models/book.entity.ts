import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Comments } from "./comment.entity";
import { User } from "./user.entity";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  code: string;

  @Column()
  author: string;

  @Column()
  about: string;

  @Column()
  year_published: string;

  @Column()
  genre: string;

  @Column({ default: 'available' })
  availability: string;
  
  @Column({ nullable: true, default: 'jpeg' })
  image: string;

  @Column({ nullable: true, default: 'pdf'})
  pdf: string;

  @ManyToOne(() => User, (user) => user.books)
  user: User;

  @OneToMany(() => Comments, comments => comments.book)
  comments: Comments[];


  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getTitle(): string {
    return this.title;
  }

  setTitle(title: string) {
    this.title = title;
  }

  getCode() {
    return this.code;
  }

  setCode(code: string) {
    this.code = code;
  }

  getAuthor() {
    return this.author;
  }

  setAuthor(author:string) {
    this.author = author;
  }

  getAbout() {
    return this.about;
  }
  setAbout(about: string) {
    this.about = about;
  }

  getYearPublished() {
    return this.year_published;
  }

  setYearPublished(year: string) {
    this.year_published = year;
  }
  
  getGenre() {
    return this.genre;
  }

  setGenre(genre: string) {
    this.genre = genre;
  }

  getAvailability() {
    return this.availability;
  }

  setAvailability(avai: string) {
    this.availability = avai;
  }

  getImage() {
    return this.image;
  }

  setImage(img: string) {
    this.image = img;
  }

  getPdf() {
    return this.pdf;
  }

  setPdf(pdf: string) {
    this.pdf = pdf;
  }

  getUser() {
    return this.user;
  }

  setUser(user: User) {
    this.user = user;
  }
}