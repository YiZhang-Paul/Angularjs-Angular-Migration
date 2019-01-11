import { expect } from 'chai';
import { Document } from 'mongoose';
import { assert as sinonExpect, SinonStub, stub } from 'sinon';

import SequentialIdGenerator from '../../../../shared/repositories/SequentialIdGenerator';
import TestModel from '../../../testModel';

context('SequentialIdGenerator unit test', () => {

    let ensureIndexesStub: SinonStub;
    let findStub: SinonStub;
    let generator: SequentialIdGenerator;

    beforeEach('test setup', () => {

        ensureIndexesStub = stub(TestModel, 'ensureIndexes');
        findStub = stub(TestModel, 'find');
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

            setupFind(findStub, []);

            await generator.generate();

            sinonExpect.calledOnce(findStub);
        });

        it('should generate next id when collection is not empty', async () => {

            const key = generator.key;
            const id = '1';
            const document = new TestModel({ [key]: id });
            setupFind(findStub, [document]);

            const result = await generator.generate();

            expect(+result).to.equal(+id + 1);
        });

        it('should generate default id when collection is empty', async () => {

            const expected = '0';
            setupFind(findStub, []);

            const result = await generator.generate();

            expect(result).to.equal(expected);
        });
    });
});

function setupFind(findStub: SinonStub, result: Document[]): void {

    const limitQuery = { limit: () => Promise.resolve(result) };
    const sortQuery = { sort: () => limitQuery };

    findStub.returns(sortQuery);
}
