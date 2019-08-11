import axios, { AxiosPromise } from 'axios';
import { Item } from 'common';

export const getItems = (): AxiosPromise<Item[]> => axios.get('/api/items');

export const addItem = (item: Item): AxiosPromise<Item> => axios.post('/api/items', item);

export const deleteItem = (id: number): AxiosPromise<Item> => axios.delete(`/api/items/${id}`);
