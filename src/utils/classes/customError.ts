type CustomErrorArgs = {
  msg: string;
  statusCode: number;
};

export class CustomError extends Error {
  isSuccess: boolean;
  statusCode: number;

  constructor({ msg, statusCode }: CustomErrorArgs) {
    super(msg);
    this.isSuccess = false;
    this.statusCode = statusCode;
  }

  serialize() {
    return {
      message: this.message,
      code: this.statusCode,
      isSuccess: this.isSuccess,
    };
  }
}
