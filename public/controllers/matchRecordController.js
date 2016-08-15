gnp_app.controller("matchRecordController",["$scope","$rootScope","httpRequest","$state","matchesService",
    "recordsService","usersService",function($scope,$rootScope,httpRequest,$state,matchesService,recordsService,usersService)
{

    $scope.userCheckbox=[];
    $scope.matchPlayerRecord=[
        {
            name : '',
            backnumber : '',
            points : '',
            assists : '',
            rebounds : ''
        }
    ];

    $scope.matchresult = "win";
    $scope.wincheck = false;

    $scope.check = function()
    {
        if($scope.wincheck == true)
        {$scope.matchresult = "win";}
        else 
        {$scope.matchresult = "lose";}
    };
    
    $scope.matchinfo = "";
    $scope.scoregnp = "";
    $scope.scoreenemy = "";
    
    $scope.matchupdate = {
        finish : true,
        win : $scope.wincheck,
        matchinfo : $scope.matchinfo,
        score_gnp : $scope.scoregnp,
        score_enemy : $scope.scoreenemy
    };

    usersService.getUsers(function()
    {
        $scope.userData = usersService.userdata[0];
        console.log($scope.userData);
        for (var i = 0; i < $scope.userData.length; i++) {
            var temp = {userid : $scope.userData[i].id, matchid : $rootScope.matchId,
                backnumber: $scope.userData[i].backnumber, name: $scope.userData[i].name,
                ischecked: false, point : 0,rebound: 0,assist: 0};
            $scope.userCheckbox.push(temp);
        }
    });
    

    matchesService.getMatchById($rootScope.matchId,function()
    {
        $scope.matchDetail = matchesService.matchdataDetail[0];
        console.log("추가 완료");
    });


    $scope.addmatch = function()
    {
        $scope.matchdata = [$scope.matchupdate, $scope.userCheckbox];
        recordsService.addUserRecord($scope.matchdata);
        recordsService.addMatch($rootScope.matchId,$scope.matchdata,function()
        {
            $state.go('matchschedule');
        });
    };

    $scope.consolecheck = function()
    {
        console.log($scope.userCheckbox);
    }

}]);
