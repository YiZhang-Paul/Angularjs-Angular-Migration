import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ThumbnailPlayerService {

    public play(thumbnail: any): void {

        thumbnail.srcElement.play();
    }

    public stop(thumbnail: any): void {

        thumbnail.srcElement.pause();
        thumbnail.srcElement.currentTime = 0;
    }
}
