import CustomError from './CustomError';

class ForbiddenError extends CustomError {
  constructor(public errors = []) {
    super('Forbidden error');
  }

  status = 403;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default ForbiddenError;
