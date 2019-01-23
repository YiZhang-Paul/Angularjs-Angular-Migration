angular.module('migration-sample-app')
    .controller('ChannelController', ['$scope', '$transitions', '$stateParams', '$http', '$interval',
        function($scope, $transitions, $stateParams, $http, $interval) {
            $scope.channels = [];
            $scope.game = $stateParams.game;

            $transitions.onStart({}, function(transition) {
                if (transition.from().name == 'channels') {
                    clearInterval(interval);
                }
            });

            if ($stateParams.channels) {
                $scope.channels = $stateParams.channels;
            }

            var refreshChannels = function() {
                $http.get('http://127.0.0.1:4150/api/v1/games/' + $stateParams.gameId + "/channels")
                    .then(function(data) {
                        var length = Math.min($scope.channels.length, data.data.length);
                        for (var i = 0; i < length; i++) {
                            if ($scope.channels[i]['provider_id'] == data.data[i]['provider_id'] && $scope.channels[i]['provider_channel_id'] == data.data[i]['provider_channel_id']) {
                                $scope.channels[i]['streamer_name'] = data.data[i]['streamer_name'];
                                $scope.channels[i]['title'] = data.data[i]['title'];

                                if ($scope.channels[i]['view_count'] != data.data[i]['view_count']) {
                                    $scope.channels[i].updated = true;
                                    $scope.channels[i]['view_count'] = data.data[i]['view_count'];
                                    console.log('hey');
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
        }]);
