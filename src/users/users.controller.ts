import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Render,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { BooksService } from 'src/books/books.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly booksService: BooksService,
  ) {}

  @UseGuards(AuthGuard)
  @Get('home')
  @Render('users/home')
  async homePage(@Req() req) {
    const viewData: any = {};
    viewData.title = 'Home Page - Stuseum';
    viewData.user = req.user;
    return {
      viewData,
    };
  }


  @UseGuards(AuthGuard)
  @Get('my-books')
  @Render('users/books/books')
  async booksPage(@Req() req) {
    const viewData: any = {};
    viewData.title = 'My Books - Stuseum';
    viewData.user = req.user;
    viewData.books = await this.booksService.findBooksByUser(req.user.userId);
    return {
      viewData, 
    };
  }

  @UseGuards(AuthGuard)
  @Get('books/:id')
  @Render('users/books/book-detail')
  async getBookDetail(@Param('id', ParseIntPipe) id: number) {
    const viewData = {};
    viewData['title'] = 'Book Detail - Stuseum';
    viewData['book'] = await this.booksService.findBookById(id);
    return {
      viewData,
    };
  }

  @Post(':id/follow/:targetId')
  async followUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.usersService.followUser(id, targetId);
  }

  @Post(':id/unfollow/:targetId')
  async unfollowUser(
    @Param('id', ParseIntPipe) id: number,
    @Param('targetId', ParseIntPipe) targetId: number,
  ) {
    return this.usersService.unfollowUser(id, targetId);
  }

  @Get(':id/followers')
  async getFollowers(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFollowers(id);
  }

  @Get(':id/following')
  async getFollowing(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getFollowing(id);
  }



}
