import { Request } from 'express';
import { JWT_COOKIE } from '../constants/jwt';
import { Tokens } from '../types/tokens.type';

export const exctractAtFromCookie = (request: Request): string => {
  const data = request?.cookies[JWT_COOKIE] as Tokens;
  if (!data) {
    return null;
  }
  return data.access_token;
};

export const exctractRtFromCookie = (request: Request): string => {
  const data = request?.cookies[JWT_COOKIE] as Tokens;
  if (!data) {
    return null;
  }
  return data.refresh_token;
};
