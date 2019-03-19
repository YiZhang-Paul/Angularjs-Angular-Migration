import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uppercaseRomanNumerals' })
export class UppercaseRomanNumeralsPipe implements PipeTransform {

    private getWords(text) {

        return text.match(/\S+/g);
    }

    private isRomanNumeral(word) {

        return /^(x{0,2}v?i{1,3}|x?i?v|x?i?x)$/i.test(word);
    }

    public transform(text = '') {

        if (!text || !text.trim()) {

            return '';
        }

        return this.getWords(text).map(word => {

            return this.isRomanNumeral(word) ? word.toUpperCase() : word;

        }).join(' ');
    }
}
