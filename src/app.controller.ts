import { Controller, Get, Redirect, Render, Req, Request, Res, UseFilters, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';

@Controller()
export class AppController {
  constructor() {}

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
  
}
