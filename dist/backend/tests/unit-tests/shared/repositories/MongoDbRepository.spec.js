"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var MongoDbRepository_1 = require("../../../../shared/repositories/MongoDbRepository");
var MongoDbRepositoryForTest = /** @class */ (function (_super) {
    __extends(MongoDbRepositoryForTest, _super);
    function MongoDbRepositoryForTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MongoDbRepositoryForTest.prototype.toDocument = function (data) { return {}; };
    return MongoDbRepositoryForTest;
}(MongoDbRepository_1.default));
context('MongoDbRepository unit test', function () {
    var data;
    var filter;
    var option;
    var model;
    var repository;
    var notSupportedError = 'not supported';
    beforeEach('test setup', function () {
        data = {};
        filter = {};
        option = {};
        model = {};
        repository = new MongoDbRepositoryForTest(model);
    });
    describe('insert()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.insert([data]); }).to.throw(notSupportedError);
        });
    });
    describe('insertOne()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.insertOne(data); }).to.throw(notSupportedError);
        });
    });
    describe('find()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.find(filter, option); }).to.throw(notSupportedError);
        });
    });
    describe('findOne()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.findOne(filter, option); }).to.throw(notSupportedError);
        });
    });
    describe('update()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.update(data, filter); }).to.throw(notSupportedError);
        });
    });
    describe('updateOne()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.updateOne(data, filter); }).to.throw(notSupportedError);
        });
    });
    describe('delete()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.delete(filter); }).to.throw(notSupportedError);
        });
    });
    describe('deleteOne()', function () {
        it('should throw not supported error', function () {
            chai_1.expect(function () { return repository.deleteOne(filter); }).to.throw(notSupportedError);
        });
    });
});
//# sourceMappingURL=MongoDbRepository.spec.js.map