import { tokens } from '../tokens';
import { ProcessingObject } from './model';
import { performRecursive } from './recursive-pattern';
import { isEscapeToken } from './utils';

export function processPattern(pattern: string, value: string): ProcessingObject {
  const [patternCharacter, ...trimmedPatternArray] = pattern.split('');
  const [valueCharacter, ...trimmedValueArray] = value.split('');
  const trimmedPattern = trimmedPatternArray.join('');
  const trimmedValue = trimmedValueArray.join('');


  if (patternCharacter === null || patternCharacter === undefined) {
    return {
      result: '',
      next: undefined
    };
  }

  const token = tokens[patternCharacter];

  if (!token) {
    return {
      result: patternCharacter,
      next: {
        pattern: trimmedPattern,
        value: value
      }
    };
  }

  if (isEscapeToken(token)) {
    return {
      result: trimmedPattern[0],
      next: {
        pattern: trimmedPattern.substring(1),
        value: value
      }
    };
  }

  if (token.recursive) {
    return {
      result: performRecursive(pattern, value),
      next: undefined
    };
  }

  if (!token.pattern.test(valueCharacter)) {
    throw new Error(`Value character '${valueCharacter}' did not match the required RegEx '${token.pattern}'`);
  }

  if (token.optional) {
    const shouldUseOptional = allowedToUseOptional(pattern, value);

    return {
      result: shouldUseOptional ? valueCharacter : '',
      next: {
        pattern: trimmedPattern,
        value: shouldUseOptional ? trimmedValue : value
      }
    };
  }

  const transform = token.transform || String;

  return {
    result: transform(valueCharacter),
    next: {
      pattern: trimmedPattern,
      value: trimmedValue
    }
  };
}

function allowedToUseOptional(pattern: string, value: string): boolean {
  const digitsInPattern = pattern.replace(/[^0]/g, '').length;
  const digitsInValue = value.replace(/[^\d]/g, '').length;
  return (digitsInValue - digitsInPattern) > 0;
}
