import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RmqService } from '@app/common/rmq/rmq.service';
import { CATALOG_MICROSERVICE_NAME } from '@app/common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(
    rmqService.getOptions(CATALOG_MICROSERVICE_NAME, true)
  );
  app.startAllMicroservices();
  await app.listen(3002);
}
bootstrap();
