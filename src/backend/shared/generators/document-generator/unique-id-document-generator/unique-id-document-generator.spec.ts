import { expect } from 'chai';
import { assert as sinonExpect, SinonStubbedInstance } from 'sinon';

import { createEmptyObjects } from '../../../test-utilities/generic-test-utilities';
import IIdGenerator from '../../id-generator/id-generator.interface';
import { createIdGeneratorStub } from '../../../test-utilities/test-stubs/id-generator.stub';
import { getFieldString } from '../../../test-utilities/mongoose-test-utilities';
import TestModel from '../../../test-utilities/test-models/test-model';

import UniqueIdDocumentGenerator from './unique-id-document-generator';

context('UniqueIdDocumentGenerator unit test', () => {

    const id = '29';
    let idGenerator: SinonStubbedInstance<IIdGenerator>;
    let documentGenerator: UniqueIdDocumentGenerator;

    beforeEach('test setup', () => {

        idGenerator = createIdGeneratorStub(TestModel, id);
        documentGenerator = new UniqueIdDocumentGenerator(idGenerator);
    });

    describe('createDocument()', () => {

        it('should create document with id', async () => {

            const result = await documentGenerator.createDocument({});

            expect(getFieldString(result, idGenerator.key)).to.equal(id);
            sinonExpect.calledOnce(idGenerator.generate);
        });
    });

    describe('createDocuments()', () => {

        it('should create documents with unique ids', async () => {

            const data = createEmptyObjects(4);

            const result = await documentGenerator.createDocuments(data);

            expect(result).is.not.empty;
            expect(result.length).to.equal(data.length);
            sinonExpect.callCount(idGenerator.showNext, data.length);
            sinonExpect.calledOnce(idGenerator.generate);

            result.forEach((_, index) => {

                const expectedId = `${+id + index}`;
                expect(getFieldString(_, idGenerator.key)).to.equal(expectedId);
            });
        });
    });
});
