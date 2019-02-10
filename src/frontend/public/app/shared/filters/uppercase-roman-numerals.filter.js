export const uppercaseRomanNumeralsFilter = () => {

    const getWords = text => text.match(/\S+/g);
    const isRomanNumeral = word => /^(x{0,2}v?i{1,3}|x?i?v|x?i?x)$/i.test(word);

    return (text = '') => {

        if (!text || !text.trim()) {

            return '';
        }

        return getWords(text).map(word => {

            return isRomanNumeral(word) ? word.toUpperCase() : word;

        }).join(' ');
    }
}
