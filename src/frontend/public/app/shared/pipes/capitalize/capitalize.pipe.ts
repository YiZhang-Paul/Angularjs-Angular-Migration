import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'capitalize' })
export class CapitalizePipe implements PipeTransform {

    private getWords(text: string): string[] {

        return text.match(/\S+/g);
    }

    private toLowerCase(words: string[]): string[] {

        return words.map(_ => _.toLowerCase());
    }

    private capitalize(word: string): string {

        return `${word[0].toUpperCase()}${word.slice(1)}`;
    }

    public transform(text = '', whitelist = ['the', 'of']): string {

        if (!text || !text.trim()) {

            return '';
        }

        const ignored = new Set(this.toLowerCase(whitelist));

        return this.toLowerCase(this.getWords(text)).map(word => {

            return ignored.has(word) ? word : this.capitalize(word);

        }).join(' ');
    }
}
