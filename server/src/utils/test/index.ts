import { Server } from 'http';
import { databaseManagerFactory } from 'knex-db-manager';
import { parse } from 'pg-connection-string';

import config from '../../config';
import app from '../../app';
import db from '../../db-utils/db';

export const dbManager = databaseManagerFactory({
  knex: {
    ...config.knex,
    connection: parse(config.knex.connection),
  },
  dbManager: config.knexDbManager,
});

export const startServer = async (): Promise<Server> => {
  await dbManager.dropDb();
  await dbManager.createDb();
  await dbManager.migrateDb();

  return new Promise(resolve => {
    const server = app.listen(config.port, () => resolve(server));
  });
};

export const closeServer = async (server: Server | null) => {
  if (server) {
    await new Promise(resolve => server.close(resolve));
  }

  await dbManager.close();
  await (db() as any).destroy();
};

export const truncateDb = async () => dbManager.truncateDb();
