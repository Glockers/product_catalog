import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload, Tokens } from '../types';
import { Request } from 'express';
import { NAME_JWT_COOKIE, NAME_JWT_STRATEGY } from '../constants';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, NAME_JWT_STRATEGY) {
  constructor(private readonly configService: ConfigService) {
    super({
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('SECRET_JWT_ACCESS'),
      jwtFromRequest: ExtractJwt.fromExtractors([AtStrategy.exctractCookie])
    });
  }

  async validate(jwtPayload: JwtPayload) {
    return jwtPayload;
  }

  private static exctractCookie(request: Request): string | null {
    const data = request?.cookies[NAME_JWT_COOKIE] as Tokens;
    if (!data) {
      return null;
    }

    return data.access_token;
  }
}
