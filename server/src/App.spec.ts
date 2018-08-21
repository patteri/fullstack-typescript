import * as supertest from 'supertest';
import * as chai from 'chai';
import App from './App';

const expect = chai.expect;

describe('App', () => {
  it('Can get items', () =>
    supertest(App)
      .get('/api/items')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((r) => {
        expect(r.body).to.be.an('array');
      })
  );

  it('Can add item', () =>
    supertest(App)
      .put('/api/items')
      .send({ name: 'new name', value: 'new value' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then((r) => {
        expect(r.body).to.be.an('array');
        expect(r.body[r.body.length - 1].name).to.equal('new name');
        expect(r.body[r.body.length - 1].value).to.equal('new value');
      })
  );

  it('Item is validated', () =>
    supertest(App)
      .put('/api/items')
      .send({ value: 'new value' })
      .expect('Content-Type', /json/)
      .expect(400)
  );
});
