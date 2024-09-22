import { Body, Controller, Get, Param, ParseIntPipe, Post, Render, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';


@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles('admin')
@ApiTags('admin-users')
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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
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
    user.setEmail(body.email);
    user.setMobileNumber(body.mobile);
    user.setPassword(body.password);
    user.setProfession(body.profession);
    user.setRole(body.role);
    await this.usersService.createOrUpdate(user);
    return res.redirect(req.get('referer'));
  }

  @Get('users/:id')
  @Render('admin/users/edit')
  async editUser(@Res() res, @Req() req, @Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.findUserById(id);
    const viewData = {};
    viewData['title'] = 'Admin Page - Edit Users - Stuseum';
    viewData['user'] = user;
    return {
      viewData
    }

  }

  @Post('users/:id')
  async remove(@Res() res, @Req() req, @Param('id', ParseIntPipe) id: number) {
   await this.usersService.remove(id);
    res.redirect(req.get('referer'));
  }

  @Post('users/:id/update')
  @UseInterceptors(FileInterceptor('image', { dest: './public/uploads/profilepic' }))
  async updateBook(@Body() body, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File, @Res() res) {
    const user = await this.usersService.findUserById(id);
    user.setFirstName(body.firstname);
    if (file) {
      user.setProfileImage(file.filename);
    }
    user.setLastName(body.lastname);
    user.setProfession(body.profession);
    user.setRole(body.role);
    user.setEmail(body.email);
    // const hash = await bcrypt.hash(body.password, 10);
    user.setPassword(body.password);
    user.setMobileNumber(body.mobile);
    await this.usersService.createOrUpdate(user);
    return res.redirect('/admin/users/');
  }
}
