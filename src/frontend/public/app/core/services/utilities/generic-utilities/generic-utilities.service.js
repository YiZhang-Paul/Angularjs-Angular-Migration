export class GenericUtilitiesService {

    joinText(text, delimiter = '-') {

        const trimmed = text.trim().replace(/\s{2,}/g, ' ');

        return trimmed.replace(/\s/g, delimiter);
    }

    excludeIndex(collection, index) {

        return excludeIndex(collection, index);
    }

    hasMatchingValues(a, b, keys) {

        return keys.every(key => a[key] === b[key]);
    }

    hasOwnProperties(object, keys) {

        return keys.every(key => object.hasOwnProperty(key));
    }

    findByProperties(objects, object, keys) {

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
