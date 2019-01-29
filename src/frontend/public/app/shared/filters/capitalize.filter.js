export const capitalizeFilter = () => {

    return (text = '', whitelist = ['the', 'of']) => {

        const toSkip = new Set(whitelist);
        const words = text.toLowerCase().match(/\S+/g);

        if (!words || !words.length) {

            return text;
        }

        for (let i = 0; i < words.length; i++) {

            if (!toSkip.has(words[i]) && /[a-zA-Z]/.test(words[i][0])) {

                words[i] = words[i][0].toUpperCase() + words[i].slice(1);
            }
        }

        return words.join(' ');
    }
}
