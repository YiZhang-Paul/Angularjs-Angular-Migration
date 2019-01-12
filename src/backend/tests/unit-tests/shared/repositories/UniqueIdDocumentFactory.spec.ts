import { expect } from 'chai';
import { assert as sinonExpect, SinonStubbedInstance } from 'sinon';

import { createIdGeneratorStub } from '../../../stubs/IdGeneratorStub';
import IIdGenerator from '../../../../shared/repositories/IIdGenerator.interface';
import TestModel from '../../../testModel';
import { createEmptyObjects, getField } from '../../../testUtilities';
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

            expect(getField(result, generator.key)).to.equal(id);
            sinonExpect.calledOnce(generator.generate);
        });
    });

    describe('createDocuments()', () => {

        it('should create documents with unique ids', async () => {

            const data = createEmptyObjects(4);

            const result = await factory.createDocuments(data);

            expect(result).is.not.empty;
            expect(result.length).to.equal(data.length);
            sinonExpect.callCount(generator.showNext, data.length);
            sinonExpect.calledOnce(generator.generate);

            result.forEach((_, index) => {

                const expectedId = `${+id + index}`;
                expect(getField(_, generator.key)).to.equal(expectedId);
            });
        });
    });
});