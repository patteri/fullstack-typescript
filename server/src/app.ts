import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as Knex from 'knex';
import config from './config';
import { initDb } from './db-utils/db';
import registerRoutes from './routes';

class App {
  public express;
  private router: express.Router;

  constructor() {
    this.express = express();
    this.router = require('express-promise-router')();
    this.express.use(bodyParser.json()).use(this.router);

    registerRoutes(this.router);
    initDb(config.knex);

    this.serveStatic();
  }

  private serveStatic(): void {
    // Express serves static assets only in production
    if (process.env.NODE_ENV === 'production') {
      const pathName = path.join(__dirname, '../../client/build');
      this.express.use(express.static(pathName));
      this.express.get('*', (req, res) => {
        res.sendFile(`${pathName}/index.html`);
      });
    }
  }
}

export default new App().express;
