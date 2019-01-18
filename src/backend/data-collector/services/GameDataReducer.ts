import IDataReducer from './IDataReducer.interface';
import IReducedGameData from './IReducedGameData.interface';
import IReducibleGameDataAdapter from './IReducibleGameDataAdapter.interface';

export default class GameDataReducer implements IDataReducer {

    private _adapter: IReducibleGameDataAdapter;

    constructor(adapter: IReducibleGameDataAdapter) {

        this._adapter = adapter;
    }

    private reduceName(name: string): string {

        return name.trim()
            .toLowerCase()
            .replace(/[^\s\w]/g, '')
            .replace(/\s{2,}/g, ' ')
            .replace(/^the\s|\sthe$/g, '')
            .replace(/\sthe\s/g, ' ');
    }

    private getProviderData(data: IReducedGameData): any {

        return {

            provider_id: data.provider_id,
            provider_game_id: data.provider_game_id,
            provider_game_name: data.provider_game_name
        };
    }

    private addData(map: Map<string, any>, key: string, data: IReducedGameData): void {

        map.set(key, {

            name: key,
            image: data.image,
            view_count: data.view_count,
            search_api_keys: [this.getProviderData(data)]
        });
    }

    private mergeData(map: Map<string, any>, key: string, data: IReducedGameData): void {

        const target = map.get(key);

        target['view_count'] = `${+target['view_count'] + +data.view_count}`;
        target['search_api_keys'].push(this.getProviderData(data));
    }

    private reduceData(map: Map<string, any>, data: IReducedGameData): void {

        const key = this.reduceName(data.name);

        if (!map.has(key)) {

            this.addData(map, key, data);

            return;
        }

        this.mergeData(map, key, data);
    }

    private toArray(map: Map<string, any>): any[] {

        return Array.from(map).map(_ => _[1]);
    }

    public reduce(data: any[]): any[] {

        const reduced = new Map<string, any>();
        const converted = data.map(_ => this._adapter.convert(_));

        for (const _ of converted) {

            this.reduceData(reduced, _);
        }

        return this.toArray(reduced);
    }
}
