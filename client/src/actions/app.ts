import Item from '../types/item';

export const CHANGE_NAME = 'CHANGE_NAME';
export type CHANGE_NAME = typeof CHANGE_NAME;

export const CHANGE_VALUE = 'CHANGE_VALUE';
export type CHANGE_VALUE = typeof CHANGE_VALUE;

export const FETCH_ITEMS = 'FETCH_ITEMS';
export type FETCH_ITEMS = typeof FETCH_ITEMS;

export interface ChangeName {
  type: CHANGE_NAME;
  value: string;
}

export interface ChangeValue {
  type: CHANGE_VALUE;
  value: string;
}

export interface FetchItems {
  type: FETCH_ITEMS;
  data: Item[];
}

export type AppAction = ChangeName | ChangeValue | FetchItems;

export const changeName = (value: string): ChangeName => ({
  type: CHANGE_NAME,
  value,
});

export const changeValue = (value: string): ChangeValue => ({
  type: CHANGE_VALUE,
  value,
});

export const fetchItems = (data: Item[]): FetchItems => ({
  type: FETCH_ITEMS,
  data,
});
