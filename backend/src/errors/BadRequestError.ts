import CustomError from './CustomError';

class BadRequestError extends CustomError {
  constructor(public errors: string[] = []) {
    super('Bad request error');
  }

  status = 400;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default BadRequestError;
