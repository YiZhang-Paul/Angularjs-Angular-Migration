import { NgModule } from '@angular/core';

import { GameModule } from '../game/game.module';
import { SharedModule } from '../../shared/shared.module';

import { ChannelCardComponent } from './channel-card/channel-card.component';
import { FeaturedChannelListComponent } from './featured-channel-list/featured-channel-list.component';
import { GameChannelListComponent } from './game-channel-list/game-channel-list.component';
import { ChannelService } from './channel.service';

@NgModule({
    imports: [
        GameModule,
        SharedModule
    ],
    providers: [ChannelService],
    declarations: [
        ChannelCardComponent,
        FeaturedChannelListComponent,
        GameChannelListComponent
    ],
    entryComponents: [
        FeaturedChannelListComponent,
        GameChannelListComponent
    ]
})
export class ChannelModule { }
