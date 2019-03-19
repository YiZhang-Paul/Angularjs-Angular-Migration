import { Document } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

type Stubbed = SinonStubbedInstance<Document>;

export function createDocumentStub(object = {}): Stubbed {

    const stubbed = stub({} as Document);

    stubbed.toObject = stub();
    stubbed.toObject.returns(object);

    stubbed.save = stub();
    stubbed.save.rejects(new Error());

    stubbed.remove = stub();
    stubbed.remove.rejects(new Error());

    return stubbed;
}

export function createDocumentStubs(objects = [{}]): Stubbed[] {

    const stubs: Stubbed[] = [];

    for (const object of objects) {

        stubs.push(createDocumentStub(object));
    }

    return stubs;
}
