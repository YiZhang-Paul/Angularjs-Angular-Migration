import { isWebUri } from 'valid-url';

export function isInteger(value: string | number): boolean {

    return Number.isInteger(Number(value));
}

export function isUrl(value: string): boolean {

    return isWebUri(value) !== undefined;
}

export default { isInteger, isUrl };
