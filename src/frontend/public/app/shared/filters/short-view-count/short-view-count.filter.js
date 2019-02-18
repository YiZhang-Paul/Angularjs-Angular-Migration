export const shortViewCountFilter = numberFilter => {
    'ngInject';
    return viewCount => {

        if (viewCount < 1000) {

            return viewCount;
        }

        return `${numberFilter(viewCount / 1000, 1)}k`;
    }
}
