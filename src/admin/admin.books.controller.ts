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
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';

import { BooksService } from 'src/books/books.service';
import { Book } from 'src/models/book.entity';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin/books')
@ApiTags('admin-books')
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

  @Post('template')
  @UseInterceptors(FileInterceptor('image', 
  { storage: diskStorage({
    destination: './public/uploads/books',
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  }) }))
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
    console.log("I am the one being called")
    return res.redirect(req.get('referer'));
  }


  @Post('/testt')
  @UseInterceptors(FilesInterceptor('files')) // Start here
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }


  // File upload for array of files

   @Post('')
   @UseInterceptors(FileFieldsInterceptor([
    {name: 'bookcover', maxCount: 1},
    {name: 'bookpdf', maxCount: 1},
  ], 
  {
    storage: diskStorage({
      destination: (req, file, cb) => {

        const fieldname = file.fieldname;
        let destination;
        const currentPath = __dirname;

        if (fieldname === "bookcover") {
          destination = './public/uploads/books/bookcovers';
        }
        else if (fieldname === "bookpdf") {
          destination = './public/uploads/books/bookpdf';
        } else {
          destination = './public/uploads/books';
        }
        // It apparently can't create the directory itself so we make the directory before storing the file.
        fs.mkdirSync(destination, { recursive: true });
        cb(null, destination);
      }
      , 
      filename: (req, file, cb) => {
        console.log("File original name", file.originalname)
        cb(null, file.originalname)
      }
    })
  }))

  async createBookss(
    @Body() body,
    @Res() res,
    @Req() req,
    @UploadedFiles() files: {bookcover?: Express.Multer.File[], bookpdf?: Express.Multer.File[]},
  ) {
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
    await this.booksService.createOrUpdate(book);
    console.log(req.get('referer'));
    console.log(files);
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
    const book = await this.booksService.findBookById(id);
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
    const book = await this.booksService.findBookById(id);
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

