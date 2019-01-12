import { Document } from 'mongoose';

export function createEmptyObjects(total: number): any[] {

    return new Array(total).fill(0).map(_ => ({}));
}

export function getField(document: Document, field: string): string {

    return String(document.toObject()[field]);
}
