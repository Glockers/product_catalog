import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { exctractRtFromCookie } from '../helpers/extractor-jwt';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {
  constructor() {
    super({
      secretOrKey: 'rt-secret',
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([exctractRtFromCookie])
    });
  }

  async validate(request: Request, payload: any) {
    const rt = exctractRtFromCookie(request);
    if (payload === null || rt === null) {
      throw new UnauthorizedException();
    }
    return {
      ...payload,
      rt
    };
  }
}
