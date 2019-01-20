const xss = require('xss');

export function sanitize(input: string): string {

    const option = {

        whiteList: [],
        stripIgnoreTag: true,
        stripIgnoreTagBody: ['script']
    };

    return xss(input, option).replace(/[{}$]/g, '');
}

export default { sanitize };
