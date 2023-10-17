import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { NAME_JWT_COOKIE } from '../constants';
import { Tokens } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      secretOrKey: configService.get<string>('SECRET_JWT_REFRESH'),
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([RtStrategy.exctractCookie])
    });
  }

  async validate(request: Request, payload: any) {
    const rt = RtStrategy.exctractCookie(request);
    if (payload === null || rt === null) {
      throw new UnauthorizedException();
    }
    return {
      ...payload,
      rt
    };
  }

  private static exctractCookie(request: Request): string | null {
    const data = request?.cookies[NAME_JWT_COOKIE] as Tokens;
    if (!data) {
      return null;
    }

    return data.refresh_token;
  }
}
