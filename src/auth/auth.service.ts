import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'src/models/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async authenticate(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);

    return this.signIn(user);
  }


  async validateUser(loginDTO: LoginDTO) {
    const user =  await this.usersService.findOne(loginDTO);

    const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);


    if (passwordMatched) {
      const {password, confirmPassword, ...userResult} = user;

      return userResult;
    } else {
      throw new UnauthorizedException("Password Doesn't Match")
    }

  }


  async signIn(user: Partial<User>) {
    const tokenPayload = {
      sub: user.id,
      ...user,
    }

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {accessToken, user};
  }
}
