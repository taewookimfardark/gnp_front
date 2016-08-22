gnp_app.controller("matchDetailController", ["$scope","$mdDialog","$mdMedia","httpRequest","$rootScope","matchesService", 
    function ($scope,$mdDialog,$mdMedia,httpRequest,$rootScope,matchesService){

        // dialog controller
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        $scope.matchDetail = matchesService.matchdataDetail[0];
        matchesService.getMatchById($rootScope.matchId,function(res)
        {
            console.log(res);
            console.log("경기 디테일");
        });
        
}]);