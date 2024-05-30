import { makeAutoObservable } from "mobx";
import StateStore from "./StateStores/StateStore";
import { TribesServices } from "../services/TribesServices";
import SuccessStateStore from "./StateStores/SuccessStateStore";
import ErrorStateStore from "./StateStores/ErrorStateStore";
import FetchingStateStore from "./StateStores/FetchingStateStore";
import { TribeStore } from "./TribeStore";


class TribesStore {
  tribes?: TribeStore[];

  state?: StateStore;

  _selectedTribeId?: string;

  constructor() {
    this.tribes = [];
    makeAutoObservable(this);
  }

  public get selectedTribeId()  {
    return this._selectedTribeId ?? '';
  }

  public set selectedTribeId(id: string)  {
    this._selectedTribeId  =  id;
  }

  public async GetTribes() {
    this.state = new FetchingStateStore();
    try {
      const response = await TribesServices.GetTribes();
      if (response.status === 200) {
        this.tribes = [
          ...response.data.map(
            (tribe) => new TribeStore(tribe)
          )];
        this.state = new SuccessStateStore()
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async CreateTribe(creatorId: string, name: string) {
    this.state = new FetchingStateStore();
    try {
      const response = await TribesServices.CreateTribe(creatorId, name);
      if (response.status === 200) {
        this.state = new SuccessStateStore()
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async ChangeNameTribe(tribeId: string, newName: string) {
    this.state = new FetchingStateStore();
    try {
      const response = await TribesServices.ChangeName(tribeId, newName);
      if (response.status === 200) {
        this.state = new SuccessStateStore()
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }


  public async GetTribesUsers(tribeId: string) {
    this.state = new FetchingStateStore();
    try {
      const usersIds = this.tribes?.find((tribe) => tribe.id === tribeId)?.participantsIds
      if (usersIds) {
        const response = await TribesServices.GetUsers(usersIds);
        if (response.status ===  200) {
          this.state = new SuccessStateStore()
          return response.data;
        }
      } else {
        this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  public async DeleteTribe(tribeId: string) {
    this.state = new FetchingStateStore();
    try {
      await TribesServices.DeleteTribe(tribeId);
      this._selectedTribeId = '';
      this.state  = new SuccessStateStore()
    } catch  (error)  {
      this.state  = new ErrorStateStore(error)
    }
  }
}

export { TribesStore };