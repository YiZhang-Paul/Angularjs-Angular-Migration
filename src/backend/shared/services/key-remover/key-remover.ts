import IKeyRemover from './key-remover.interface';

export default class KeyRemover implements IKeyRemover {

    public remove(data: any[], keys: string[]): any[] {

        return data.map(_ => {

            const json = JSON.stringify(_, (key, value) => {

                return keys.includes(key) ? undefined : value;
            });

            return JSON.parse(json);
        });
    }
}
