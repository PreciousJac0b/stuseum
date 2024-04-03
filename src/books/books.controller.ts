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
      // console.log("I got here");
      // console.log("pdf path is ", pdfPath);
      res.download(pdfPath, `${bookName}`);
      // const pdfBuffer = fs.readFileSync(pdfPath);
      // fs.readFile(pdfPath, (err, data) => {
      //   if (err) {
      //     console.error('Error reading PDF file:', err);
      //     return res.status(500).send('Error while serving the PDF file');
      //   }
      //   console.log("I got here too");
        
      //   res.setHeader('Content-Disposition', 'attachment; filename="my-file.pdf"');
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.send(data);
      // });
    } catch (error) {
      res.status(500).send('Error while serving the PDF file');
    }
  }
}
