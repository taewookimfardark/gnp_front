gnp_app.controller("matchDetailController", ["$scope","$mdDialog","$mdMedia","httpRequest","$rootScope", function ($scope,$mdDialog,$mdMedia,httpRequest,$rootScope) {

        // dialog controller
        $scope.closeDialog = function() {
            $mdDialog.hide();
        };

        // http request
        httpRequest.send('GET','matches/'+$rootScope.matchId)
            .then(
                function(res)
                {
                    console.log(res);
                    $scope.matchDetail = res.data;
                },
                function(res)
                {
                    alert("fail");
                    console.log(res);
                }
            );


        
}]);