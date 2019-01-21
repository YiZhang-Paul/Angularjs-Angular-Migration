import IDataAdapter from './data-adapter.interface';

type KeyMapping = { source: string; target: string; delimiter?: string };

export default abstract class DataAdapter implements IDataAdapter {

    protected readValue(object: any, keys: string[]): any {

        if (object === undefined || !keys.length) {

            return object;
        }

        return this.readValue(object[keys[0]], keys.slice(1));
    }

    protected applyMapping(from: any, to: any, mapping: KeyMapping): any {

        const { source, target, delimiter } = mapping;
        const keys = delimiter ? source.split(delimiter) : [source];
        const value = this.readValue(from, keys);

        if (!to.hasOwnProperty(target) && value !== undefined) {

            to[target] = value;
        }

        return to;
    }

    protected applyMappings(from: any, to: any, mappings: KeyMapping[]): any {

        for (const mapping of mappings) {

            to = this.applyMapping(from, to, mapping);
        }

        return to;
    }

    public abstract convert(data: any): any;
}
