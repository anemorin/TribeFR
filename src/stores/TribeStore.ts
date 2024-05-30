import { makeAutoObservable } from "mobx";
import StateStore from "./StateStores/StateStore";
import { TribesServices } from "../services/TribesServices";
import SuccessStateStore from "./StateStores/SuccessStateStore";
import ErrorStateStore from "./StateStores/ErrorStateStore";
import FetchingStateStore from "./StateStores/FetchingStateStore";
import { TribeType, UserPositionType, UserType } from "../types/TribesTypes";
import { OptionType } from "../components/ui/fields/SelectField";


class TribeStore {
  state?: StateStore;

  name?: string;

  creatorId?: string;

  id?: string;

  participantsIds?: string[];

  positions?: UserPositionType[]

  users: UserType[];

  children?: UserType[];

  participant?: UserType[]

  searchUsers?: UserType[];

  _selectedUser?: UserPositionType;

  constructor(tribes: TribeType) {
    this.name = tribes.name;
    this.creatorId = tribes.creatorId;
    this.id = tribes.id;
    this.participantsIds = tribes.participantsIds;
    this.positions = tribes.positions;
    this.users = [];
    this.searchUsers = []

    makeAutoObservable(this);
  }

  public addTaskListUsers(userId: string) {
    const currentUser = this.positions?.find((user)  =>  user.userId  ===  userId);

    return currentUser?.childrenIds.map((id)  =>  {
      const userData = this.users.find((user) => user.id === id);

      return {
        label: userData?.email,
        value: userData?.id
      } as OptionType
    });
  }

  public get preparedUsers() {
    return this.searchUsers?.map((user) => {
      return {
        label: user.email,
        value: user.id
      } as OptionType
    })
  }

  public get selectedUser()  {
    return this._selectedUser;
  }

  public set selectedUser(user)  {
    this._selectedUser = user;
  }

  public async GetTribeUsers() {
    this.state = new FetchingStateStore();
    try {
      const usersIds = this.participantsIds

      if (usersIds) {
        const response = await TribesServices.GetUsers(usersIds);
        if (response.status ===  200) {
          this.state = new SuccessStateStore()
          this.users = response.data;
        }
      } else {
        this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async FindUserByNames(name: string) {
    this.state = new FetchingStateStore();
    try {
      if (name) {
        const response = await TribesServices.GetUsersByName(name);
        if (response.status ===  200) {
          this.state = new SuccessStateStore()
          this.searchUsers = response.data;
        }
      } else {
        this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async GetChildrenByIds(ids: string[]) {
    this.state = new FetchingStateStore();
    try {
      this.children = [];
      if (ids.length > 0) {
        const response = await TribesServices.GetUsers(ids);
        if (response.status ===  200) {
          this.state = new SuccessStateStore()
          this.children = response.data;
          console.warn(this.children)
        }
      } else {
        this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async GetParticipantByIds(ids: string[]) {
    this.state = new FetchingStateStore();
    try {
      this.participant = [];
      if (ids.length > 0) {
        const response = await TribesServices.GetUsers(ids);
        if (response.status ===  200) {
          this.state = new SuccessStateStore()
          this.participant = response.data;
        }
      } else {
        this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async AddUser(userId: string, currentUserId: string) {
    this.state = new FetchingStateStore();
    try {
      if (userId && this.id) {
        const response = await TribesServices.AddUserToTribe(this.id, userId, currentUserId);
        if (response.status ===  200)  {
          this.state  = new SuccessStateStore()
        }
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

}

export { TribeStore };