import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenericUtilitiesService {

    public joinText(text: string, delimiter = '-'): string {

        const trimmed = text.trim().replace(/\s{2,}/g, ' ');

        return trimmed.replace(/\s/g, delimiter);
    }

    public excludeIndex<T>(collection: T[], index: number): T[] {

        return excludeIndex(collection, index);
    }

    public hasMatchingValues(a: any, b: any, keys: string[]): boolean {

        return keys.every(key => a[key] === b[key]);
    }

    public hasOwnProperties(object: any, keys: string[]): boolean {

        return keys.every(key => object.hasOwnProperty(key));
    }

    public findByProperties(objects: any[], object: any, keys: string[]): any {

        const result = objects.find(_ => {

            return this.hasMatchingValues(_, object, keys);
        });

        return result ? result : null;
    }
}

export function excludeIndex<T>(collection: T[], index: number): T[] {

    if (index < 0 || index > collection.length - 1) {

        throw new Error('Invalid Index.');
    }

    return [...collection.slice(0, index), ...collection.slice(index + 1)];
}
