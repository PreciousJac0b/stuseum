import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
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
  
  @Column()
  image: string;

  getId() {
    return this.id;
  }

  setId(id: number) {
    this.id = id;
  }

  getTitle() {
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
    return this.genre;
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
}