import CustomError from './CustomError';

class UnauthorizedError extends CustomError {
  constructor(public errors: string[] = []) {
    super('You are not authorized');
  }

  status = 401;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default UnauthorizedError;
