gnp_app.controller("mainController", ["$scope","recordsService","matchesService","usersService","$rootScope"
    ,"$mdDialog", "$mdMedia",function ($scope,
recordsService, matchesService, usersService, $rootScope, $mdDialog, $mdMedia) {

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

    recordsService.getMyRecord(
        $rootScope.toolbarUserData.id,function(res)
        {
            $scope.myRecordData = recordsService.playerRecordMyRecord[0];
        });

    recordsService.getMatchRecordWithMatch($rootScope.toolbarUserData.id,function()
    {
        $scope.recentMatchRecordData = recordsService.matchRecordWithMatch[0];
    });
    
    recordsService.getMyRecordAverage($rootScope.toolbarUserData.id,function()
    {
        $scope.myAverageRecord = recordsService.playerRecordMyAverageRecord[0];
    });

    matchesService.getRecentMatches(function()
    {
        $scope.recentMatches = matchesService.matchdataRecent[0];
    });

    recordsService.getRecordPage(function()
    {
        $scope.recordLeader = recordsService.recordLeader[0];
    });


}]);


