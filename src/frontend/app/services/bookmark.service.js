angular.module('migration-sample-app')
    .factory('bookmarkService', ['$http', '$q', '$timeout', function ($http, $q, $timeout) {
        var bookmarks = [];

        var isfollowed = function(data) {
            for(var i = 0; i < bookmarks.length; i++) {
                if(data.channel_id == bookmarks[i].channel_id || (
                    data.provider_id == bookmarks[i].provider_id &&
                    data.provider_channel_id == bookmarks[i].provider_channel_id)) {
                    return true;
                }
            }
            return false;
        }

        function getbookmarkId(data) {
            if(data.hasOwnProperty('channel_id')) {
                for (var i = 0, id = data.channel_id; i < bookmarks.length; i++) {
                    if(id == bookmarks[i].channel_id) {
                        return bookmarks[i].id;
                    }
                }
            }
            else {
                for (var i = 0; i < bookmarks.length; i++) {
                    if(data.provider_id == bookmarks[i].provider_id &&
                        data.provider_channel_id == bookmarks[i].provider_channel_id) {
                        return bookmarks[i].id;
                    }
                }
            }
        }

        var follow = function (channel) {
            var followDeferred = $q.defer();
            $http.post('http://127.0.0.1:4150/api/v1/user/bookmarks', channel, {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function(data) {
                followDeferred.resolve(data.data);
                getBookmarks();
            },
            function(err) {
                followDeferred.reject(err);
            });
            return followDeferred.promise;
        }

        var unfollow = function (data) {
            var followDeferred = $q.defer();
            $http.delete('http://127.0.0.1:4150/api/v1/user/bookmarks/' + getbookmarkId(data), {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function(data) {
                getBookmarks();
                followDeferred.resolve(data.data);
            },
            function(err) {
                followDeferred.reject(err);
            });
            return followDeferred.promise;
        }

        var getBookmarks =function() {
            var getBookmarksDeferred = $q.defer();
            $http.get('http://127.0.0.1:4150/api/v1/user/bookmarks', {headers: {
                'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            }}).then(function(data) {
                bookmarks = data.data;
                getBookmarksDeferred.resolve(data.data);
            },
            function(err) {
                getBookmarksDeferred.reject(err);
            });
            return getBookmarksDeferred.promise;
        }

        getBookmarks();

        return {
            isfollowed: isfollowed,
            follow: follow,
            unfollow: unfollow,
            getBookmarks: getBookmarks
        };
    }]);
