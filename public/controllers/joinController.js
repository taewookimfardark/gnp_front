gnp_app.controller('joinController', ["$scope","httpRequest","$state", function ($scope, httpRequest, $state) {
    $scope.userData =
    {
        "email": '',
        "password": '',
        "name": '',
        "backnumber": ''
    };
    
    $scope.join = function()
    {
        httpRequest.send('POST','users',$scope.userData)
            .then(
                function(res)
                {
                    console.log("success");
                    console.log(res);
                    alert("선수등록을 완료하셨습니다");
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