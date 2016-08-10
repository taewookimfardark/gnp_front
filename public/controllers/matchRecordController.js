gnp_app.controller("matchRecordController",["$scope","$rootScope","httpRequest","$state",function($scope,$rootScope,httpRequest,$state)
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

    httpRequest.send('GET','matchrecord/'+$rootScope.matchId)
        .then(
            function(res)
            {
                $scope.userData = res.data.userdata;
                for (var i = 0; i < res.data.userdata.length; i++) {
                    var temp = {userid : res.data.userdata[i].id, matchid : $rootScope.matchId, backnumber: res.data.userdata[i].backnumber, name: res.data.userdata[i].name, ischecked: false, point : 0,rebound: 0,assist: 0};
                    console.log(temp);
                    $scope.userCheckbox.push(temp);
                    console.log($scope.userCheckbox);
                }

                $scope.matchDetail = res.data.matchdata;
            },
            function(res)
            {
                alert("fail");
                console.log(res);
            });



    $scope.addmatch = function()
    {
        $scope.matchdata = [$scope.matchupdate, $scope.userCheckbox];
        httpRequest.send('POST','recordusers',$scope.userCheckbox)
            .then(
                function(res)
                {
                    console.log(res);
                    console.log("선수기록 추가완료");
                    httpRequest.send('PUT', 'recordmatches/'+$rootScope.matchId, $scope.matchdata)
                        .then(
                            function(res)
                            {
                                console.log("match update!");
                                console.log(res);
                                alert("추가 완료!");
                                $state.go('matchschedule');
                            },
                            function(res)
                            {
                                alert("fail");
                                console.log(res);
                            }

                        );
                },
                function(res)
                {
                    alert("실패");
                    console.log(res);
                }
            );
    };

    $scope.consolecheck = function()
    {
        console.log($scope.userCheckbox);
    }

    

    

}]);
