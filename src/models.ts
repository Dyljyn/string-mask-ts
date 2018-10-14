export interface Token {
  pattern: RegExp;
  transform?: (value: string) => string;
  _default?: string;
  optional?: boolean;
  recursive?: boolean;
}

export interface EscapeToken {
  escape: true;
}

export interface TokenDictionary {
  [char: string]: Token | EscapeToken;
}

export interface StringMaskOptions {
  reverse?: boolean;
}

export interface StringMaskResult {
  result: string;
  valid: boolean;
}
