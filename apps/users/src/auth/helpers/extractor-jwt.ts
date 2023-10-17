import { Request } from 'express';
import { JWT_COOKIE } from '../constants/jwt';
import { Tokens } from '../types/tokens.type';

const exctractCookie = (request: Request): Tokens => {
  const data = request?.cookies[JWT_COOKIE] as Tokens;
  if (!data) {
    return null;
  }

  return data;
};

export const exctractAtFromCookie = (request: Request): string => {
  return exctractCookie(request).access_token;
};

export const exctractRtFromCookie = (request: Request): string => {
  return exctractCookie(request).refresh_token;
};
