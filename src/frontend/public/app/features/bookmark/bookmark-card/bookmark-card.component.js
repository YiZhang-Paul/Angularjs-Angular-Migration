import './bookmark-card.scss';

export const BookmarkCardComponent = {

    bindings: {

        bookmark: '<',
        onUnfollow: '&'
    },
    templateUrl: 'app/features/bookmark/bookmark-card/bookmark-card.html'
};
