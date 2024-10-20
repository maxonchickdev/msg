export interface PayloadInterface {
  userId: string;
}

export interface SigninTokensInterface {
  accessToken: string;
  refreshToken: string;
}

export interface SigninUserInterface {
  email: string;
  password?: string;
}
