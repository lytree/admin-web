interface UserModel extends ApiAuth.UserInfo {
  token: string;
  refreshToken: string;
  password: string;
}

export const userModel: UserModel[] = [];
