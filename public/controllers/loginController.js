gnp_app.controller("loginController", ["$scope","$rootScope","httpRequest","$state", function ($scope,$rootScope,httpRequest, $state) {
    
    $rootScope.loginsuccess = false;

    $scope.logincheck = false;
    $scope.userData =
    {
        "email":'',
        "password":''
    };

    $scope.allusers = [];

    $scope.login = function()
    {
        httpRequest.send('GET','users')
            .then(
                function(res)
                {
                    for (var userinfo in res.data)
                    {
                        if(res.data[userinfo].email == $scope.userData.email && res.data[userinfo].password == $scope.userData.password)
                        {
                            $scope.logincheck = true

                        }
                    }

                    if($scope.logincheck)
                    {
                        $state.go('main');
                    }
                    else
                    {
                        alert("fail");
                    }

                },
                function(res)
                {   
                    console.log(res);
                    alert("fail");
                }

            );
    };

}]);

