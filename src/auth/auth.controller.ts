import { Body, Controller, ForbiddenException, Get, Post, Render, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/models/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) {}

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

  @Get('login')
  @Render('auth/login')
  loginPage(@Req() req) {
    const viewData = {};
    viewData['title'] = 'Login Page';
    viewData['subtitle'] = 'Stuseum';
    return { viewData: viewData };
  }


  @Post('/login')
  async login(@Body() body: LoginDTO, @Res() res) {
    const { accessToken } = await this.authService.authenticate(body);

    res.cookie('jwt', accessToken,{httpOnly: true});

    return res.redirect('/users/home')


  }

}
