import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '../logger/logger.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @Inject('LoggerService') private readonly logger: LoggerService
  ) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    this.logger.error(
      `Error occurred at ${request.url}: ${exception.message}`,
      exception.stack,
      'HttpExceptionFilter'
    );

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url
    });
  }
}
