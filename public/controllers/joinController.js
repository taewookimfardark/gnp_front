gnp_app.controller('joinController', ["$scope","httpRequest","$state", function ($scope, httpRequest, $state) {
    $scope.userData =
    {
        "email": '',
        "password": '',
        "name": '',
        "backnumber": '',
        "records":
        {
            "games" : 0,
            "backnumber" : 0,
            "points" : 0,
            "assists" : 0,
            "rebounds" : 0,
            "blocks" : 0,
            "steals" : 0
        }        
    };
    
    $scope.join = function()
    {
        httpRequest.send('POST','users',$scope.userData)
            .then(
                function(res)
                {
                    console.log("success");
                    console.log(res);
                    alert("선수등록을 완하셨습니다");
                    $state.go("login");

                }
            ,
            function(res)
            {
                alert("fail");
                console.log("fail");
                console.log(res);
            }
            );
    };
}]);