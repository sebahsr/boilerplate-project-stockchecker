const chaiHttp = require('chai-http');
const chai = require('chai');
const server = require('../server');
const { expect } = chai;

chai.use(chaiHttp);

describe('Functional Tests', () => {
  it('Viewing one stock: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('object');
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        done();
      });
  });

  it('Viewing one stock and liking it: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('object');
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        done();
      });
  });

  it('Viewing the same stock and liking it again: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: 'GOOG', like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('object');
        expect(res.body.stockData).to.have.property('stock');
        expect(res.body.stockData).to.have.property('price');
        expect(res.body.stockData).to.have.property('likes');
        done();
      });
  });

  it('Viewing two stocks: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'MSFT'] })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array');
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('stock');
        done();
      });
  });

  it('Viewing two stocks and liking them: GET request to /api/stock-prices/', (done) => {
    chai.request(server)
      .get('/api/stock-prices')
      .query({ stock: ['GOOG', 'MSFT'], like: true })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.stockData).to.be.an('array');
        expect(res.body.stockData[0]).to.have.property('stock');
        expect(res.body.stockData[1]).to.have.property('stock');
        expect(res.body.stockData[0]).to.have.property('rel_likes');
        expect(res.body.stockData[1]).to.have.property('rel_likes');
        done();
      });
  });
});
