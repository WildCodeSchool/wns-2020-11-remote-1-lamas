import CustomError from './CustomError';

class LogInTimeOut extends CustomError {
  constructor(public errors: string[] = []) {
    super("Client's session has expired and must login again");
  }

  status = 440;

  serializeError(): { status: number; errors: string[] } {
    return {
      status: this.status,
      errors: this.errors,
    };
  }
}

export default LogInTimeOut;
