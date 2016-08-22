gnp_app.controller('playerRecordController', ["$scope", "httpRequest","recordsService", function ($scope, httpRequest,
recordsService) {

    recordsService.getRecordPage(function(res)
    {
        $scope.playerrecord = recordsService.playerRecordJoinUser[0];
    });

}]);
