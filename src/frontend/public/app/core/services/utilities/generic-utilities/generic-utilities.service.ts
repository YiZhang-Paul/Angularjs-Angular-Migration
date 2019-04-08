import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class GenericUtilitiesService {

    public joinText(text, delimiter = '-') {

        const trimmed = text.trim().replace(/\s{2,}/g, ' ');

        return trimmed.replace(/\s/g, delimiter);
    }

    public excludeIndex(collection, index) {

        return excludeIndex(collection, index);
    }

    public hasMatchingValues(a, b, keys) {

        return keys.every(key => a[key] === b[key]);
    }

    public hasOwnProperties(object, keys) {

        return keys.every(key => object.hasOwnProperty(key));
    }

    public findByProperties(objects, object, keys) {

        const result = objects.find(_ => {

            return this.hasMatchingValues(_, object, keys);
        });

        return result ? result : null;
    }
}

export function excludeIndex(collection, index) {

    if (index < 0 || index > collection.length - 1) {

        throw new Error('Invalid Index.');
    }

    return [...collection.slice(0, index), ...collection.slice(index + 1)];
}
