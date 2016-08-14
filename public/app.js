var gnp_app = angular.module('gnp_app',['ui.router','ngMaterial','ui.grid']);

gnp_app.run(['$rootScope','$state',function($rootScope,$state)
{
    $rootScope.$on('$stateChangeStart',function()
    {
        if($state.is('login')==true)
        {
            console.log("되고있어");
            $rootScope.loginsuccess = true;
        }

    });

    $rootScope.$on('$stateChangeSuccess',function()
    {
        if($state.is('join'))
        {
            $rootScope.loginsuccess = false;
        };
    });
}]);

gnp_app.config(function($stateProvider, $urlRouterProvider)
{
    console.log("config on");
    $urlRouterProvider.otherwise("/login");
    
    $stateProvider
        .state('login',{
            url: "/login",
            templateUrl: "src/login.html",
            controller: "loginController"
        })
        .state('join',{
            url: "/join",
            templateUrl: "src/join.html",
            controller: "joinController"
        })
        .state('mypage',{
            url: "/mypage",
            templateUrl: "src/mypage.html",
            controller: "mypageController"
        })
        .state('main',{
            url: "/main",
            templateUrl: "src/main.html",
            controller: "mainController"
        })
        .state('matchschedule',{
            url: "/matchschedule",
            templateUrl: "src/match_schedule.html",
            controller: "matchController"
        })
        .state('matchrecord',{
            url: "/matchrecord",
            templateUrl: "src/match_record.html",
            controller: "matchRecordController"
        })
        .state('playerresult',{
            url: "/playerresult",
            templateUrl: "src/player_result.html",
            controller: "playerRecordController"
        })
        .state('logout',{
            url: "/login",
            templateUrl: "src/login.html",
            controller: "logoutController"
        });
        
    
});