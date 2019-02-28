import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({ name: 'shortViewCount' })
export class ShortViewCountPipe extends DecimalPipe implements PipeTransform {

    public transform(viewCount) {

        if (viewCount < 1000) {

            return viewCount;
        }

        return `${super.transform(viewCount / 1000, '1.0-1')}k`;
    }
}
