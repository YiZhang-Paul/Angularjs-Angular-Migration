import IDataAdapter from './IDataAdapter.interface';

type KeyMapping = { from: string; to: string };

export default abstract class DataAdapter implements IDataAdapter {

    protected applyMapping(source: any, target: any, mapping: KeyMapping): any {

        if (source.hasOwnProperty(mapping.from)) {

            target[mapping.to] = source[mapping.from];
        }

        return target;
    }

    protected applyMappings(source: any, target: any, mappings: KeyMapping[]): any {

        for (const mapping of mappings) {

            target = this.applyMapping(source, target, mapping);
        }

        return target;
    }

    public abstract convert(data: any): any;
}
