export interface CreateUserInterface {
  username: string;
  email: string;
  password: string;
}

export interface EmailConfirmationInterface {
  email: string;
  code: string;
}

export interface HttpExceptionInterface {
  statusCode: number;
  message: string;
}

export interface ResendCodeInterface {
  email: string;
}
