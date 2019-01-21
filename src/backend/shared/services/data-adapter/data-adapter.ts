import IDataAdapter from './data-adapter.interface';

type KeyMapping = { source: string; target: string; delimiter?: string };

export default abstract class DataAdapter implements IDataAdapter {
    // TODO: allow nested
    protected applyMapping(from: any, to: any, mapping: KeyMapping): any {

        const { source, target } = mapping;

        if (!to.hasOwnProperty(target) && from.hasOwnProperty(source)) {

            to[target] = from[source];
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
