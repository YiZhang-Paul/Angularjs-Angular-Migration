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

function isOrdered(array: any[], key: string, order: -1 | 1): boolean {

    return array.every((_, index, all) => {

        if (index === 0) {

            return true;
        }

        const previous = key ? all[index - 1][key] : all[index - 1];
        const current = key ? _[key] : _;

        return order > 0 ? previous <= current : previous >= current;
    });
}

export function isAscendingOrder(array: any[], key: string): boolean {

    return isOrdered(array, key, 1);
}

export function isDescendingOrder(array: any[], key: string): boolean {

    return isOrdered(array, key, -1);
}

export function getRandomString(): string {

    return `${Math.random()}.${Math.random()}.${Math.random()}`;
}
