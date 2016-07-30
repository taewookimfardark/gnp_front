gnp_app.controller("matchController", ["$scope", "httpRequest","$mdDialog","$mdMedia","$rootScope", function ($scope, httpRequest, $mdDialog, $mdMedia, $rootScope)
{

    // htt request
    httpRequest.send('GET','matches')
        .then(
            function(res)
            {
                console.log(res);
                $scope.matchList = res.data;
                console.log("matchlist");
                console.log($scope.matchList);
            },
            function(res)
            {
                alert("fail");
                console.log(res);
            }
        );
    
    
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
        console.log("getid is on");
        $rootScope.matchId = matchid;
        console.log($rootScope.matchId);
    };
    
    
    


}]);