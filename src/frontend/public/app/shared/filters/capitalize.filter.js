export const capitalizeFilter = () => {

    const getWords = text => text.match(/\S+/g);
    const toLowerCase = words => words.map(_ => _.toLowerCase());
    const capitalize = word => `${word[0].toUpperCase()}${word.slice(1)}`;

    return (text = '', whitelist = ['the', 'of']) => {

        if (!text || !text.trim()) {

            return '';
        }

        const words = toLowerCase(getWords(text));
        const ignored = new Set(toLowerCase(whitelist));

        for (let i = 0; i < words.length; i++) {

            if (!ignored.has(words[i])) {

                words[i] = capitalize(words[i]);
            }
        }

        return words.join(' ');
    }
}
