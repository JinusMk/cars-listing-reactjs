import { createStore, applyMiddleware } from 'redux';
import { saveStore } from './globalStore';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk'

export default function configureStore() {
  const store = createStore(rootReducer, {}, applyMiddleware(thunk))
  saveStore(store);
  return store;
}
