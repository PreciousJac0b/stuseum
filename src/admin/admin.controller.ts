import { Body, Controller, Get, Param, ParseIntPipe, Post, Render, Req, Res } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Render('admin/home')
  home() {
    const viewData = {};
    viewData['title'] = 'Admin - Stuseum'
    return {
      viewData
    }
  }

  @Get('users')
  @Render('admin/users/users')
  async users() {
    const viewData = {};
    viewData['title'] = 'Admin - Stuseum Users';
    viewData['users'] = await this.usersService.allUsers();
    return {
      viewData
    }
  }

  @Post('users')
  async createUsers(@Body() body, @Res() res, @Req() req) {
    if (!body) {
      return res.redirect('admin/users')
    }
    const user = new User();
    user.setFirstName(body.firstname);
    user.setLastName(body.lastname);
    user.setEmailAddress(body.email);
    user.setMobileNumber(body.mobile);
    user.setPassword(body.password);
    user.setProfession(body.profession);
    user.setRole(body.role);
    await this.usersService.createOrUpdate(user);
    return res.redirect(req.get('referer'));
  }

  @Post('users/:id')
  async remove(@Res() res, @Req() req, @Param('id', ParseIntPipe) id: number) {
   await this.usersService.remove(id);
    res.redirect(req.get('referer'));
  }  
}
