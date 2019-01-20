import { expect } from 'chai';
import { assert as sinonExpect, SinonStubbedInstance } from 'sinon';

import { createEmptyObjects } from '../../../generic-test-utilities';
import IIdGenerator from '../../../../shared/repositories/id-generator.interface';
import { createIdGeneratorStub } from '../../../stubs/id-generator.stub';
import { getFieldString } from '../../../mongoose-test-utilities';
import TestModel from '../../../test-model';
import UniqueIdDocumentGenerator from '../../../../shared/repositories/unique-id-document-factory';

context('UniqueIdDocumentGenerator unit test', () => {

    const id = '29';
    let generator: SinonStubbedInstance<IIdGenerator>;
    let factory: UniqueIdDocumentGenerator;

    beforeEach('test setup', () => {

        generator = createIdGeneratorStub(TestModel, id);
        factory = new UniqueIdDocumentGenerator(generator);
    });

    describe('createDocument()', () => {

        it('should create document with id', async () => {

            const result = await factory.createDocument({});

            expect(getFieldString(result, generator.key)).to.equal(id);
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
                expect(getFieldString(_, generator.key)).to.equal(expectedId);
            });
        });
    });
});
