import * as validatorJs from 'validator';

export function isInteger(value: string | number): boolean {

    return Number.isInteger(Number(value));
}

export function isNonEmptyArray(array: any[]): boolean {

    return array.length > 0;
}

export function isEmail(value: string): boolean {

    return validatorJs.isEmail(value);
}

export function isUrl(value: string): boolean {

    return validatorJs.isURL(value);
}

export const integerValidator = {

    validator: isInteger,
    message: '{PATH} must be an integer.'
};

export const nonEmptyArrayValidator = {

    validator: isNonEmptyArray,
    message: '{PATH} must be non-empty.'
};

export const emailValidator = {

    validator: isEmail,
    message: '{PATH} must be a valid e-mail.'
};

export const urlValidator = {

    validator: isUrl,
    message: '{PATH} must be a valid URI.'
};

export default {

    isInteger,
    isNonEmptyArray,
    isEmail,
    isUrl,
    integerValidator,
    nonEmptyArrayValidator,
    emailValidator,
    urlValidator
};
