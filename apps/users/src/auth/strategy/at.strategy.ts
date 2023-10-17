import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { exctractAtFromCookie } from '../helpers/extractor-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      ignoreExpiration: false,
      secretOrKey: 'at_secret',
      jwtFromRequest: ExtractJwt.fromExtractors([exctractAtFromCookie])
    });
  }

  async validate(payload) {
    console.log(payload);
    return payload;
  }
}
