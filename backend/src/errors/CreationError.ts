import CustomError from './CustomError';

class CreationError extends CustomError {
  constructor(public errors = []) {
    super('Errors occured in creation');
  }

  status = 409;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default CreationError;
