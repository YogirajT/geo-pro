import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { OpenStreetMapException } from '../exceptions/open-street-map.exception';

@Catch(OpenStreetMapException)
export class OpenStreetMapExceptionFilter implements ExceptionFilter {
  catch(exception: OpenStreetMapException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
