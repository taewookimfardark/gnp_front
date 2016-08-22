gnp_app.controller("matchController", ["$scope", "httpRequest","$mdDialog","$mdMedia","$rootScope", "matchesService", "$rootScope",
    function ($scope, httpRequest, $mdDialog, $mdMedia, $rootScope, matchesService)
{
    matchesService.getMatches(function(res)
    {
        $scope.matchList = matchesService.matchdata[0];
    });

    
    // dialog setting 
    $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

    $scope.showDetail = function(ev, matchid) {
        $rootScope.matchId = matchid;
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
        $mdDialog.show({
                templateUrl: 'src/match_detail.html',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true,
                controller: "matchDetailController",
                controllerAs: 'dc',
                fullscreen: useFullScreen
            });
        
        $scope.$watch(function() {
            return $mdMedia('xs') || $mdMedia('sm');
        }, function(wantsFullScreen) {
            $scope.customFullscreen = (wantsFullScreen === true);
        });
    };

    $scope.getId = function(ev,matchid)
    {
        $rootScope.matchId = matchid;
    };


}]);