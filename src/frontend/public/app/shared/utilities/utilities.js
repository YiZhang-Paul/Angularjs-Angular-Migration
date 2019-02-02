// TODO: use value provider
export function joinText(text, delimiter = '-') {

    return text.trim().replace(/\s/g, delimiter);
}

export function excludeIndex(collection, index) {

    if (index < 0 || index > collection.length - 1) {

        throw new Error('Invalid Index.');
    }

    return [...collection.slice(0, index), ...collection.slice(index + 1)];
}

export function hasMatchingValues(a, b, keys) {

    return keys.every(key => a[key] === b[key]);
}

export function hasOwnProperties(object, keys) {

    return keys.every(key => object.hasOwnProperty(key));
}
export function findByProperties(objects, filter, keys) {

    return objects.find(_ => {

        return hasMatchingValues(_, filter, keys);
    });
}

export default {

    excludeIndex,
    hasMatchingValues,
    hasOwnProperties,
    findByProperties
};
