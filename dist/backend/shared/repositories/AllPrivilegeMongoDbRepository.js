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
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDbRepository_1 = require("./MongoDbRepository");
var AllPrivilegeMongoDbRepository = /** @class */ (function (_super) {
    __extends(AllPrivilegeMongoDbRepository, _super);
    function AllPrivilegeMongoDbRepository() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AllPrivilegeMongoDbRepository.prototype.insert = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var inserted, documents, _i, documents_1, document_1, isInserted;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        inserted = [];
                        documents = data.map(function (_) { return _this.toDocument(_); });
                        _i = 0, documents_1 = documents;
                        _a.label = 1;
                    case 1:
                        if (!(_i < documents_1.length)) return [3 /*break*/, 4];
                        document_1 = documents_1[_i];
                        return [4 /*yield*/, document_1.save().catch(function () { return false; })];
                    case 2:
                        isInserted = !!(_a.sent());
                        if (isInserted) {
                            inserted.push(document_1);
                        }
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, inserted];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.insertOne = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var inserted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.insert([data])];
                    case 1:
                        inserted = _a.sent();
                        return [2 /*return*/, inserted[0]];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.appendSelect = function (query, select) {
        select.forEach(function (field) {
            // must prepend '+' for selected fields
            query = query.select("+" + field.replace(/^\+/, ''));
        });
        return query;
    };
    AllPrivilegeMongoDbRepository.prototype.find = function (filter, option) {
        if (filter === void 0) { filter = {}; }
        if (option === void 0) { option = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                query = this._model.find(filter, option.projection);
                if (option.select) {
                    return [2 /*return*/, this.appendSelect(query, option.select)];
                }
                return [2 /*return*/, query];
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.findOne = function (filter, option) {
        if (filter === void 0) { filter = {}; }
        if (option === void 0) { option = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = this._model.find(filter, option.projection).limit(1);
                        if (option.select) {
                            query = this.appendSelect(query, option.select);
                        }
                        return [4 /*yield*/, query];
                    case 1: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.updateWithResult = function (document, data) {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, document.update(data)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.update = function (data, filter) {
        if (filter === void 0) { filter = {}; }
        return __awaiter(this, void 0, void 0, function () {
            var updated, documents, _i, documents_2, document_2, isUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        updated = [];
                        return [4 /*yield*/, this.find(filter)];
                    case 1:
                        documents = _a.sent();
                        _i = 0, documents_2 = documents;
                        _a.label = 2;
                    case 2:
                        if (!(_i < documents_2.length)) return [3 /*break*/, 5];
                        document_2 = documents_2[_i];
                        return [4 /*yield*/, this.updateWithResult(document_2, data)];
                    case 3:
                        isUpdated = _a.sent();
                        if (isUpdated) {
                            updated.push(document_2);
                        }
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, updated];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.updateOne = function (data, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var document, isUpdated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(filter)];
                    case 1:
                        document = _a.sent();
                        if (!document) {
                            return [2 /*return*/, new Array()[0]];
                        }
                        return [4 /*yield*/, this.updateWithResult(document, data)];
                    case 2:
                        isUpdated = _a.sent();
                        return [2 /*return*/, isUpdated ? document : {}];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.deleteWithResult = function (document) {
        return __awaiter(this, void 0, void 0, function () {
            var error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, document.remove()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                    case 2:
                        error_2 = _a.sent();
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.delete = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var totalDeleted, documents, _i, documents_3, document_3, isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        totalDeleted = 0;
                        return [4 /*yield*/, this.find(filter)];
                    case 1:
                        documents = _a.sent();
                        _i = 0, documents_3 = documents;
                        _a.label = 2;
                    case 2:
                        if (!(_i < documents_3.length)) return [3 /*break*/, 5];
                        document_3 = documents_3[_i];
                        return [4 /*yield*/, this.deleteWithResult(document_3)];
                    case 3:
                        isDeleted = _a.sent();
                        totalDeleted += isDeleted ? 1 : 0;
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, totalDeleted];
                }
            });
        });
    };
    AllPrivilegeMongoDbRepository.prototype.deleteOne = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var document, isDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findOne(filter)];
                    case 1:
                        document = _a.sent();
                        if (!document) {
                            return [2 /*return*/, 0];
                        }
                        return [4 /*yield*/, this.deleteWithResult(document)];
                    case 2:
                        isDeleted = _a.sent();
                        return [2 /*return*/, isDeleted ? 1 : 0];
                }
            });
        });
    };
    return AllPrivilegeMongoDbRepository;
}(MongoDbRepository_1.default));
exports.default = AllPrivilegeMongoDbRepository;
//# sourceMappingURL=AllPrivilegeMongoDbRepository.js.map