import { AbstractResponse } from '../utils';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface UserInformation {
  id: string;
  photoUrl: string;
  displayName: string;
  username: string;
  email: string;
  phone: string;
  role: 'admin' | 'user';
}

export interface DataLogin {
  user: UserInformation;
  token: string;
  refreshToken: string;
}

interface PostLoginResponse extends AbstractResponse {
  data: DataLogin;
}

const delay = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const postLogin = async (user: LoginPayload) => {
  return delay(1000).then(
    () =>
      ({
        statusCode: 200,
        data: {
          user: {
            id: 'id',
            photoUrl: '/assets/images/avatars/avatar_10.jpg',
            displayName: user.username,
            username: user.username,
            email: 'admin@example.com',
            phone: 'phone',
            role: 'admin',
          },
          token: 'token',
          refreshToken: 'refreshToken',
        },
      } as PostLoginResponse),
  );
};

export default postLogin;
