import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { LoginGuard } from 'src/common/guards/login.guard';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { Response } from 'express';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Get('login')
  @Render('auth/login')
  loginPage(@Req() req) {
    const viewData = {};
    viewData['title'] = 'Login Page';
    viewData['subtitle'] = 'Stuseum';
    // viewData['message'] = req.flash('loginError')
    return { viewData: viewData };
  }

  // @UseGuards(LoginGuard)
  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const user = await this.authService.login(loginDTO);

    // response.setHeader('Location', '/dashboard')

    return user;
    // if (user) {
    //   console.log("user: ", user);
    //   // response.redirect('/home');
    //   console.log("user2: ", user);
    //   return user;
    // } else {
    //   return response.redirect('/auth/login');
    // }
  }

  @Get('register')
  @Render('auth/register')
  registerPage(@Req() req) {
    const viewData = {};
    viewData['title'] = 'Login Page';
    viewData['subtitle'] = 'Stuseum';
    viewData['message'] = "req.flash('loginError')";
    return {
      viewData,
    };
  }

  @Post('register')
  async register(@Body() body: CreateUserDTO, @Res() res) {
    if (body.password !== body.confirm_password) {
      throw new ForbiddenException();
    }
    const user = new User();
    user.setFirstName(body.firstname);
    user.setLastName(body.lastname);
    user.setPassword(body.password);
    user.setProfession(body.profession);
    user.setEmail(body.email);
    user.setMobileNumber(body.mobile);
    const { password, ...result } = user;
    console.log(result);
    console.log('registered');
    await this.usersService.createOrUpdate(user);
    res.redirect('/auth/login');
  }

  @Get('users')
  users() {
    return this.usersService.allUsers();
  }

  @Get('test')
  @Render('partials/test')
  test() {
    return { hello: 'Hello' };
  }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() request) {
    // request.session.user = null;
  }
}
