import { assert as sinonExpect, SinonStub, stub } from 'sinon';

import IdGenerator from '../../../../shared/repositories/IdGenerator';
import TestModel from '../../../testModel';

class IdGeneratorForTest extends IdGenerator {

    public showNext(_id: string): string { return ''; }

    public async generate(): Promise<string> { return Promise.resolve(''); }
}

context('IdGenerator unit test', () => {

    let ensureIndexesStub: SinonStub;
    let generator: IdGeneratorForTest;

    beforeEach('test setup', () => {

        ensureIndexesStub = stub(TestModel, 'ensureIndexes');
        generator = new IdGeneratorForTest(TestModel);
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
