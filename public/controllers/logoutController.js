gnp_app.controller("logoutController", ["$rootScope","localStorage", function ($rootScope,localStorage) {
    $rootScope.loginsuccess = false;
    localStorage.remove('token');
}]);
