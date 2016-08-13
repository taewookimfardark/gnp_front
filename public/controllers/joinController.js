gnp_app.controller('joinController', ["$scope","httpRequest","$state","usersService", function ($scope, httpRequest, $state, usersService) {
    $scope.userData =
    {
        "email": '',
        "password": '',
        "name": '',
        "backnumber": ''
    };
    $scope.join = function()
    {
        usersService.join($scope.userData,function()
        {
            alert("선수등록을 완료하셨습니다");
            $state.go("login");
        });
    };
}]);