import { expect } from 'chai';
import { assert as sinonExpect, SinonStub, SinonStubbedInstance, stub } from 'sinon';

// TODO: review other tests
import AllPrivilegeMongoDbRepository from '../../../../shared/repositories/AllPrivilegeMongoDbRepository';
import IIdGenerator from '../../../../shared/repositories/IIdGenerator.interface';
import TestModel from '../../../testModel';

context('AllPrivilegeMongoDbRepository unit test', () => {

    let generator: SinonStubbedInstance<IIdGenerator>;
    let showNextStub: SinonStub;
    let generateStub: SinonStub;
    let saveStub: SinonStub;
    let repository: AllPrivilegeMongoDbRepository;

    beforeEach('test setup', () => {

        generator = stub({} as IIdGenerator);
        showNextStub = stub(generator, 'showNext');
        generateStub = stub(generator, 'generate');
        repository = new AllPrivilegeMongoDbRepository(TestModel, generator);
    });

    afterEach('test teardown', () => {

        showNextStub.restore();
        generateStub.restore();
        saveStub.restore();
    });

    describe('insert()', () => {

        it('should return all inserted documents when all documents were inserted', async () => {

            const id = '2';
            const field_1 = 'field_1';
            const data = [{ field_1 }, { field_1 }, { field_1 }, { field_1 }];
            showNextStub.callsFake(value => String(+value + 1));
            generateStub.resolves(id);

            const result = await repository.insert(data);

            expect(result.length).to.equal(data.length);
            expect(result.every((_, index) => _.toObject()['id'] === String(+id + index)));
            sinonExpect.callCount(saveStub, result.length);
        });

        // it('should only return documents that were successfully inserted', () => {

        // });

        // it('should return empty collection when no documents were inserted', () => {

        // });
    });
});
