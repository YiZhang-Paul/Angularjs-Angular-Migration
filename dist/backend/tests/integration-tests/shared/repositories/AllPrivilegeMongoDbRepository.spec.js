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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var testModel_1 = require("./testModel");
var AllPrivilegeMongoDbRepository_1 = require("../../../../shared/repositories/AllPrivilegeMongoDbRepository");
var AllPrivilegeMongoDbRepositoryForTest = /** @class */ (function (_super) {
    __extends(AllPrivilegeMongoDbRepositoryForTest, _super);
    function AllPrivilegeMongoDbRepositoryForTest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AllPrivilegeMongoDbRepositoryForTest;
}(AllPrivilegeMongoDbRepository_1.default));
context('AllPrivilegeMongoDbRepository integration test', function () {
    var fields = ['field_1', 'field_2', 'field_3', 'field_4'];
    var repository;
    beforeEach('test setup', function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testModel_1.default.clear()];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, testModel_1.default.addDefault(3)];
                case 2:
                    _a.sent();
                    repository = new AllPrivilegeMongoDbRepositoryForTest(testModel_1.default);
                    return [2 /*return*/];
            }
        });
    }); });
    describe('insert()', function () {
        it('should insert documents into database', function () { return __awaiter(_this, void 0, void 0, function () {
            var total, expected, inserted, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, testModel_1.default.total()];
                    case 1:
                        total = _b.sent();
                        expected = createDataList(fields, 5, total + 1);
                        return [4 /*yield*/, repository.insert(expected)];
                    case 2:
                        inserted = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, testModel_1.default.total()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(total + inserted.length);
                        chai_1.expect(hasSameDataList(expected, inserted)).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('insertOne()', function () {
        it('should insert one document into database', function () { return __awaiter(_this, void 0, void 0, function () {
            var total, expected, result, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, testModel_1.default.total()];
                    case 1:
                        total = _b.sent();
                        expected = createData(fields, total + 1);
                        return [4 /*yield*/, repository.insertOne(expected)];
                    case 2:
                        result = _b.sent();
                        _a = chai_1.expect;
                        return [4 /*yield*/, testModel_1.default.total()];
                    case 3:
                        _a.apply(void 0, [_b.sent()]).to.equal(total + 1);
                        chai_1.expect(hasSameData(expected, result)).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('find()', function () {
        it('should find all documents', function () { return __awaiter(_this, void 0, void 0, function () {
            var result, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, repository.find()];
                    case 1:
                        result = _c.sent();
                        chai_1.expect(result).is.not.empty;
                        _b = (_a = chai_1.expect(result.length).to).equal;
                        return [4 /*yield*/, testModel_1.default.total()];
                    case 2:
                        _b.apply(_a, [_c.sent()]);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should find all documents matching the criteria', function () { return __awaiter(_this, void 0, void 0, function () {
            var total, expected, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, testModel_1.default.total()];
                    case 1:
                        total = _a.sent();
                        expected = 2;
                        return [4 /*yield*/, repository.find({ id: { $gt: total - expected } })];
                    case 2:
                        result = _a.sent();
                        chai_1.expect(total).to.be.greaterThan(expected);
                        chai_1.expect(result.length).to.equal(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should include expected fields in projection', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, expected, projection, option, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        expected = [fields[0], fields[2]];
                        projection = (_a = { '_id': 0 }, _a[expected[0]] = 1, _a[expected[1]] = 1, _a);
                        option = { projection: projection };
                        return [4 /*yield*/, repository.find({}, option)];
                    case 1:
                        result = _b.sent();
                        result.forEach(function (document) {
                            var paths = Object.keys(document.toObject());
                            chai_1.expect(paths).to.deep.equal(expected);
                        });
                        return [2 /*return*/];
                }
            });
        }); });
        it('should include selected fields', function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, option, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = fields.slice(2);
                        option = { select: expected };
                        return [4 /*yield*/, repository.find({}, option)];
                    case 1:
                        result = _a.sent();
                        result.forEach(function (document) {
                            var paths = Object.keys(document.toObject());
                            // ensure field 3 and field 4 are not the only fields in result
                            chai_1.expect(isSubArray(expected, paths)).to.be.true;
                        });
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('findOne()', function () {
        it('should find document matching the criteria', function () { return __awaiter(_this, void 0, void 0, function () {
            var expected, result, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        expected = 2;
                        return [4 /*yield*/, repository.findOne({ id: expected })];
                    case 1:
                        result = _a.sent();
                        id = result.toObject()['id'];
                        chai_1.expect(result).is.not.null;
                        chai_1.expect(id).to.equal(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should include expected fields in projection', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, id, expected, projection, option, result, paths;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = 1;
                        expected = [fields[0], fields[2]];
                        projection = (_a = { '_id': 0 }, _a[expected[0]] = 1, _a[expected[1]] = 1, _a);
                        option = { projection: projection };
                        return [4 /*yield*/, repository.findOne({ id: id }, option)];
                    case 1:
                        result = _b.sent();
                        paths = Object.keys(result.toObject());
                        chai_1.expect(result).is.not.null;
                        chai_1.expect(paths).to.deep.equal(expected);
                        return [2 /*return*/];
                }
            });
        }); });
        it('should include selected fields', function () { return __awaiter(_this, void 0, void 0, function () {
            var id, expected, option, result, paths;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = 1;
                        expected = fields.slice(2);
                        option = { select: expected };
                        return [4 /*yield*/, repository.findOne({ id: id }, option)];
                    case 1:
                        result = _a.sent();
                        paths = Object.keys(result.toObject());
                        chai_1.expect(result).is.not.null;
                        // ensure field 3 and field 4 are not the only fields in result
                        chai_1.expect(isSubArray(expected, paths)).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('update()', function () {
        it('should update all documents', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, field, value, original, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        field = fields[1];
                        value = 'updated_field';
                        return [4 /*yield*/, repository.find({})];
                    case 1:
                        original = _b.sent();
                        return [4 /*yield*/, repository.update((_a = {}, _a[field] = value, _a))];
                    case 2:
                        result = _b.sent();
                        chai_1.expect(original.some(function (_) { return _.toObject()[field] === value; })).to.be.false;
                        chai_1.expect(result.every(function (_) { return _.toObject()[field] === value; })).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
        it('should update all documents matching the criteria', function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, field, value, filter, original, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        field = fields[1];
                        value = 'updated_field';
                        filter = { id: { $gt: 2 } };
                        return [4 /*yield*/, repository.find(filter)];
                    case 1:
                        original = _b.sent();
                        return [4 /*yield*/, repository.update((_a = {}, _a[field] = value, _a), filter)];
                    case 2:
                        result = _b.sent();
                        chai_1.expect(result.length).to.equal(original.length);
                        chai_1.expect(original.some(function (_) { return _.toObject()[field] === value; })).to.be.false;
                        chai_1.expect(result.every(function (_) { return _.toObject()[field] === value; })).to.be.true;
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
// TODO: move these to separate class
function getRandomString() {
    return Math.random() + "." + Math.random() + "." + Math.random();
}
function createData(fields, id) {
    var data = { id: id };
    fields.forEach(function (field) {
        data[field] = getRandomString();
    });
    return data;
}
function createDataList(fields, total, startId) {
    var data = [];
    for (var i = 0; i < total; i++) {
        data.push(createData(fields, startId + i));
    }
    return data;
}
function hasSameData(expected, result) {
    return Object.keys(expected).every(function (key) { return result[key] === expected[key]; });
}
function hasSameDataList(expected, result) {
    if (result.length !== expected.length) {
        return false;
    }
    return result.every(function (data, index) { return hasSameData(expected[index], data); });
}
function isSubArray(array1, array2) {
    if (array1.length >= array2.length) {
        return false;
    }
    return array1.every(function (_) { return array2.includes(_); });
}
//# sourceMappingURL=AllPrivilegeMongoDbRepository.spec.js.map