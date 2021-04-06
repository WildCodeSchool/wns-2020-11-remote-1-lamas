abstract class CustomError extends Error {
  abstract status: number;

  abstract serializeError(): { status: number; errors: string[] };
}

export default CustomError;
