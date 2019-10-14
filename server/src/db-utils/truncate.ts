import { databaseManagerFactory } from 'knex-db-manager';
import { parse } from 'pg-connection-string';
import config from '../config';

export const dbManager = databaseManagerFactory({
  knex: {
    ...config.knex,
    connection: parse(config.knex.connection),
  },
  dbManager: config.knexDbManager,
});

export const truncate = async () => {
  try {
    await dbManager.truncateDb(['session']);
    process.exit(0);
  } catch (error) {
    console.log('Database truncate failed', error); // tslint:disable-line:no-console
    process.exit(1);
  }
};

truncate();
