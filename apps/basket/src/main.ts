import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq/rmq.service';
import { BASKET_MICROSERVICE_NAME } from '@app/common/constants';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.use(cookieParser());
  app.connectMicroservice(
    rmqService.getOptions(BASKET_MICROSERVICE_NAME, true)
  );
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
