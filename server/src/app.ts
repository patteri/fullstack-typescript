import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import registerRoutes from './routes';

class App {
  public express;
  private router: express.Router;

  constructor() {
    this.express = express();
    this.router = express.Router();

    this.express.use(bodyParser.json()).use(this.router);

    registerRoutes(this.router);
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
