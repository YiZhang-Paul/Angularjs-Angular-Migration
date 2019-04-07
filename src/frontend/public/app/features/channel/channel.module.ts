import { NgModule } from '@angular/core';
import { downgradeComponent } from '@angular/upgrade/static';
import * as angular from 'angular';

import { SharedModule } from '../../shared/shared.module';

import { ChannelCardComponent } from './channel-card/channel-card.component';
import { FeaturedChannelListComponent } from './featured-channel-list/featured-channel-list.component';
import { ChannelService } from './channel.service';
import * as ChannelModuleAjs from './channel.module.ajs.js';

@NgModule({
    imports: [SharedModule],
    providers: [ChannelService],
    declarations: [
        ChannelCardComponent,
        FeaturedChannelListComponent
    ],
    entryComponents: [
        ChannelCardComponent,
        FeaturedChannelListComponent
    ]
})
export class ChannelModule { }

angular.module(ChannelModuleAjs.default)
    .directive('channelCard', downgradeComponent({ component: ChannelCardComponent }))
    .directive('featuredChannelList', downgradeComponent({ component: FeaturedChannelListComponent }));
