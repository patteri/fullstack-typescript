import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { Item, validateItem } from 'common';
import validateBody from './middleware/validateBody';

const items: Item[] = [{ id: '1', name: 'Name 1', value: 'Value 1' }, { id: '2', name: 'Name 2', value: 'Value 2' }];

class App {
  public express;

  constructor() {
    this.express = express();
    this.express.use(bodyParser.json());
    this.mountRoutes();
    this.serveStatic();
  }

  private mountRoutes(): void {
    const router = express.Router();

    router.get('/api/items', (req, res) => {
      res.json(items);
    });

    router.put('/api/items', validateBody(validateItem), (req, res) => {
      items.push({ ...req.body, id: (items.length + 1).toString() });

      res.json(items);
    });

    this.express.use('/', router);
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
