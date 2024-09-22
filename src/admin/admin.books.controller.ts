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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';

import { BooksService } from 'src/books/books.service';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { ApiTags } from '@nestjs/swagger';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@Controller('admin/books')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
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


  @Post('/testt')
  @UseInterceptors(FilesInterceptor('files')) // Start here
  uploadFile(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }


  // File upload for multiple files.

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
        cb(null, file.originalname)
      }
    })
  }))

  async createBook(
    @Body() body,
    @Res() res,
    @Req() req,
    @UploadedFiles() files: {bookcover?: Express.Multer.File[], bookpdf?: Express.Multer.File[]},
  ) {
    await this.booksService.createBook(body, files);
    return res.redirect(req.get('referer'));
  }

  @Post('/:id')
  async remove(@Res() res, @Req() req, @Param('id', ParseIntPipe) id: number) {
    await this.booksService.remove(id);
    res.redirect(req.get('referer'));
  }

  @Get('/:id')
  @Render('admin/books/edit')
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
  @UseInterceptors(FileFieldsInterceptor([
    {name: 'bookcover', maxCount: 1},
    {name: 'bookpdf', maxCount: 1},
  ], 
  {
    storage: diskStorage({
      destination: (req, file, cb) => {

        const fieldname = file.fieldname;
        let destination;

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
        cb(null, file.originalname)
      }
    })
  }))

  async updateBook(@Body() body, @Param('id', ParseIntPipe) id: number, @UploadedFiles() files: {bookcover?: Express.Multer.File[], bookpdf?: Express.Multer.File[]}, @Req() req, @Res() res) {
    

    await this.booksService.update(id, body, files);
    return res.redirect('/admin/books/');
  }
}

