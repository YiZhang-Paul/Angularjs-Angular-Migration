import { expect } from 'chai';
import { assert as sinonExpect, SinonStub, stub } from 'sinon';

import { createDocumentQueryStub } from '../../../test-utilities/test-stubs/mongodb-document-query.stub';
import TestModel from '../../../test-utilities/test-models/test-model';

import SequentialIdGenerator from './sequential-id-generator';

context('SequentialIdGenerator unit test', () => {

    let ensureIndexesStub: SinonStub;
    let findStub: SinonStub;
    let generator: SequentialIdGenerator;

    beforeEach('test setup', () => {

        ensureIndexesStub = stub(TestModel, 'ensureIndexes');
        findStub = stub(TestModel, 'find');
        findStub.returns(createDocumentQueryStub());
        generator = new SequentialIdGenerator(TestModel);
    });

    afterEach('test teardown', () => {

        ensureIndexesStub.restore();
        findStub.restore();
    });

    describe('showNext()', () => {

        it('should return next id', () => {

            const id = '5';

            const result = generator.showNext(id);

            expect(+result).to.equal(+id + 1);
        });
    });

    describe('generate()', () => {

        it('should find current id from database', async () => {

            await generator.generate();

            sinonExpect.calledOnce(findStub);
        });

        it('should generate next id when collection is not empty', async () => {

            const key = generator.key;
            const id = '0';
            const document = new TestModel({ [key]: id });
            const query = createDocumentQueryStub([document]);
            findStub.returns(query);

            const result = await generator.generate();

            expect(+result).to.equal(+id + 1);
        });

        it('should generate default id when collection is empty', async () => {

            const expected = '0';

            const result = await generator.generate();

            expect(result).to.equal(expected);
        });
    });
});
