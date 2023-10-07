import { NestFactory } from '@nestjs/core';
import { BasketModule } from './basket.module';

async function bootstrap() {
  const app = await NestFactory.create(BasketModule);
  await app.listen(3000);
}
bootstrap();
