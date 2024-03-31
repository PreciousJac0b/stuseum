import { Controller, Get, Param, ParseIntPipe, Render, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { BooksService } from 'src/books/books.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly booksService: BooksService) {}
  @Get('home')
  @Render('users/home')
  async homePage(@Req() req) {
    // const id = req.user.id;
    // const user = this.usersService.findUserById(id);
    const viewData = {};
    viewData['title'] = 'Home Page - Stuseum';
    return {
      viewData
    }
  }

  @Get('my-books')
  @Render('users/books/books')
  async booksPage() {
    const viewData = {};
    viewData['title'] = 'My Books - Stuseum';
    viewData['books'] = await this.booksService.findAll();
    return {
      viewData
    }
  }

  @Get('books/:id')
  @Render('users/books/book-detail')
  async getBookDetail(@Param('id', ParseIntPipe) id: number) {
    const viewData = {};
    viewData['title'] = 'Book Detail - Stuseum';
    viewData['book'] = await this.booksService.findBookById(id);
    return {
      viewData
    }
  } 
}
