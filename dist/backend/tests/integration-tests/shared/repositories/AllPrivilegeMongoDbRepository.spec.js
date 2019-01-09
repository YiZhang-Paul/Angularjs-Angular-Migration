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
var mongoose = require("mongoose");
var AllPrivilegeMongoDbRepository_1 = require("../../../../shared/repositories/AllPrivilegeMongoDbRepository");
var schema = new mongoose.Schema({
    test_field_1: String,
    test_field_2: String,
    test_field_3: { type: String, select: false },
    test_field_4: { type: String, select: false }
});
var TestModel = mongoose.model('TestModel', schema);
var AllPrivilegeMongoDbRepositoryForTest = /** @class */ (function (_super) {
    __extends(AllPrivilegeMongoDbRepositoryForTest, _super);
    function AllPrivilegeMongoDbRepositoryForTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllPrivilegeMongoDbRepositoryForTest.prototype.toDocument = function (data) { return {}; };
    return AllPrivilegeMongoDbRepositoryForTest;
}(AllPrivilegeMongoDbRepository_1.default));
context('AllPrivilegeMongoDbRepository integration test', function () {
    var repository;
    beforeEach('test setup', function () {
        repository = new AllPrivilegeMongoDbRepositoryForTest(TestModel);
    });
    describe('insert()', function () {
    });
});
//# sourceMappingURL=AllPrivilegeMongoDbRepository.spec.js.map