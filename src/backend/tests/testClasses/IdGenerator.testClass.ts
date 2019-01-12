import IdGenerator from '../../shared/repositories/IdGenerator';

export default class IdGeneratorForTest extends IdGenerator {

    public showNext(_id: string): string {

        return '';
    }

    public async generate(): Promise<string> {

        return Promise.resolve('');
    }
}
