import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginDTO } from './dtos/login.dto';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/models/user.entity';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async login(loginDTO: LoginDTO) {
    const user = await this.validateUser(loginDTO);

    if (!user) {
      throw new UnauthorizedException("Not Authorized");
    }

    console.log("user: ", user);

    return this.signIn(user);
  }

  async validateUser(loginDTO: LoginDTO): Promise<Partial<User>> {
    const user = await this.usersService.findOne(loginDTO);

    if (user) {
      const passwordMatched = await bcrypt.compare(loginDTO.password, user.password);

      if (passwordMatched) {
        const {password, confirmPassword, ...userResult} = user;

        // const payload = { email: userResult.email, sub: userResult.id }

        // const payload2 = this.jwtService.sign(payload);
        
        return userResult;
      } else {
        throw new UnauthorizedException("Password does not match");
      }
    }
    throw new UnauthorizedException("User does not exist");
  }

  async signIn(user: Partial<User>) {

    console.log("User Id: ", user.id)
    console.log("User Email: ", user.email)
    const tokenPayload = {
      sub: user.id,
      email: user.email,
    }

    const accessToken = this.jwtService.signAsync(tokenPayload);

    return {accessToken: accessToken, userId: user.id};

  }
}
