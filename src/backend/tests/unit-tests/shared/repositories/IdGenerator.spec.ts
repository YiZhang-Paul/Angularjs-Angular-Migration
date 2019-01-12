import { assert as sinonExpect, SinonStub, stub } from 'sinon';

import IdGenerator from '../../../test-classes/IdGenerator.testClass';
import TestModel from '../../../testModel';

context('IdGenerator unit test', () => {

    let ensureIndexesStub: SinonStub;
    let generator: IdGenerator;

    beforeEach('test setup', () => {

        ensureIndexesStub = stub(TestModel, 'ensureIndexes');
        generator = new IdGenerator(TestModel);
    });

    afterEach('test teardown', () => {

        ensureIndexesStub.restore();
    });

    describe('constructor()', () => {

        it('should create index on instantiation', () => {

            const expected = { [generator.key]: -1 };

            sinonExpect.calledOnce(ensureIndexesStub);
            sinonExpect.calledWith(ensureIndexesStub, expected);
        });
    });
});
