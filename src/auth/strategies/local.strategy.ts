import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local';
import { AuthService } from "../auth.service";
import { LoginDTO } from "../dtos/login.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  // Local Strategy always expects a validate method and it receives two arguments always. This why we used this as DTO.
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({email, password} as LoginDTO);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }


}