import { Controller, Get, Redirect, Render, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor() {}

  @Get('home')
  getHello(): string {
    return "Hey there!";
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('user/profile')
  getProfile(@Request() req) {
    return {user: req.user};
  }
  
}
