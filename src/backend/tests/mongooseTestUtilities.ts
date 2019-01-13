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

export async function getValidationError(document: Document, field: string): Promise<any> {

    let result = null;

    await document.validate(error => {

        if (error && error.errors && error.errors[field]) {

            result = error.errors[field];
        }
    });

    return result;
}
