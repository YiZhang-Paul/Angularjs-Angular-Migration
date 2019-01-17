import { Document } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

type Stubbed = SinonStubbedInstance<Document>;

export function createDocumentStub(object = {}, resolve = true): Stubbed {

    const stubbed = stub({} as Document);

    stubbed.toObject = stub();
    stubbed.toObject.returns(object);

    stubbed.save = stub();
    stubbed.save.rejects(new Error());

    stubbed.remove = stub();
    stubbed.remove.rejects(new Error());

    if (resolve) {

        stubbed.save.resolves(stubbed);
        stubbed.remove.resolves(stubbed);
    }

    return stubbed;
}

export function createDocumentStubs(objects = [{}], resolve = true): Stubbed[] {

    const stubs: Stubbed[] = [];

    for (const object of objects) {

        stubs.push(createDocumentStub(object, resolve));
    }

    return stubs;
}
