import { makeAutoObservable } from "mobx";
import StateStore from "./StateStores/StateStore";
import SuccessStateStore from "./StateStores/SuccessStateStore";
import ErrorStateStore from "./StateStores/ErrorStateStore";
import FetchingStateStore from "./StateStores/FetchingStateStore";
import { TaskServices } from "../services/TaskServices";
import { TaskType } from "../types/TribesTypes";


class TasksStore {
  state?: StateStore;

  tasks?: TaskType[];

  constructor() {
    this.tasks = [];
    this.state = new SuccessStateStore();

    makeAutoObservable(this);
  }

  public async CreateTask(name: string, content: string, tribeId: string, performerId: string) {
    this.state = new FetchingStateStore();
    try {
      if (tribeId) {
        const response = await TaskServices.CreateTask(name, content, tribeId, performerId);
        if (response.status ===  200) {
          this.state = new SuccessStateStore()
        }
      } else {
        this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
      }
    } catch (error) {
      this.state = new ErrorStateStore(error)
    }
  }

  // public async GetChildrenByIds(ids: string[]) {
  //   this.state = new FetchingStateStore();
  //   try {
  //     this.children = [];
  //     if (ids.length > 0) {
  //       const response = await TribesServices.GetUsers(ids);
  //       if (response.status ===  200) {
  //         this.state = new SuccessStateStore()
  //         this.children = response.data;
  //         console.warn(this.children)
  //       }
  //     } else {
  //       this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
  //     }
  //   } catch (error) {
  //     this.state = new ErrorStateStore(error)
  //   }
  // }

  // public async GetParticipantByIds(ids: string[]) {
  //   this.state = new FetchingStateStore();
  //   try {
  //     this.participant = [];
  //     if (ids.length > 0) {
  //       const response = await TribesServices.GetUsers(ids);
  //       if (response.status ===  200) {
  //         this.state = new SuccessStateStore()
  //         this.participant = response.data;
  //       }
  //     } else {
  //       this.state = new ErrorStateStore(new Error('Произошла внештатная ситуация'))
  //     }
  //   } catch (error) {
  //     this.state = new ErrorStateStore(error)
  //   }
  // }

}

export { TasksStore };