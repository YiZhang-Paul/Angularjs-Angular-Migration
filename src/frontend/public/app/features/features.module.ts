import { NgModule } from '@angular/core';

import { BookmarkModule } from './bookmark/bookmark.module';
import { ChannelModule } from './channel/channel.module';
import { GameModule } from './game/game.module';

@NgModule({
    imports: [
        BookmarkModule,
        ChannelModule,
        GameModule
    ]
})
export class FeaturesModule { }
