require('dotenv').config();
import * as path from 'path';

const config = {
  port: parseInt(process.env.PORT || '3001', 10),

  knex: {
    client: 'pg',
    version: '10.5',
    connection: process.env.NODE_ENV !== 'test' ? process.env.DB_CONNECTION : process.env.DB_CONNECTION_TEST,
    migrations: {
      tableName: 'migrations',
      directory: path.join(__dirname, 'migrations'),
    },
    pool: {
      min: 0,
      max: 10,
      afterCreate: (conn: any, cb: any) => {
        conn.query('SET timezone="UTC";', (err: any) => cb(err, conn));
      },
    },
  },

  // Used for creating and destroying database during tests
  knexDbManager: {
    superUser: process.env.DB_USERNAME,
    superPassword: process.env.DB_PASSWORD,
  },
};

export default config;
