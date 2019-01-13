import { isWebUri } from 'valid-url';

export function isInteger(value: string | number): boolean {

    return Number.isInteger(Number(value));
}

export function isNonEmptyArray(array: any[]): boolean {

    return array.length > 0;
}

export function isUrl(value: string): boolean {

    return isWebUri(value) !== undefined;
}

export const integerValidator = {

    validator: isInteger,
    message: '{PATH} must be an integer.'
};

export const nonEmptyArrayValidator = {

    validator: isNonEmptyArray,
    message: '{PATH} must be non-empty.'
};

export const urlValidator = {

    validator: isUrl,
    message: '{PATH} must be a valid URI.'
};

export default {

    isInteger,
    isNonEmptyArray,
    isUrl,
    integerValidator,
    nonEmptyArrayValidator,
    urlValidator
};
