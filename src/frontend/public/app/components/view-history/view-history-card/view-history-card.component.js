import './view-history-card.css';

export const ViewHistoryCardComponent = {

    bindings: {

        viewHistory: '<',
        isStaticThumbnail: '<',
        onChannelNavigation: '&',
        onDelete: '&'
    },
    templateUrl: 'app/components/view-history/view-history-card/view-history-card.html'
};
