import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import * as fs from 'fs';
import { resolve } from 'path';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksServive: BooksService) {}

  @Get('download-pdf/:id')
  async downloadPdf(@Res() res: Response, @Param('id', ParseIntPipe) id: number): Promise<void> {
    try {
      const book = await this.booksServive.findBookById(id);
      const bookName = book.getPdf();
      const projectPath = resolve(__dirname, '../../')
      console.log("Project Path ", projectPath);
      const pdfPath = projectPath + '/public/uploads/books/bookpdf/' + bookName;
      res.download(pdfPath, `${bookName}`);
    } catch (error) {
      res.status(500).send('Error while serving the PDF file');
    }
  }
}
