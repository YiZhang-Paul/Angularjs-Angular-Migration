import * as chai from 'chai';
import chaiHttp = require('chai-http');
import config = require('config');
import 'mocha';

import { server } from '../../../apis/v1/app';

chai.use(chaiHttp);
const expect = chai.expect;

context('index route integration test', () => {

    const rootUrl = config.get<string>('root_url');

    describe('/', () => {

        it('should redirect to root url', done => {

            chai.request(server)
                .get('/')
                .end((_: any, res: any) => {

                    expect(res.redirects).to.be.not.empty;
                    expect(res.redirects[0].endsWith(rootUrl)).to.be.true;
                    done();
                });
        });
    });

    describe(`${rootUrl}`, () => {

        it('should return 200 OK status code', done => {

            chai.request(server)
                .get(rootUrl)
                .end((_: any, res: any) => {

                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
    });
});
