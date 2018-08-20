import { createStore } from 'redux';
import appReducer from './reducers/app';

const store = createStore(
  appReducer,
);

export default store;
