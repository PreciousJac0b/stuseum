import { Controller, Get, Redirect, Render, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from './common/guards/authenticated.guard';
import { AuthExceptionFilter } from './common/filters/auth-exceptions.filter';

@Controller()
@UseFilters(AuthExceptionFilter)
export class AppController {
  constructor() {}

  @Get('home')
  @Render('user/home')
  getHello(@Req() req){
    return {
      session: {user: {firstname: req.session.user.firstname}},
    };
  }

  @UseGuards(AuthenticatedGuard)
  @Get('/profile')
  @Render('user/profile')
  getProfile(@Request() req) {
    return {user: req.user};
  }
  
}
