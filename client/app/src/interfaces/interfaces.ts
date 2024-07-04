export interface IRegistrate {
  username: string
  email: string
  password: string
}

export interface ILogin extends Omit<IRegistrate, 'username'> {}
