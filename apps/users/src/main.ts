import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as session from 'express-session';
import * as passport from 'passport';
import * as cookieParser from 'cookie-parser';
import {
  NAME_SESSION_COOKIE,
  MAXAGE_SESSION_COOKIE
} from './constants/session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.use(
    session({
      name: NAME_SESSION_COOKIE,
      secret: configService.get<string>('SESSION_SECRET'),
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: MAXAGE_SESSION_COOKIE
      }
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());

  await app.listen(configService.get<number>('APP_PORT'));
}
bootstrap();
