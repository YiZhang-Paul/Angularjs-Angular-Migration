export function createEmptyObjects(total: number): any[] {

    return new Array(total).fill(0).map(_ => ({}));
}

export function createDataObject(keys: string[]): any {

    const data: { [_: string]: any } = {};

    for (const key of keys) {

        data[key] = getRandomString();
    }

    return data;
}

export function createDataObjects(keys: string[], total: number): any[] {

    const data = [];

    for (let i = 0; i < total; i++) {

        data.push(createDataObject(keys));
    }

    return data;
}

export function isSubObject(subObject: any, object: any): boolean {

    const keys = Object.keys(subObject);

    return keys.every(_ => `${subObject[_]}` === `${object[_]}`);
}

export function areSubObjects(subObjects: any[], objects: any[]): boolean {

    if (subObjects.length !== objects.length) {

        return false;
    }

    return subObjects.every((_, index) => isSubObject(_, objects[index]));
}

export function isSameArray<T>(a: T[], b: T[]): boolean {

    if (a.length !== b.length) {

        return false;
    }

    const lookup = new Set(b);

    return a.every(_ => lookup.has(_));
}

export function isSubArray<T>(subArray: T[], array: T[]): boolean {

    if (subArray.length >= array.length) {

        return false;
    }

    const lookup = new Set(array);

    return subArray.every(_ => lookup.has(_));
}

export function getRandomString(): string {

    return `${Math.random()}.${Math.random()}.${Math.random()}`;
}
