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
