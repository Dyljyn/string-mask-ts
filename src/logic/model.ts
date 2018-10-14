export interface ProcessingObject {
  result: string;
  next: undefined | {
    pattern: string;
    value: string;
  };

}
