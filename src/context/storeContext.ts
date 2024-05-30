import { createContext } from 'react';
import UserStore from '../stores/UserStore';
import { TribesStore } from '../stores/TribesStore';

export const storeContext = createContext({
  userStore: new UserStore(),
  tribesStore: new TribesStore(),
});
