import IDataReducer from './IDataReducer.interface';
import IReducibleGameDataAdapter from './IReducibleGameDataAdapter.interface';

export default class GameDataReducer implements IDataReducer {

    private _adapter: IReducibleGameDataAdapter;

    constructor(adapter: IReducibleGameDataAdapter) {

        this._adapter = adapter;
    }

    private formatName(name: string): string {

        return name.trim()
                   .toLowerCase()
                   .replace(/[^\s\w]/g, '')
                   .replace(/\s{2,}/g, ' ');
    }

    public reduce(data: any[]): any[] {

        const reduced = new Map<string, any>();
        const converted = data.map(_ => this._adapter.convert(_));

        for (const _ of converted) {

            const name = this.formatName(_.name);

            const providerDetail = {

                provider_id: _.provider_id,
                provider_game_id: _.provider_game_id,
                provider_game_name: _.provider_game_name
            };

            if (!reduced.has(name)) {

                reduced.set(name, {

                    name,
                    image: _.image,
                    view_count: _.view_count,
                    search_api_keys: [providerDetail]
                });

                continue;
            }

            const game = reduced.get(name);
            game.view_count = `${+game.view_count + +_.view_count}`;
            game.search_api_keys.push(providerDetail);
        }

        return Array.from(reduced).map(pair => pair[1]);
    }
}
