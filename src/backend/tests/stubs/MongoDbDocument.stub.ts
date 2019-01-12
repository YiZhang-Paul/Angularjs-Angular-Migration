import { Document } from 'mongoose';
import { SinonStubbedInstance, stub } from 'sinon';

type Stubbed = SinonStubbedInstance<Document>;

export function createDocumentStub(resolve = true): Stubbed {

    const stubbed = stub({} as Document);

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

export function createDocumentStubs(total: number, resolve = true): Stubbed[] {

    return new Array(total).fill(0).map(_ => createDocumentStub(resolve));
}
