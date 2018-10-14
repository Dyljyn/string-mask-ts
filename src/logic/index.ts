import { StringMaskOptions, StringMaskResult } from '../models';
import { ProcessingError } from './error';
import { processPattern } from './pattern';
import { processRecursivePattern } from './recursive-pattern';
import { reverseString } from './utils';

export function parseResultObject(
  value: unknown,
  pattern: string,
  options: StringMaskOptions = {}
): StringMaskResult {
  if (!value) {
    return {
      result: '',
      valid: false
    };
  }

  const stringValue = value + '';

  try {
    return {
      result: options.reverse
        ? maskStringInReverseOrder(pattern, stringValue)
        : maskString(pattern, stringValue),
      valid: true
    };
  } catch (error) {
    return {
      result: error instanceof ProcessingError ? error.partialResult : '',
      valid: false
    };
  }
}

export function maskString(
  pattern: string,
  value: string,
  isRecursive = false
): string {
  const parseFn = isRecursive ? processRecursivePattern : processPattern;
  const process = parseFn(pattern, value);

  try {
    if (!process.next) {
      return process.result;
    }

    return (
      process.result +
      maskString(process.next.pattern, process.next.value, isRecursive)
    );
  } catch (error) {
    if (error instanceof ProcessingError) {
      throw new ProcessingError(process.result + error.partialResult);
    }

    throw new ProcessingError(process.result);
  }
}

function maskStringInReverseOrder(pattern: string, value: string): string {
  try {
    const reversedResult = maskString(
      reverseString(pattern),
      reverseString(value)
    );
    return reverseString(reversedResult);
  } catch (error) {
    if (error instanceof ProcessingError) {
      throw new ProcessingError(reverseString(error.partialResult));
    }

    throw error;
  }
}
