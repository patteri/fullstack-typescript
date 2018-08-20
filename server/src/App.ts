import * as express from 'express'
import * as bodyParser from 'body-parser'

const items = [
  { id: '1', name: 'Name 1', value: 'Value 1' },
  { id: '2', name: 'Name 2', value: 'Value 2' },
];

class App {
  public express

  constructor () {
    this.express = express()
    this.express.use(bodyParser.json());
    this.mountRoutes()
  }

  private mountRoutes (): void {
    const router = express.Router()
    
    router.get('/api/items', (req, res) => {
      res.json(items)
    })

    router.put('/api/items', (req, res) => {
      items.push({ id: (items.length + 1).toString(), ...req.body });
      
      res.json(items)
    })
    
    this.express.use('/', router)
  }
}

export default new App().express
