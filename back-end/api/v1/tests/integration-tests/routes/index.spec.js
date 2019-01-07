process.env.NODE_ENV = 'testing';
global.config = require('config');
process.env.PORT = global.config.port;

const app = require('../../../app');
const server = app.server;
const rootUrl = global.config.root_url;
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

context('index route integration test', () => {

    describe('/', () => {

        it('should redirect to root url', done => {

            chai.request(server)
                .get('/')
                .end((_, res) => {

                    expect(res.redirects).to.be.not.empty;
                    expect(res.redirects[0].endsWith(rootUrl)).to.be.true;
                    done();
                });
        });
    });

    describe('/api/version', () => {

        it('should return 200 OK status code', done => {

            chai.request(server)
                .get(rootUrl)
                .end((_, res) => {

                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });
});
