import * as Knex from 'knex';
import config from '../config';

// CLI script for running knex migrations. Should never be run directly from application code.
export const migrate = () => {
  Knex(config.knex)
    .migrate.latest()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Migration failed', error); // tslint:disable-line:no-console
      process.exit(1);
    });
};

migrate();
