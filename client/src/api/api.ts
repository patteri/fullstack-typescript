import axios, { AxiosPromise } from 'axios';
import { Item } from 'common';

export const getItems = (): AxiosPromise<Item[]> => axios.get('/api/items');

export const addItem = (item: Item): AxiosPromise<Item[]> => axios.put('/api/items', item);
