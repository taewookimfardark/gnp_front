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
        httpRequest.send('POST','login',$scope.userData)
            .then(
                function(res)
                {
                    if(res.data.data==null)
                    {
                        alert(res.data.userMessage)
                    }
                    else
                    {
                        $state.go('main');
                        console.log(res.data.data);
                    }
                    // if($scope.logincheck)
                    // {
                    //     $state.go('main');
                    // }
                    // else
                    // {
                    //     alert("fail");
                    // }

                },
                function(res)
                {   
                    console.log(res);
                    // alert("fail");
                }

            );
    };

}]);

