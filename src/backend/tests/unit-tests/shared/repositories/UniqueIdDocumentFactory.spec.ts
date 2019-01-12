import { expect } from 'chai';
import { assert as sinonExpect, SinonStubbedInstance, stub } from 'sinon';

import IIdGenerator from '../../../../shared/repositories/IIdGenerator.interface';
import TestModel from '../../../testModel';
import UniqueIdDocumentFactory from '../../../../shared/repositories/UniqueIdDocumentFactory';

context('UniqueIdDocumentFactory unit test', () => {

    const id = '29';
    let generator: SinonStubbedInstance<IIdGenerator>;
    let factory: UniqueIdDocumentFactory;

    beforeEach('test setup', () => {

        generator = createIdGeneratorStub(id);
        factory = new UniqueIdDocumentFactory(TestModel, generator);
    });

    describe('createDocument()', () => {

        it('should create document with id', async () => {

            const result = await factory.createDocument({});

            expect(String(result.toObject()[generator.key])).to.equal(id);
            sinonExpect.calledOnce(generator.generate);
        });
    });

    describe('createDocuments()', () => {

        it('should create documents with unique ids', async () => {

            const data = createEmptyObjects(4);

            const result = await factory.createDocuments(data);

            expect(result).is.not.empty;
            expect(result.length).to.equal(data.length);
            sinonExpect.calledOnce(generator.generate);
            sinonExpect.callCount(generator.showNext, data.length);

            result.forEach((_, index) => {

                expect(String(_.toObject()[generator.key])).to.equal(String(+id + index));
            });
        });
    });
});

function createEmptyObjects(total: number): any[] {

    return new Array(total).fill(0).map(_ => ({}));
}

function createIdGeneratorStub(id: string): SinonStubbedInstance<IIdGenerator> {

    const stubbed = stub({} as IIdGenerator);

    Object.defineProperty(stubbed, 'key', { value: 'id' });

    stubbed.showNext = stub();
    stubbed.showNext.callsFake((_: string) => String(+_ + 1));

    stubbed.generate = stub();
    stubbed.generate.resolves(id);

    return stubbed;
}
