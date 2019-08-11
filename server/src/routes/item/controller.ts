import { RequestHandler } from 'express';
import db from '../../db-utils/db';

export const listItems: RequestHandler = async (req, res) => {
  res.json(
    await db()
      .table('item')
      .select()
  );
};

export const addItem: RequestHandler = async (req, res) => {
  const result = await db()
    .table('item')
    .insert(req.body)
    .returning('*');
  res.json(result[0]);
};

export const removeItem: RequestHandler = async (req, res) => {
  const { id } = req.params;

  const result = await db()
    .table('item')
    .delete()
    .where({ id })
    .returning('*');

  if (result.length === 0) {
    return res.status(404).send();
  }
  res.json(result[0]);
};
