import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/models/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(@InjectRepository(Book) private booksRepository: Repository<Book>) {}

  async createOrUpdate(book: Book) {
    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find()
  }

  async findBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneBy({id: id});
  }

  async remove(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }
}
