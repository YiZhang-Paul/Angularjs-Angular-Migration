"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MongoDbRepository = /** @class */ (function () {
    function MongoDbRepository(model) {
        this._model = model;
    }
    MongoDbRepository.prototype.insert = function (data) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.insertOne = function (data) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.find = function (filter, option) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.findOne = function (filter, option) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.update = function (data, filter) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.updateOne = function (data, filter) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.delete = function (filter) {
        throw new Error('not supported');
    };
    MongoDbRepository.prototype.deleteOne = function (filter) {
        throw new Error('not supported');
    };
    return MongoDbRepository;
}());
exports.default = MongoDbRepository;
//# sourceMappingURL=MongoDbRepository.js.map