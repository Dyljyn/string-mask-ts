import { Token } from "../models";
import { tokens } from "../tokens";
import { maskString } from "./index";
import { ProcessingObject } from "./model";

export function performRecursive(pattern: string, value: string): string {
  const startPosition = 0;
  const endPosition = pattern.lastIndexOf("#");

  const recursivePattern = pattern.substring(startPosition, endPosition + 1);

  const characterCount = (recursivePattern.match(/#/g) || []).length;

  const repeats = Math.floor(value.length / characterCount);

  const recursivePart = maskString(
    recursivePattern.repeat(repeats),
    value,
    true
  );

  /// Partial pattern

  const partialCharacters = value.length % characterCount;
  const partialPattern = recursivePattern.substr(0, partialCharacters);
  const partialValue =
    value.substr(repeats * characterCount, partialCharacters);

  const partialRecursivePart = maskString(
    partialPattern,
    partialValue,
    true
  );

  /// Remaining pattern

  const remainingPattern = pattern.substring(endPosition + 1);
  const remainingValue = value.substr(repeats * characterCount + partialCharacters);

  const remainingPart = maskString(
    remainingPattern,
    remainingValue,
    true
  );

  return recursivePart + partialRecursivePart + remainingPart;
}

export function processRecursivePattern(
  pattern: string,
  value: string
): ProcessingObject {
  const [patternCharacter, ...trimmedPatternArray] = pattern.split("");
  const [valueCharacter, ...trimmedValueArray] = value.split("");
  const trimmedPattern = trimmedPatternArray.join("");
  const trimmedValue = trimmedValueArray.join("");

  if (patternCharacter === null || patternCharacter === undefined) {
    return {
      result: "",
      next: undefined
    };
  }

  const token = tokens[patternCharacter] as Token;

  if (token && token.recursive) {
    if (valueCharacter && !token.pattern.test(valueCharacter)) {
      throw new Error(
        `Value character (${valueCharacter}) did not match required pattern (${
          token.pattern
        })`
      );
    }

    return {
      result: valueCharacter,
      next: {
        pattern: trimmedPattern,
        value: trimmedValue
      }
    };
  }

  return {
    result: patternCharacter,
    next: {
      pattern: trimmedPattern,
      value: value
    }
  };
}
