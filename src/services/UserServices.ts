import { ApiConnection } from "./ApiConnection";

class UserServices {
  static async Register(email: string, password: string) {
    const response = await ApiConnection.post('register', {
      email,
      password
    });
    return response;
  }

  static async Login(email: string, password: string) {
    const response = await ApiConnection.post<{
      accessToken: string,
      refreshToken: string,
    }>('login', {
      email,
      password
    });
    return response;
  }

  static async Refresh(refreshToken: string)  {
    const response = await ApiConnection.post<{
      accessToken: string,
      refreshToken: string,
    }>('refresh', {
      refreshToken
    });
    return response;
  }

  static async GetUserInfo() {
    const response = await ApiConnection.get<{id: string, email: string, username: string}>('users/me');
    return response;
  }
}

export { UserServices };