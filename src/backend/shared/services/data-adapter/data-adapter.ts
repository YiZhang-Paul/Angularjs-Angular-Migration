import IDataAdapter from './data-adapter.interface';
import IDataKeyMapping from './data-key-mapping.interface';

export default abstract class DataAdapter<T> implements IDataAdapter {

    protected _rules: any;

    constructor(rules: any) {

        this._rules = rules;
    }

    protected getMappings(groups: string[]): IDataKeyMapping[] {

        const mappings: IDataKeyMapping[] = [];

        for (const group of groups) {

            mappings.push(...this._rules[group]);
        }

        return mappings;
    }

    private isNullOrUndefined(object: any): boolean {

        return object === undefined || object === null;
    }

    protected readValue(object: any, keys: string[]): any {

        if (this.isNullOrUndefined(object)) {

            return undefined;
        }

        if (!keys.length) {

            return object;
        }

        return this.readValue(object[keys[0]], keys.slice(1));
    }

    protected applyMapping(from: any, to: any, mapping: IDataKeyMapping): any {

        const { source, target, delimiter } = mapping;
        const keys = delimiter ? source.split(delimiter) : [source];
        const value = this.readValue(from, keys);

        if (!to.hasOwnProperty(target) && value !== undefined) {

            to[target] = value;
        }

        return to;
    }

    protected applyMappings(from: any, to: any, mappings: IDataKeyMapping[]): any {

        for (const mapping of mappings) {

            to = this.applyMapping(from, to, mapping);
        }

        return to;
    }

    public convert(data: any): T {

        const mappings = this.getMappings(['general', 'mixer']);

        return this.applyMappings(data, {}, mappings) as T;
    }
}
