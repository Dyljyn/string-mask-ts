import { StringMaskOptions, StringMaskResult } from './models';
import * as logic from './logic';

export class StringMask {
  public static process(value: unknown, pattern: string, options: StringMaskOptions = {}): StringMaskResult {
    return new StringMask(pattern, options).process(value);
  }

  public static validate(value: unknown, pattern: string, options?: StringMaskOptions): boolean {
    return new StringMask(pattern, options).validate(value);
  }

  public static apply(value: unknown, pattern: string, options?: StringMaskOptions): string {
    return new StringMask(pattern, options).apply(value);
  }

  constructor(public pattern: string, public options: StringMaskOptions = {}) {}

  process(value: unknown): StringMaskResult {
    return logic.parseResultObject(value, this.pattern, this.options);
  }

  validate(value: unknown): boolean {
    return this.process(value).valid;
  }

  apply(value: unknown): string {
    return this.process(value).result;
  }
}
