import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    console.log('Got to auth service');
    if (user) {
      const isMatch = await bcrypt.compare(pass, user.getPassword());
      if (isMatch) {
        const {password, confirmPassword, ...result} = user;
        console.log('is Match from authservice')
        return result;
      } else {
        console.log('not match from authservice');
      }
    } else {
      console.log("User doesn't exist");
    }
    return null;
  }
}
