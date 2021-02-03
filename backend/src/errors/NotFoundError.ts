import CustomError from './CustomError';

class NotFoundError extends CustomError {
  constructor(public errors = []) {
    super('Ressource not found');
  }

  status = 404;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default NotFoundError;
