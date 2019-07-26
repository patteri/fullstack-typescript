import { reducerWithInitialState } from 'typescript-fsa-reducers';
import remove from 'lodash/remove';
import { Item } from 'common';
import { changeName, changeValue, fetchItems, createItem, removeItem } from './actions';

export interface AppReducerState {
  name: string;
  value: string;
  items: Item[];
  isLoading: boolean;
}

const initialState: AppReducerState = {
  name: '',
  value: '',
  items: [],
  isLoading: false,
};

const reducer = reducerWithInitialState(initialState)
  .case(changeName, (state, value) => ({ ...state, name: value }))
  .case(changeValue, (state, value) => ({ ...state, value }))
  .case(fetchItems.started, state => ({ ...state, isLoading: true }))
  .case(fetchItems.done, (state, response) => ({ ...state, isLoading: false, items: response.result }))
  .case(fetchItems.failed, (state, error) => {
    console.log('Fetching items failed', error);
    return { ...state, isLoading: false };
  })
  .case(createItem.started, state => ({ ...state, isLoading: true }))
  .case(createItem.done, (state, response) => {
    const items = state.items.slice();
    items.push(response.result);
    return { ...state, name: '', value: '', isLoading: false, items };
  })
  .case(createItem.failed, (state, error) => {
    console.log('Creating item failed', error);
    return { ...state, isLoading: false };
  })
  .case(removeItem.started, state => ({ ...state, isLoading: true }))
  .case(removeItem.done, (state, response) => {
    const items = state.items.slice();
    remove(items, { id: response.result.id });
    return { ...state, isLoading: false, items };
  })
  .case(removeItem.failed, (state, error) => {
    console.log('Deleting item failed', error);
    return { ...state, isLoading: false };
  });

export default reducer;
