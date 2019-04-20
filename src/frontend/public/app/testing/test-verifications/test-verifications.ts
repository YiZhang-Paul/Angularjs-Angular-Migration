export function hasMatchingValue(object: any, objects: any[], key: string): boolean {

    return objects.some(_ => _[key] === object[key]);
}

export function hasAuthenticationToken(header: any): boolean {

    return /^bearer\s+\w+\.\w+\.\w+$/i.test(header.Authorization);
}

export default {

    hasMatchingValue,
    hasAuthenticationToken
};
