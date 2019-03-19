import { NgModule } from '@angular/core';

import { BookmarkModule } from './bookmark/bookmark.module';
import { ChannelModule } from './channel/channel.module';

@NgModule({
    imports: [BookmarkModule, ChannelModule]
})
export class FeaturesModule { }
