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

    hasMatchingValues,
    hasOwnProperties,
    findByProperties
};
