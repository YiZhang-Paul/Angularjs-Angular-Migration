import { Document } from 'mongoose';

import KeyRemover from '../../../shared/services/key-remover/key-remover';
import IKeyRemover from '../../../shared/services/key-remover/key-remover.interface';
import ViewHistoryRepositoryFactory from '../../../shared/repositories/view-history-repository/view-history-repository.factory';
import IViewHistoryRepository from '../../../shared/repositories/view-history-repository/view-history-repository.interface';

export class ViewHistoryService {

    private _viewHistoryRepository: IViewHistoryRepository;
    private _remover: IKeyRemover;

    constructor(

        viewHistoryRepository: IViewHistoryRepository,
        remover: IKeyRemover

    ) {

        this._viewHistoryRepository = viewHistoryRepository;
        this._remover = remover;
    }

    private toObject(document: Document): any {

        const object = document.toObject();
        const keys = ['_id', '__v'];

        return this._remover.remove([object], keys)[0];
    }

    public async getHistory(id: number, userId: number): Promise<any> {

        const filter = { id, user_id: userId };
        const result = await this._viewHistoryRepository.findOne(filter);

        return result ? this.toObject(result) : null;
    }

    public async getHistories(id: number): Promise<any[]> {

        const filter = { user_id: id };
        const result = await this._viewHistoryRepository.find(filter);

        return result.map(_ => this.toObject(_));
    }

    public async clearHistory(id: number, userId: number): Promise<boolean> {

        const filter = { id, user_id: userId };

        return this._viewHistoryRepository.deleteOne(filter);
    }

    public async clearHistories(id: number): Promise<boolean> {

        const filter = { user_id: id };
        const result = await this._viewHistoryRepository.delete(filter);

        return !!result;
    }
}

export default new ViewHistoryService(

    new ViewHistoryRepositoryFactory().createRepository(),
    new KeyRemover()
);
