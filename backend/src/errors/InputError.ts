import CustomError from './CustomError';

class InputError extends CustomError {
  constructor(public errors: string[]) {
    super('Validation errors occured in input');
  }

  status = 429;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default InputError;
