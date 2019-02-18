import './view-history-card.scss';

export const ViewHistoryCardComponent = {

    bindings: {

        viewHistory: '<',
        isStaticThumbnail: '<',
        onChannelNavigation: '&',
        onDelete: '&'
    },
    templateUrl: 'app/features/view-history/view-history-card/view-history-card.html'
};
