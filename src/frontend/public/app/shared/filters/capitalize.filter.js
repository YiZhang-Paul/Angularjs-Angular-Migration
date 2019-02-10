export const capitalizeFilter = () => {

    const getWords = text => text.match(/\S+/g);
    const toLowerCase = words => words.map(_ => _.toLowerCase());
    const capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`;

    return (text = '', whitelist = ['the', 'of']) => {

        if (!text || !text.trim()) {

            return '';
        }

        const ignored = new Set(toLowerCase(whitelist));

        return toLowerCase(getWords(text)).map(word => {

            return ignored.has(word) ? word : capitalize(word);

        }).join(' ');
    }
}
