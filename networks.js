angular.module('networks', [])
    .directive('overlay', function (trackingService, $rootScope) {
        'use strict';
        return {
            scope: true,
            restrict: 'A',
            link: function ($scope) {
                var pageUrl = encodeURIComponent(window.location.href);

                $scope.isVisible = false;
                $scope.toggle = function () {
                    $scope.isVisible = !$scope.isVisible;
                };

                $rootScope.$on('earlyBird', function (name, args) {
                    $scope.earlyBird = (args !== 'true') ? false : true;
                });

                $scope.setSocialActivity = function (type) {
                    var url = '',
                        w = 600,
                        h = 600,
                        windowSize = 'width=' + w + ', height=' + h,
                        left = (screen.width / 2) - (600 / 2),
                        top = (screen.height / 2) - (600 / 2),
                        imgPath = document.querySelector('meta[property="og:image"]').getAttribute('content'),
                        desc = document.querySelector('meta[property="og:description"]').getAttribute('content');

                    trackingService.shareSocial({
                        channel: type,
                        url: pageUrl
                    });

                    if (type === 'twitter') {
                        url = 'https://twitter.com/share';
                    } else if (type === 'google') {
                        url = 'https://plus.google.com/share?url=' + pageUrl;
                    } else if (type === 'facebook') {
                        url = 'http://www.facebook.com/sharer.php?u=' + pageUrl + '&p[images][0]=' + imgPath + '&media=' + imgPath + '&description=' + desc;
                    }

                    if (window.innerWidth <= 768) {
                        windowSize = 'width=' + window.outerWidth + 'height=' + window.outerHeight;
                    }

                    if (type !== 'mail') {
                        window.open(url, '', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, ' + windowSize + ', top=' + top + ', left=' + left);
                    }

                    return false;
                };

                $scope.shareURL = pageUrl;
            }
        };
    });
