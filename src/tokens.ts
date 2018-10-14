import { TokenDictionary } from './models';

export const tokens: TokenDictionary = {
  '0': {pattern: /\d/, _default: '0'},
  '9': {pattern: /\d/, optional: true},
  '#': {pattern: /\d/, optional: true, recursive: true},
  'A': {pattern: /[a-zA-Z0-9]/},
  'S': {pattern: /[a-zA-Z]/},
  'U': {pattern: /[a-zA-Z]/, transform: (c: string) => c.toLocaleUpperCase()},
  'L': {pattern: /[a-zA-Z]/, transform: (c: string) => c.toLocaleLowerCase()},
  '$': {escape: true}
};
