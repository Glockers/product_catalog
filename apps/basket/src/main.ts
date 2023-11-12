import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq/rmq.service';
import { BASKET_MICROSERVICE_NAME } from '@app/common/constants';
import * as cookieParser from 'cookie-parser';
import { LoggerService } from '@app/common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  const logger = app.get<LoggerService>(LoggerService);
  const PORT = configService.get<number>('APP_PORT');
  app.use(cookieParser());
  app.connectMicroservice(
    rmqService.getOptions(BASKET_MICROSERVICE_NAME, true)
  );
  await app.startAllMicroservices();
  await app.listen(PORT);
  logger.log(`App listen port ${PORT}`, 'Basket bootstrap');
}
bootstrap();
