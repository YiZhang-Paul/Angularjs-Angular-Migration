import './view-history-card.scss';

export const ViewHistoryCardComponent = {

    bindings: {

        viewHistory: '<',
        isStaticThumbnail: '<',
        onChannelNavigation: '&',
        onDelete: '&'
    },
    templateUrl: 'app/components/view-history/view-history-card/view-history-card.html'
};
