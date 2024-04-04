import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.usersService.findOne(loginDTO);

    if (user) {
      const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

      if (passwordMatched) {
        const {password, ...userResult} = user;
        console.log("Password: ", password);
        const payload = { email: userResult.email, sub: userResult.id }
        console.log(payload);
        const payload2 = this.jwtService.sign(payload);
        console.log(payload2);
        return {
          accessToken: payload2,
        };
      } else {
        throw new UnauthorizedException("Password does not match");
      }
    }
    throw new UnauthorizedException("User does not exist");
  }
}
