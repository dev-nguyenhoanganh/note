export class ApiError extends Error {
  id: string;

  constructor(id: string) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super();

    // Maintains proper stack trace for where our error was thrown
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }

    this.name = 'ServerSideError';
    this.id = id;
  }
}
