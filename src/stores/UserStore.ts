import { makeAutoObservable, runInAction } from 'mobx';
import StateStore from './StateStores/StateStore';
import FetchingStateStore from './StateStores/FetchingStateStore';
import { UserResponse } from '../types/UserType';
import { UserServices } from '../services/UserServices';
import SuccessStateStore from './StateStores/SuccessStateStore';
import ErrorStateStore from './StateStores/ErrorStateStore';
import { getRefreshToken, getToken } from '../services/ApiConnection';

class UserStore {
  user?: UserResponse;

  state?: StateStore;

  token?: string;

  refreshToken?: string;

  constructor() {
    this.token = getToken();
    this.refreshToken = getRefreshToken();
    this.state = new SuccessStateStore();
    makeAutoObservable(this);
  }

  public get isAuthorized() {
    return !!this.token;
  }

  public async Login(username: string, password: string) {
    this.state = new FetchingStateStore();
    try {
      const response = await UserServices.Login(username, password);
      if (response.data) {
        runInAction(() => {
          this.token = response.data.accessToken;
          this.refreshToken = response.data.refreshToken;
        })
        localStorage.setItem('TribeToken', response.data.accessToken);
        localStorage.setItem('TribeRefreshToken', response.data.refreshToken);
      }
      this.state  = new SuccessStateStore();
    } catch (error) {
      this.state = new ErrorStateStore(error);
    }
  }

  public async Register(username: string, password: string) {
    this.state = new FetchingStateStore();
    try {
      const registerResponse = await UserServices.Register(username, password);
      if (registerResponse.status === 200) {
        await this.Login(username, password);
        this.state = new SuccessStateStore();
      }
    } catch (error) {
      this.state = new ErrorStateStore(error);
    }
  }

  public Logout()  {
    this.token  = '';
    this.refreshToken  = '';
    this.user  = undefined;
    localStorage.removeItem('TribeRefreshToken');
    localStorage.removeItem('TribeToken');
  }

  public async Refresh()  {
    try {
      if (this.refreshToken)  {
        const response = await UserServices.Refresh(this.refreshToken);
        if (response.data)  {
          runInAction(()  =>  {
            this.token  = response.data.accessToken;
            this.refreshToken  = response.data.refreshToken;
          })
          localStorage.setItem('TribeRefreshToken', response.data.refreshToken);
          localStorage.setItem('TribeToken', response.data.accessToken);
        }
        this.state  = new SuccessStateStore();
      }
    } catch (error)  {
      this.state = new ErrorStateStore(error);
    }
  }

  public async GetUserInfo() {
    this.state = new FetchingStateStore();
    try {
      if (this.token)  {
        const response = await UserServices.GetUserInfo();
        if (response.data)  {
          runInAction(()  =>  {
            this.user = {
              id: response.data.id,
              username: response.data.username,
              email: response.data.email,
            };
          })
        }
      }
      this.state = new SuccessStateStore();
    } catch (error) {
      this.state = new ErrorStateStore(error);
    }
  }
}

export default UserStore;
