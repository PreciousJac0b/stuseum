import { Controller, Get, Render } from "@nestjs/common";

import { BooksService } from "src/books/books.service";

@Controller('admin/books')
export class AdminBooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  @Render('admin/books')
  async books() {
    const viewData = {};
    viewData['title'] = 'Stuseum - Admin Books';
    viewData['books'] = await this.booksService.findAll();
    return {
      viewData
    }
  }
}