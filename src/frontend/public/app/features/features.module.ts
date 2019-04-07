import { NgModule } from '@angular/core';

import { BookmarkModule } from './bookmark/bookmark.module';
import { GameModule } from './game/game.module';
import { ChannelModule } from './channel/channel.module';
import { ViewHistoryModule } from './view-history/view-history.module';

@NgModule({
    imports: [
        BookmarkModule,
        GameModule,
        ChannelModule,
        ViewHistoryModule
    ]
})
export class FeaturesModule { }
