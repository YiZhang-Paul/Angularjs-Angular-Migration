import { stub } from 'sinon';

import { BookmarkHttpService } from '../../../core/services/http/bookmark-http/bookmark-http.service';

export function stubBookmarkHttpService() {

    const stubbed = {} as BookmarkHttpService;

    stubbed.getBookmarks = stub().resolves([]);
    stubbed.addBookmark = stub().resolves({});
    stubbed.deleteBookmark = stub().resolves({});

    return stubbed;
}
