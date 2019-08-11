import actionCreatorFactory from 'typescript-fsa';
import asyncWorker from '../../utils/asyncWorker';
import { getItems, addItem, deleteItem } from '../../api/itemApi';
import { Item } from 'common';

const actionCreator = actionCreatorFactory('app');

export const changeName = actionCreator<string>('CHANGE_NAME');

export const changeValue = actionCreator<string>('CHANGE_VALUE');

export const fetchItems = actionCreator.async<{}, Item[], any>('FETCH_ITEMS');
export const fetchItemsWorker = asyncWorker(fetchItems, () => getItems());

export const createItem = actionCreator.async<Item, Item, any>('CREATE_ITEMS');
export const createItemWorker = asyncWorker(createItem, (item: Item) => addItem(item));

export const removeItem = actionCreator.async<number, Item, any>('REMOVE_ITEM');
export const removeItemWorker = asyncWorker(removeItem, (id: number) => deleteItem(id));
