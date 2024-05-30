import { createContext } from 'react';
import UserStore from '../stores/UserStore';
import { TribesStore } from '../stores/TribesStore';


const tempUserStore = new UserStore();

export const storeContext = createContext({
  userStore: tempUserStore,
  tribesStore: new TribesStore(tempUserStore),
});
