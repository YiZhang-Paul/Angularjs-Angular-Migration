import { expect } from 'chai';
import { Document } from 'mongoose';

export function getField(document: Document, field: string): any {

    return document.toObject()[field];
}

export function getFieldString(document: Document, field: string): string {

    return `${getField(document, field)}`;
}

export function getFieldNames(document: Document): string[] {

    return Object.keys(document.toObject());
}

export async function getValidationError(

    document: Document,
    field: string

    ): Promise<any> {

    let result = null;

    await document.validate(error => {

        if (error && error.errors && error.errors[field]) {

            result = error.errors[field];
        }
    });

    return result;
}

export async function verifyValidationError(

    document: Document,
    field: string,
    type: string

): Promise<void> {

    const error = await getValidationError(document, field);

    expect(error).is.not.null;
    expect(error.kind).to.equal(type);
}

export async function verifyCastError(

    document: Document,
    field: string

): Promise<void> {

    const error = await getValidationError(document, field);

    expect(error).is.not.null;
    expect(error.name).to.equal('CastError');
}

export async function verifyCustomError(

    document: Document,
    field: string,
    message: string

): Promise<void> {

    const error = await getValidationError(document, field);

    expect(error).is.not.null;
    expect(error.message).to.equal(message);
}
