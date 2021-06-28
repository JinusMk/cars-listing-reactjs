import { createStore } from 'redux';
import { saveStore } from './globalStore';
import rootReducer from './rootReducer';

export default function configureStore() {
  const store = createStore(rootReducer);
  saveStore(store);
  return store;
}
