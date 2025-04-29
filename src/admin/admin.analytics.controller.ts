import { Controller, Get } from "@nestjs/common";
import { BooksService } from "src/books/books.service";
import { UsersService } from "src/users/users.service";

@Controller('analytics')
export class AdminAnalyticsController {
  constructor(private readonly usersService: UsersService, private readonly booksService: BooksService) {}

  @Get('users')
  async users() {
    return this.usersService.allUsers();
  }

  @Get('users')
  async books() {
    return this.booksService.findAll();
  }
  
}