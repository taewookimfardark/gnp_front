gnp_app.controller("mainController", ["$scope","recordsService","matchesService","usersService","$rootScope" ,function ($scope,
recordsService, matchesService, usersService, $rootScope) {

    recordsService.getMyRecord(
        $rootScope.toolbarUserData.id,function(res)
        {
            console.log("내 개인기록");
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
        $scope.playerRecord = recordsService.playerRecordJoinUser[0];
    });
}]);


