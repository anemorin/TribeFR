import { createContext } from 'react';
import UserStore from '../stores/UserStore';
import { TribesStore } from '../stores/TribesStore';
import { TasksStore } from '../stores/TasksStore';

export const storeContext = createContext({
  userStore: new UserStore(),
  tribesStore: new TribesStore(),
  tasksStore: new TasksStore(),
});
