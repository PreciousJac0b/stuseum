import { Body, Controller, ForbiddenException, Get, Post, Render, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dtos/login.dto';
import { UsersService } from 'src/users/users.service';
import { CreateUserDTO } from './dtos/create-user.dto';
import { User } from 'src/models/user.entity';
import { PassportLocalGuard } from './guards/passport-local.guard';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';

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

  @Post('/llogin')
  @UseGuards(PassportLocalGuard)
  async logs(@Req() req, @Res() res) {
    // Passport automatically attaches user object to the guard!.
    // User has already been validated by the guard so we call the signIn function here not the authenticate.

    // Try out the other login here using token access e.t.c to see if it works with the other guard.
  const {accessToken} = await this.authService.signIn(req.user);

  res.cookie('jwt', accessToken,{httpOnly: true});

  return res.redirect('/users/home');
  }

  @Get('protected')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async protectedRoute() {
    return "Successfully Accessed";
  }

  @Post('logout')
  // @UseGuards(AuthGuard)
  logout(@Res() res) {
    console.log("Got Here!")
    res.clearCookie('jwt', { httpOnly:true, path: '/' })

    // return res.status(200).json({ message: 'logout successful'});

    return res.redirect('/auth/login')
  }

}
