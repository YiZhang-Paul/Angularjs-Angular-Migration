import { stub } from 'sinon';

import { BookmarkManagerService } from '../../../core/services/data-managers/bookmark-manager/bookmark-manager.service';

export function stubBookmarkManagerService() {

    const stubbed = {} as BookmarkManagerService;

    stubbed.cacheBookmarks = stub().resolves({});
    stubbed.isFollowed = stub().returns(true);
    stubbed.follow = stub().resolves({});
    stubbed.unfollow = stub().resolves({});

    return stubbed;
}
