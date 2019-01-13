import { isWebUri } from 'valid-url';

export function isInteger(value: string | number): boolean {

    return Number.isInteger(Number(value));
}

export function isUrl(value: string): boolean {

    return isWebUri(value) !== undefined;
}

export const integerValidator = {

    validator: isInteger,
    message: '{PATH} must be an integer.'
};

export const urlValidator = {

    validator: isUrl,
    message: '{PATH} must be a valid URI.'
};

export default { isInteger, isUrl, integerValidator, urlValidator };
