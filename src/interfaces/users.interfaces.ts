export interface IUser {
  id: number;
  username: string;
  password: string;
}

export interface IUpdateUser {
  username?: string;
  password?: string;
}

export interface IUserData extends Omit<IUser, 'id'> {}
