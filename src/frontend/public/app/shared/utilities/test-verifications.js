export function hasMatchingValue(object, objects, key) {

    return objects.some(_ => _[key] === object[key]);
}

export function hasAuthenticationToken(header) {

    return /^bearer\s+\w+\.\w+\.\w+$/i.test(header.Authorization);
}

export default {

    hasMatchingValue,
    hasAuthenticationToken
};
