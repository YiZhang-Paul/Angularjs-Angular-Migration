import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThumbnailPlayerService {

    public play(thumbnail) {

        thumbnail.srcElement.play();
    }

    public stop(thumbnail) {

        thumbnail.srcElement.pause();
        thumbnail.srcElement.currentTime = 0;
    }
}
