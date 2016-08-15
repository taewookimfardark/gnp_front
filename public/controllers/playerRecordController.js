gnp_app.controller('playerRecordController', ["$scope", "httpRequest","recordsService", function ($scope, httpRequest,
recordsService) {

    recordsService.getRecordPage(function(res)
    {
        console.log("선수 개인기록");
        console.log(res);
        $scope.playerrecord = recordsService.playerRecordJoinUser[0];
        console.log($scope.playerrecord);
    });

}]);
