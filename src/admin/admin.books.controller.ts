import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { BooksService } from 'src/books/books.service';
import { Book } from 'src/models/book.entity';

@Controller('admin/books')
export class AdminBooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('')
  @Render('admin/books/books')
  async books() {
    const viewData = {};
    viewData['title'] = 'Stuseum - Admin Books';
    viewData['books'] = await this.booksService.findAll();
    return {
      viewData,
    };
  }

  @Post('')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  async createBooks(
    @Body() body,
    @Res() res,
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const book = new Book();
    book.setId(body.id);
    book.setTitle(body.title);
    if (file) {
      book.setImage(file.filename);
    }
    book.setAuthor(body.author);
    book.setAbout(body.about);
    book.setYearPublished(body.year);
    book.setGenre(body.genre);
    book.setCode(body.code);
    await this.booksService.createOrUpdate(book);
    console.log(req.get('referer'));
    console.log(file);
    return res.redirect(req.get('referer'));
  }

  @Post('/:id')
  async remove(@Res() res, @Req() req, @Param('id', ParseIntPipe) id: number) {
    await this.booksService.remove(id);
    res.redirect(req.get('referer'));
  }

  @Get('/:id')
  @Render('admin/books/editt')
  async edit(@Param('id', ParseIntPipe) id: number) {
    const book = await this.booksService.findOne(id);
    const viewData = {};
    viewData['title'] = 'Admin Page - Edit Books - Stuseum';
    viewData['book'] = book;
    return {
      viewData
    }
  }

  @Post('/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads' }))
  async updateBook(@Body() body, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Req() req, @Res() res) {
    const book = await this.booksService.findOne(id);
    book.setTitle(body.title);
    if (file) {
      book.setImage(file.filename);
    }
    book.setAuthor(body.author);
    book.setAbout(body.about);
    book.setYearPublished(body.year);
    book.setGenre(body.genre);
    book.setCode(body.code);
    book.setAvailability(body.availability);
    await this.booksService.createOrUpdate(book);
    return res.redirect('/admin/books/');
  }
}
