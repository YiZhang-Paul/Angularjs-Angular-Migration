import models from '../../models';
import SequentialIdRepositoryFactory from '../sequential-id-repository.factory';

import BookmarkRepository from './bookmark-repository';
import IBookmarkRepository from './bookmark-repository.interface';

export default class BookmarkRepositoryFactory extends SequentialIdRepositoryFactory<IBookmarkRepository> {

    public createRepository(): IBookmarkRepository {

        const model = models.Bookmark;
        const documentGenerator = this.createDocumentGenerator(model);

        return new BookmarkRepository(documentGenerator);
    }
}
