import bookmarkService from './bookmark';
import channelService from './channel/channel';
import gameService from './game';
import userService from './user';
import viewHistoryService from './view-history';

export default {

    bookmark: bookmarkService,
    channel: channelService,
    game: gameService,
    user: userService,
    viewHistory: viewHistoryService
};
