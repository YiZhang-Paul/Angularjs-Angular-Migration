export default $stateProvider => {

    const bookmarks = {

        url: '/bookmarks',
        templateUrl: './app/components/bookmark/bookmark.html'
    };

    $stateProvider.state('bookmarks', bookmarks);
}
