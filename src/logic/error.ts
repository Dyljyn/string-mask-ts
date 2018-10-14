export class ProcessingError extends Error {
  constructor(public partialResult: string) {
    super();
    Object.setPrototypeOf(this, ProcessingError.prototype);
  }
}
