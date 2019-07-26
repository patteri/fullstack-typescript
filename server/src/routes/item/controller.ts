import { RequestHandler } from 'express';
import { Item } from 'common';
import { find, remove } from 'lodash';

const items: Item[] = [{ id: '1', name: 'Name 1', value: 'Value 1' }, { id: '2', name: 'Name 2', value: 'Value 2' }];

export const listItems: RequestHandler = async (req, res) => {
  res.json(items);
};

export const addItem: RequestHandler = async (req, res) => {
  const newItem = { ...req.body, id: (items.length + 1).toString() };
  items.push(newItem);

  res.json(newItem);
};

export const removeItem: RequestHandler = async (req, res) => {
  const { id } = req.params;
  const item = find(items, { id });
  if (!item) {
    return res.status(404).send();
  }
  remove(items, cur => cur.id === id);

  res.json(item);
};
