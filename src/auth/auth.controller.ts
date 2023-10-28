import { Body, Controller, ForbiddenException, Get, Post, Redirect, Render, Req, Res, UseFilters, UseGuards } from '@nestjs/common';
import { AuthExceptionFilter } from 'src/common/filters/auth-exceptions.filter';
import { LoginGuard } from 'src/common/guards/login.guard';
import { User } from 'src/models/user.entity';
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
    // viewData['message'] = req.flash('loginError')
    return { viewData: viewData };
  }

  // @UseGuards(LoginGuard)
  @Post('/login')
  async login(@Res() response, @Body() body, @Req() request) {
    const email = body.email;
    const password = body.password;
    const user = await this.usersService.login(email, password);
    if (user) {
      request.session.user = {
        id: user.getId(),
        firstname: user.getFirstName(),
        lastname: user.getLastName(),
        role: user.getRole(),
      };
      return response.redirect('/home');
    } else {
      return response.redirect('/auth/login')
    }
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
  async register(@Body() body, @Res() res) {
    if (body.password !== body.confirm_password) {
      throw new ForbiddenException;
    }
    const user = new User();
    user.setFirstName(body.firstname);
    user.setLastName(body.lastname);
    user.setPassword(body.password);
    user.setProfession(body.profession);
    user.setEmailAddress(body.email)
    user.setMobileNumber(body.mobile);
    const {password, ...result} = user;
    console.log(result);
    console.log("registered");
    await this.usersService.createOrUpdate(user);
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

  // @Get('logout')
  // logout(@Req() req, @Res() res) {
  //   req.logout((err) => {
  //     if (err) {
  //       res.status(500).send('Logout failed');
  //     } else {
  //       res.redirect('/home');
  //     }
  //   });
  // }

  @Get('/logout')
  @Redirect('/')
  logout(@Req() request) {
  request.session.user = null;
  }
}
