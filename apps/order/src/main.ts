import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq';
import * as cookieParser from 'cookie-parser';
import { ORDER_MICROSERVICE_NAME } from '@app/common/constants';
import { AppModule } from './app.module';
import { rawBodyMiddleware } from './helpers/rawBody.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.use(cookieParser());
  app.use(rawBodyMiddleware());
  app.connectMicroservice(rmqService.getOptions(ORDER_MICROSERVICE_NAME, true));
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
