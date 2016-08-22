gnp_app.controller("loginController", ["$scope","$rootScope","httpRequest","$state", "usersService","localStorage",
    function ($scope,$rootScope,httpRequest,$state,usersService,localStorage) {
    
    $rootScope.loginsuccess = false;

    $scope.logincheck = false;
    $scope.loginUserData =
    {
        "email":'',
        "password":''
    };

    $scope.allusers = [];

    $scope.login = function()
    {
        usersService.logIn($scope.loginUserData,function(collbackData)
        {
            if(collbackData.data == null)
            {
                alert(collbackData.userMessage);
            }
            else
            {
                $state.go('main');
                $rootScope.toolbarUserData = collbackData.data;
                localStorage.set('token',collbackData.token);
            }
        });
    };

}]);

