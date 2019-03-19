import { NgModule } from '@angular/core';

import { BookmarkModule } from './bookmark/bookmark.module';
import { ChannelModule } from './channel/channel.module';
import { GameModule } from './game/game.module';
import { ViewHistoryModule } from './view-history/view-history.module';

@NgModule({
    imports: [
        BookmarkModule,
        ChannelModule,
        GameModule,
        ViewHistoryModule
    ]
})
export class FeaturesModule { }
