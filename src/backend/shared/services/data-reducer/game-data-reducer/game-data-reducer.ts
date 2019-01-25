import IDataReducer from '../data-reducer.interface';
import IGameDataAdapter from '../../data-adapter/game-data-adapter/game-data-adapter.interface';
import IReducibleGameData from '../../data-adapter/game-data-adapter/reducible-game-data.interface';

export default class GameDataReducer implements IDataReducer {

    private _adapter: IGameDataAdapter;

    constructor(adapter: IGameDataAdapter) {

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

    private getProvider(data: IReducibleGameData): any {

        return {

            provider_id: data.provider_id,
            provider_game_id: data.provider_game_id,
            provider_game_name: data.provider_game_name
        };
    }

    private addData(map: Map<string, any>, key: string, data: IReducibleGameData): void {

        map.set(key, {

            name: key,
            image: data.image,
            view_count: data.view_count,
            search_api_keys: [this.getProvider(data)]
        });
    }

    private mergeData(map: Map<string, any>, key: string, data: IReducibleGameData): void {

        const target = map.get(key);

        if (target) {

            target.view_count += data.view_count;
            target.search_api_keys.push(this.getProvider(data));
        }
    }

    private reduceData(map: Map<string, any>, data: IReducibleGameData): void {

        const key = this.reduceName(data.name);

        if (!map.has(key)) {

            this.addData(map, key, data);

            return;
        }

        this.mergeData(map, key, data);
    }

    private mapToArray(map: Map<string, any>): any[] {

        return Array.from(map).map(_ => _[1]);
    }

    public reduce(data: any[]): any[] {

        const reduced = new Map<string, any>();
        const reducible = data.map(_ => this._adapter.convert(_));

        for (const _ of reducible) {

            this.reduceData(reduced, _);
        }

        return this.mapToArray(reduced);
    }
}
