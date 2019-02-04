export class ThumbnailPlayerService {

    play(thumbnail) {

        thumbnail.srcElement.play();
    }

    stop(thumbnail) {

        thumbnail.srcElement.pause();
        thumbnail.srcElement.currentTime = 0;
    }
}
