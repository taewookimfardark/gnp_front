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

    $scope.userData = usersService.userdata[1];
    $rootScope.$watch(
        function()
        {
            return usersService.userdata[1];
        },
        function(newValue,oldValue)
        {
            $scope.userData = newValue;
            console.log(newValue);
            for (var i = 0; i < $scope.userData.length; i++) {
                var temp = {userid : newValue[i].id, matchid : $rootScope.matchId,
                    backnumber: newValue[i].backnumber, name: newValue[i].name,
                    ischecked: false, point : 0,rebound: 0,assist: 0};
                console.log(temp);
                $scope.userCheckbox.push(temp);
                console.log($scope.userCheckbox);
            }
            console.log(oldValue);
        }
    );
    
    $scope.matchDetail = matchesService.matchdataDetail[1];
    $rootScope.$watch(function()
    {
        return matchesService.matchdataDetail[1];
    },
    function(newValue,oldValue)
    {
        $scope.matchDetail = newValue;
        console.log(oldValue);
    });



    $scope.addmatch = function()
    {
        $scope.matchdata = [$scope.matchupdate, $scope.userCheckbox];
        recordsService.addUserRecord($scope.matchdata);
        recordsService.addMatch($rootScope.matchId,$scope.matchdata,function()
        {
            $state.go('matchschedule');
        });
        // httpRequest.send('POST','recordusers',$scope.userCheckbox)
        //     .then(
        //         function(res)
        //         {
        //             console.log(res);
        //             console.log("선수기록 추가완료");
        //             httpRequest.send('PUT', 'recordmatches/'+$rootScope.matchId, $scope.matchdata)
        //                 .then(
        //                     function(res)
        //                     {
        //                         console.log("match update!");
        //                         console.log(res);
        //                         alert("추가 완료!");
        //                         $state.go('matchschedule');
        //                     },
        //                     function(res)
        //                     {
        //                         alert("fail");
        //                         console.log(res);
        //                     }
        //
        //                 );
        //         },
        //         function(res)
        //         {
        //             alert("실패");
        //             console.log(res);
        //         }
        //     );
    };

    $scope.consolecheck = function()
    {
        console.log($scope.userCheckbox);
    }

    

    

}]);
