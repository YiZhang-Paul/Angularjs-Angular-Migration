import mongoose = require('mongoose');
import { Document, Model } from 'mongoose';
import { expect } from 'chai';
import IQueryOption from '../../../../shared/repositories/IQueryOption.interface';
import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';

const schema = new mongoose.Schema({

    test_field_1: String,
    test_field_2: String,
    test_field_3: { type: String, select: false },
    test_field_4: { type: String, select: false }
});

const TestModel = mongoose.model('TestModel', schema);

class AllPrivilegeMongoDbRepositoryForTest extends AllPrivilegeMongoDbRepository {

    protected toDocument(data: any): Document { return <Document>{}; }
}

context('AllPrivilegeMongoDbRepository integration test', () => {

    let repository: AllPrivilegeMongoDbRepositoryForTest;

    beforeEach('test setup', () => {

        repository = new AllPrivilegeMongoDbRepositoryForTest(TestModel);
    });

    describe('insert()', () => {


    });
});
