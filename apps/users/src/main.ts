import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(
    session({
      name: 'SESSION_COOKIE',
      secret: 'session-secret',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 60000
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
