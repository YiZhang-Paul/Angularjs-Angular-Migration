"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("config");
require("mocha");
var chai = require("chai");
var chai_1 = require("chai");
var chaiHttp = require("chai-http");
var app_1 = require("../../../apis/v1/app");
chai.use(chaiHttp);
context('index route integration test', function () {
    var rootUrl = config.get('root_url');
    describe('/', function () {
        it('should redirect to root url', function (done) {
            chai.request(app_1.server)
                .get('/')
                .end(function (_, res) {
                chai_1.expect(res.redirects).to.be.not.empty;
                chai_1.expect(res.redirects[0].endsWith(rootUrl)).to.be.true;
                done();
            });
        });
    });
    describe("" + rootUrl, function () {
        it('should return 200 OK status code', function (done) {
            chai.request(app_1.server)
                .get(rootUrl)
                .end(function (_, res) {
                chai_1.expect(res.statusCode).to.equal(200);
                done();
            });
        });
    });
});
//# sourceMappingURL=index.spec.js.map