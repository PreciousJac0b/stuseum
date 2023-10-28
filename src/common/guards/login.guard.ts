import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext) {
    try {
      console.log('login guard is being called');
      const request = context.switchToHttp().getRequest();
      console.log('Email:', request.body.email); // Log the email being checked
      console.log('Password:', request.body.password); // Log the password being checked

      const result = (await super.canActivate(context)) as boolean;
      await super.logIn(request);
      console.log('login guard was completed');
      return result;
      // const result = (await super.canActivate(context)) as boolean;
      // const request = context.switchToHttp().getRequest();
      // await super.logIn(request);
      // console.log('login guard was completed');
      // return result;
    } catch (error) {
      console.error('Error in LoginGuard:', error);
      // Handle the error or throw it again if needed.
      throw error;
    }
    // console.log('login guard is being calledd');
    // const result = (await super.canActivate(context)) as boolean;
    // const request = context.switchToHttp().getRequest();
    // await super.logIn(request);
    // console.log('login guard was completed');
    // return result;
  }
}