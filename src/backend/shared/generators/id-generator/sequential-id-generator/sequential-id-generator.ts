import IdGenerator from '../id-generator';

export default class SequentialIdGenerator extends IdGenerator {

    public showNext(id: string): string {

        return `${+id + 1}`;
    }

    public async generate(): Promise<string> {

        const latestId = await this.getLatestId();

        return /^\d+$/.test(latestId) ? this.showNext(latestId) : '0';
    }
}
