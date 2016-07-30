gnp_app.controller("matchRecordController",["$scope","$rootScope","httpRequest","$state",function($scope,$rootScope,httpRequest,$state)
{

    $scope.userCheckbox=[];
    $scope.matchPlayerRecord=[
        {
            name : '',
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
    
    $scope.matchupdate = {
        finish : true,
        win : $scope.wincheck,
        matchinfo : $scope.matchinfo,
        members : $scope.matchPlayerRecord
    };
    
    

    $scope.addplayer = function(player)
    {
        $scope.matchPlayerRecord.push(player);

        httpRequest.send('GET','users')
            .then(
                function(res)
                {
                    console.log(res);
                    console.log(player.name);
                    console.log(typeof(player.name));
                    console.log(player.backnumber);
                    console.log(typeof(player.backnumber));
                    for(var playerindex in res.data)
                    {
                        if(player.name==res.data[playerindex].name && parseInt(player.backnumber)==res.data[playerindex].backnumber)
                        {
                            console.log(playerindex);
                            $scope.temprecord =
                            {
                                    "games" : res.data[playerindex].records.games + 1,
                                    "points" : res.data[playerindex].records.points + parseInt(player.points),
                                "rebounds": res.data[playerindex].records.rebounds + parseInt(player.rebounds),
                                    "assists" : res.data[playerindex].records.assists + parseInt(player.assists)
                            };

                            $scope.updaterecord =
                            {
                                "records" : $scope.temprecord
                            };

                            console.log($scope.updaterecord);

                            httpRequest.send('PUT','users/'+res.data[playerindex]._id, $scope.updaterecord)
                                .then(
                                    function(res)
                                    {
                                        console.log(res);
                                    },
                                    function(res)
                                    {
                                        console.log(res);
                                        alert("fail player push");
                                    }
                                );
                        }
                    }
                },
                function(res)
                {
                    console.log(res);
                    alert("그냥실패");
                }
            )
    };


    httpRequest.send('GET','users')
        .then(
            function(res)
            {
                console.log(res);
                console.log(res.data);
                $scope.userList = res.data;
                for(var i=0;i<res.data.length;i++)
                {
                    var temp = {number:res.data[i].backnumber,name:res.data[i].name, ischecked:false};
                    console.log(temp);
                    $scope.userCheckbox.push(temp);
                    console.log($scope.userCheckbox);
                }
            },
            function(res)
            {
                alert("fail");
                console.log(res);
            }
        );

    httpRequest.send('GET','matches/'+$rootScope.matchId)
        .then(
            function(res)
            {
                console.log("matchdetail");
                console.log(res);
                $scope.matchDetail = res.data;
            },
            function(res)
            {
                alert("fail");
                console.log(res);
            }
        );

    
    $scope.console = function()
    {
        console.log($scope.matchPlayerRecord);
        console.log($scope.matchupdate);
    };

    $scope.addmatch = function()
    {
        httpRequest.send('PUT','matches/'+$rootScope.matchId,$scope.matchupdate)
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
    };

    

    

}]);
