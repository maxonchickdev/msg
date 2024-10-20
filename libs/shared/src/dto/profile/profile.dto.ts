export interface AvatarInterface {
  avatar: Express.Multer.File;
}

export interface UserProfileInterface {
  username: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}
