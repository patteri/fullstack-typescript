import * as supertest from 'supertest';
import * as chai from 'chai';
import { Server } from 'http';
import { startServer, closeServer } from '../../utils/test';

const expect = chai.expect;

let app: Server | undefined;

before(async () => {
  app = await startServer();
});

after(async () => {
  await closeServer(app);
});

describe('Item API', () => {
  describe('POST /api/items', () => {
    it('Can add item', () =>
      supertest(app)
        .post('/api/items')
        .send({ name: 'new name', value: 'new value' })
        .expect('Content-Type', /json/)
        .expect(200)
        .then(r => {
          expect(r.body.id).to.equal(1);
          expect(r.body.name).to.equal('new name');
          expect(r.body.value).to.equal('new value');
        }));

    it('Item is validated', () =>
      supertest(app)
        .post('/api/items')
        .send({ value: 'new value' })
        .expect('Content-Type', /json/)
        .expect(400));
  });

  describe('GET /api/items', () => {
    it('Can get items', () =>
      supertest(app)
        .get('/api/items')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(r => {
          expect(r.body).to.be.an('array');
          expect(r.body.length).to.equal(1);
        }));
  });

  describe('DELETE /api/items/:id', () => {
    it('Can remove item', () =>
      supertest(app)
        .delete('/api/items/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(r => {
          expect(r.body.name).to.equal('new name');
          expect(r.body.value).to.equal('new value');
        }));

    it('Fails if item not found', () =>
      supertest(app)
        .delete('/api/items/4')
        .expect(404)
        .then());
  });
});
