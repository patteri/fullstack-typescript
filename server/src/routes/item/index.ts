import { Router } from 'express';
import validateBody from '../../middleware/validateBody';
import { validateItem } from 'common';

import { listItems, addItem, removeItem } from './controller';

export const registerApi = (router: Router) => {
  router.get('/api/items', listItems);
  router.post('/api/items', validateBody(validateItem), addItem);
  router.delete('/api/items/:id', removeItem);
};
