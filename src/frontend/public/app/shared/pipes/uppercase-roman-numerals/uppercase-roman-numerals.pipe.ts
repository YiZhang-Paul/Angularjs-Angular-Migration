import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'uppercaseRomanNumerals' })
export class UppercaseRomanNumeralsPipe implements PipeTransform {

    private getWords(text: string): string[] {

        return text.match(/\S+/g);
    }

    private isRomanNumeral(word: string): boolean {

        return /^(x{0,2}v?i{1,3}|x?i?v|x?i?x)$/i.test(word);
    }

    public transform(text = ''): string {

        if (!text || !text.trim()) {

            return '';
        }

        return this.getWords(text).map(word => {

            return this.isRomanNumeral(word) ? word.toUpperCase() : word;

        }).join(' ');
    }
}
