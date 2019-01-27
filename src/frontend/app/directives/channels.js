angular.module('migration-sample-app')
    .controller('ChannelController', ['$state', '$rootScope', '$scope', '$transitions', 'bookmarkService', 'gameService', '$stateParams', '$http', '$interval',
        function($state, $rootScope, $scope, $transitions, bookmarkService, gameService, $stateParams, $http, $interval) {

            $scope.channels = [];

            if ($stateParams.game) {
                $scope.game = $stateParams.game;
                $scope.channels = $stateParams.channels;
            }
            else {
                gameService.getGameList().then(function(data) {
                    var name = $stateParams.name.replace(/-/g, ' ');
                    for (var i = 0; i < data.length; i++) {
                        if (name == data[i].name) {
                            $scope.game = data[i];
                            break;
                        }
                    }
                    refreshChannels();
                },
                function(err) {
                    console.log(err);
                });
            }


            $transitions.onStart({}, function(transition) {
                if (transition.from().name == 'channels') {
                    clearInterval(interval);
                }
            });

            $scope.isFollowed = function(channel) {
                return bookmarkService.isfollowed(channel);
            }

            $scope.follow = function(channel) {
                bookmarkService.follow(channel).then(function() {
                    $rootScope.$broadcast('bookmarkUpdated');
                },
                function(err) {
                    console.log(err);
                });;
            }

            $scope.unfollow = function(channel) {
                bookmarkService.unfollow(channel).then(function() {
                    $rootScope.$broadcast('bookmarkUpdated');
                },
                function(err) {
                    console.log(err);
                });
            }

            $scope.playThumbnail = function (video) {
                video.srcElement.play();
            }

            $scope.stopThumbnail = function(video) {
                video.srcElement.pause();
                video.srcElement.currentTime = 0;
            }

            var refreshChannels = function() {
                $http.get('http://127.0.0.1:4150/api/v1/games/' + $scope.game.id + "/channels")
                    .then(function(data) {
                        if (!$scope.channels.length) {
                            $scope.channels =data.data;
                            return;
                        }
                        var length = Math.min($scope.channels.length, data.data.length);
                        for (var i = 0; i < length; i++) {
                            if ($scope.channels[i]['provider_id'] == data.data[i]['provider_id'] && $scope.channels[i]['provider_channel_id'] == data.data[i]['provider_channel_id']) {
                                $scope.channels[i]['streamer_name'] = data.data[i]['streamer_name'];
                                $scope.channels[i]['title'] = data.data[i]['title'];

                                if ($scope.channels[i]['view_count'] != data.data[i]['view_count']) {
                                    $scope.channels[i].updated = true;
                                    $scope.channels[i]['view_count'] = data.data[i]['view_count'];

                                    (function(counter) {
                                        var step = 0;
                                        var interval = $interval(function() {
                                            $scope.channels[counter].updated = ++step % 2;

                                            if (step == 6) {
                                                $interval.cancel(interval);
                                            }
                                        }, 150);
                                    }(i));
                                }
                            }
                            else {
                                $scope.channels[i] = data.data[i];
                            }
                        }
                    }).catch(function(err) { console.log(err); });
            }

            var interval = setInterval(function() {
                refreshChannels();
            }, 10000);

            $scope.addHistory = function(channel) {

                const data = {

                    game_id: channel.game_id,
                    provider_id: channel.provider_id,
                    provider_channel_id: channel.provider_channel_id,
                    streamer_name: channel.streamer_name,
                    game_name: channel.provider_game_name,
                    title: channel.title,
                    image: channel.image,
                    thumbnail: channel.thumbnail
                };

                $http.post('http://127.0.0.1:4150/api/v1/user/histories', data, {headers: {
                    'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
                }})
                    .then(function(data) {
                        $rootScope.$broadcast('historyUpdated');
                    }, function(err) {
                        console.log(err);
                    });
            }
        }]);
