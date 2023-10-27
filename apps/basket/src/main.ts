import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common/rmq/rmq.service';
import { BASKET } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions(BASKET, true));
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
