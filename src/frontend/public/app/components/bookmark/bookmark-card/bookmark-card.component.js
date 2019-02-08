import './bookmark-card.css';

export const BookmarkCardComponent = {

    bindings: {

        bookmark: '<',
        onUnfollow: '&'
    },
    templateUrl: 'app/components/bookmark/bookmark-card/bookmark-card.html'
};
