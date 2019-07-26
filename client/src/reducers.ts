import { combineReducers } from 'redux';
import appReducer, { AppReducerState } from './pages/App/reducer';

export interface RootState {
  app: AppReducerState;
}

export default combineReducers({
  app: appReducer,
});
