import { Controller, Get, Render } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Render('admin/home')
  home() {
    const viewData = {};
    viewData['title'] = 'Admin - Stuseum'
    viewData['users'] = this.usersService.allUsers();
    return {
      viewData
    }
  }

  @Get('users')
  @Render('admin/users')
  users() {
    const viewData = {};
    viewData['title'] = 'Admin - Stuseum Users'
    return {
      viewData
    }
  }
}
