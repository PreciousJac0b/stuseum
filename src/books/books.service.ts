import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/models/book.entity';
import { User } from 'src/models/user.entity';
import { Like, Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>, @InjectRepository(User) private usersRepository: Repository<User>) {}

  async createBook(body, files) {
    const user = await this.usersRepository.findOne({ where: {email: body.email} });
    const book = new Book();
    book.setId(body.id);
    book.setTitle(body.title);
    if (files && files.bookcover && files.bookcover.length > 0) {
      const bookcover = files.bookcover[0];
      book.setImage(bookcover.filename);
    }

    if (files && files.bookpdf && files.bookpdf.length > 0) {
      const bookpdf = files.bookpdf[0];
      book.setPdf(bookpdf.filename);
    }
    book.setAuthor(body.author);
    book.setAbout(body.about);
    book.setYearPublished(body.year);
    book.setGenre(body.genre);
    book.setCode(body.code);
    const new_book = this.booksRepository.create({...book, user})
    return this.booksRepository.save(new_book)
  }
  
  async update(id, body, files) {
    const user = await this.usersRepository.findOne({ where: {email: body.email} });
    
    const book = await this.findBookById(id);
    book.setTitle(body.title);
    if (files && files.bookcover && files.bookcover.length > 0) {
      const bookcover = files.bookcover[0];
      book.setImage(bookcover.filename);
    }

    if (files && files.bookpdf && files.bookpdf.length > 0) {
      const bookpdf = files.bookpdf[0];
      book.setPdf(bookpdf.filename);
    }
    book.setAuthor(body.author);
    book.setAbout(body.about);
    book.setYearPublished(body.year);
    book.setGenre(body.genre);
    book.setCode(body.code);
    book.setAvailability(body.availability);
    book.setUser(user)

    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find()
  }

  async findBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({id: id});
  }

  // Finds all books that belongs to a particular user.
  async findBooksByUser(userId: number): Promise<Book[]> {
    return this.booksRepository.find({
      where: { user: { id: userId } }
    });
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async search(query: string): Promise<Book[]> {
    return this.booksRepository.find({
      where: [
        {title: Like(`%${query}%`)},
        {about: Like(`%${query}%`)},
        {author: Like(`%${query}%`)}
      ]
    })
  }
}
