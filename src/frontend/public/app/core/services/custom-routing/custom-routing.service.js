export class CustomRoutingService {

    constructor(

        $q,
        $state,
        gameHttpService,
        channelHttpService,
        genericUtilitiesService

    ) {
        'ngInject';
        this.$q = $q;
        this.$state = $state;
        this.gameHttp = gameHttpService;
        this.channelHttp = channelHttpService;
        this.genericUtilities = genericUtilitiesService;
    }

    toChannelsView(id) {

        const gamePromise = this.gameHttp.getGame(id);
        const channelsPromise = this.channelHttp.getChannelsByGameId(id);

        this.$q.all([gamePromise, channelsPromise]).then(responses => {

            const [game, channels] = responses;
            const name = this.genericUtilities.joinText(game.name);

            this.$state.go('index.channels', { name, channels });
        })
        .catch(error => console.log(error));
    }
}
