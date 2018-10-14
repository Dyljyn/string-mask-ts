import { EscapeToken, Token } from '../models';

export function reverseString(value: string): string {
  return value.split('').reverse().join('');
}

export function isEscapeToken(token: Token | EscapeToken): token is EscapeToken {
  return token.hasOwnProperty('escape');
}
