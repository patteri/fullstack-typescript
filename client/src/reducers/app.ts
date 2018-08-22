import { Item } from 'common';
import {
  AppAction,
  CHANGE_NAME,
  CHANGE_VALUE,
  FETCH_ITEMS,
} from '../actions/app';

export interface AppReducerState {
  name: string;
  value: string;
  items: Item[];
}

const initialState: AppReducerState = {
  name: '',
  value: '',
  items: [],
};

const appReducer = (state: AppReducerState = initialState, action: AppAction): AppReducerState => {
  switch (action.type) {
    case CHANGE_NAME:
      return { ...state, name: action.value };
    case CHANGE_VALUE:
      return { ...state, value: action.value };
    case FETCH_ITEMS:
      return { ...state, items: action.data };
  }
  return state;
};

export default appReducer;
