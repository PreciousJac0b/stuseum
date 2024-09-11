import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Extract the request, extract header (Authorization header to be specific)
    const request = context.switchToHttp().getRequest(); // Fetches request.

    const cookies = request.headers.cookie;
    
    // Parse cookies and extract the JWT
    const token = cookies
      ?.split('; ')
      .find(cookie => cookie.startsWith('jwt='))
      ?.split('=')[1];
      


    if (token) {
      request.headers.authorization = `Bearer ${token}`; 
    } else {
      throw new UnauthorizedException();
    }

    // if (!token) {
    // }
    
    try {
      // Make the tokenPayload available in the user on the request object
      const tokenPayload = await this.jwtService.verifyAsync(token);
      const {sub, ...remPayload} = tokenPayload;
      request.user = {
        userId: sub,
        ...remPayload,
      }
      return true;
    } catch(error) {
      throw new UnauthorizedException();
    }
    return true;
  }
}