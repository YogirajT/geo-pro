import { HttpException, HttpStatus } from '@nestjs/common';

export class OpenStreetMapException extends HttpException {
  constructor(message: string, statusCode: HttpStatus) {
    super(message, statusCode);
  }
}
