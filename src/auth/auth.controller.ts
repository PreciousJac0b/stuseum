import { Body, Controller, Get, Post, Render, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { LoginGuard } from 'src/common/guards/login.guard';
import { UsersService } from 'src/users/users.service';

@UseFilters(AuthExceptionFilter)
@Controller('auth')
export class AuthController {
  constructor(private readonly usersService: UsersService) {}
  @Get('login')
  @Render('auth/login')
  loginPage(@Req() req) {
    const viewData = {};
    viewData["title"] = "Login Page";
    viewData["subtitle"] = "Stuseum"
    viewData['message'] = req.flash('loginError')
    return { viewData: viewData };
  }

  @UseGuards(LoginGuard)
  @Post('login')
  login(@Res() res, @Body() body) {
    console.log(body.username);
    console.log(body.password);
    res.redirect('/home')
  }

  @Get('register')
  @Render('auth/register')
  registerPage(@Req() req) {
    const viewData = {};
    viewData["title"] = "Login Page";
    viewData["subtitle"] = "Stuseum"
    viewData['message'] = req.flash('loginError')
    return {
      viewData,
    }
  }

  @Post('register')
  register(@Body() body, @Res() res) {
    const user = {};
    user["username"] = body.username;
    user["password"] = body.password;
    user["id"] = body.id;
    this.usersService.addUser(user);
    res.redirect('/auth/login')
  }

  @Get('users')
  users() {
    return this.usersService.allUsers();
  }

  @Get('test')
  @Render('partials/test')
  test() {
    return {hello: "Hello"}
  }

  // @Get('/logout')
  // // @Redirect('/')
  // logout(@Req() req, @Res() res) {
  //   req.logout();
  //   res.redirect('/');
  // }

  @Get('logout')
  logout(@Req() req, @Res() res) {
    req.logout((err) => {
      if (err) {
        res.status(500).send('Logout failed');
      } else {
        res.redirect('/home');
      }
    });
  }
}
