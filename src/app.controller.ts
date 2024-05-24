import { Controller, Get, Query, Redirect, Render, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';
import { BooksService } from './books/books.service';

@Controller()
export class AppController {
  constructor(private readonly booksService: BooksService) {}

  @Get('home')
  @Render('landing/home')
  @UseGuards(JwtAuthGuard)
  getHello(@Request() req){
    return {
      user: req.user,
    };
  }

  // @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('landing/profile')
  getProfile(@Request() req) {
    return {user: req.user};
  }

  @Get('/search')
  @Render('users/search/search')
  async searchBooks(@Query('q') query: string, @Req() req) {
    const viewData = {};
    if (!query) {
      console.log("No query");
      viewData['redirect'] = true;
      viewData['redirectUrl'] = req.get('referer');
      return {
        viewData
      };
    }
    const books = query ? await this.booksService.search(query): [];
    viewData['books'] = books;
    return {
      viewData
    };
  }
  
}
