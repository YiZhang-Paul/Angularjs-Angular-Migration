export class FeaturedChannelManagerService {

    constructor(channelHttpService) {
        'ngInject';
        this.service = channelHttpService;
    }

    getFeaturedChannels() {

        return this.service.getChannels().catch(error => {

            console.log(error);

            return [];
        });
    }
}
