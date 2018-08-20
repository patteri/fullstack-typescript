import { AppAction, CHANGE_NAME, CHANGE_VALUE } from '../actions/app';

export interface AppReducerState {
  name: string;
  value: string;
}

const initialState: AppReducerState = {
  name: '',
  value: '',
};

const appReducer = (state: AppReducerState = initialState, action: AppAction): AppReducerState => {
  switch(action.type) {
    case CHANGE_NAME:
      return { ...state, name: action.value };
    case CHANGE_VALUE:
      return { ...state, value: action.value };
  }
  return state;
}

export default appReducer;
