import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

      

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
      message: exception instanceof HttpException
      ? exception.getResponse()['message']
      : 'Internal server error',
    };

    console.error(errorResponse);

    // Rendering using handlebars
    res.status(status).render('error-filter/error-filter', {
      status: errorResponse.statusCode,
      message: errorResponse.message,
      path: errorResponse.path,
      timestamp: errorResponse.timestamp,
      title: 'Error',
    });

    const acceptHeader = req.headers['accept'];
    if (acceptHeader && acceptHeader.includes('application/json')) {
      return res.status(status).json(errorResponse);
    }
  }
}
