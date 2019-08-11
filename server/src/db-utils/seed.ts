import * as Knex from 'knex';
import config from '../config';
import { Item } from 'common';

const SEED_DATA: Item[] = [
  {
    id: 1,
    name: 'Name 1',
    value: 'Value 1',
  },
  {
    id: 2,
    name: 'Name 2',
    value: 'Value 2',
  },
];

// CLI script for running knex migrations. Should never be run directly from application code.
export const seed = async () => {
  const knex = Knex(config.knex);
  knex('item')
    .insert(SEED_DATA)
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Seed failed', error); // tslint:disable-line:no-console
      process.exit(1);
    });
};
