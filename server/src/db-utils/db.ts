import * as Knex from 'knex';

let knex: Knex.QueryInterface;

export const initDb = (config: any) => {
  knex = Knex(config);
};

export default () => knex;
