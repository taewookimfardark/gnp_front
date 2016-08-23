gnp_app.service('recordsService', ['httpRequest','$state', function (httpRequest, $state) {

    var recordService = this;
    recordService.playerRecordData = [];
    recordService.matchRecordData = [];
    recordService.playerRecordJoinUser = [];
    recordService.playerRecordDataByUserID = [];
    recordService.playerRecordMyRecord = [];
    recordService.playerRecordMyAverageRecord = [];
    recordService.matchRecordWithMatch = [];
    recordService.recordLeader = [{
        'games': undefined, 'points': undefined, 'assists': undefined, 'rebounds': undefined
    }];

    recordService.getPlayerRecord = function(callback)
    {
        httpRequest.send('GET','playerrecords')
            .then(
                function(res)
                {
                    recordService.playerRecordData.push(res.data.data);
                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get player records");
                        console.log(res);   
                    }
                }
            );
    };
    
    recordService.getMatchRecord = function(callback)
    {
        httpRequest.send('GET','matchrecords')
            .then(
                function(res)
                {
                    recordService.matchRecordData.push(res.data.data);
                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get match records");
                        console.log(res);   
                    }
                }
            );
    };
    
    recordService.getRecordPage = function(callback)
    {
        httpRequest.send('GET','recordpage')
            .then(
                function(res)
                {
                    var newValue = res.data.data;
                    var pageData = [];
                    for(var index = 0; index < newValue.length; index ++) {
                        var temp = {
                            "Name": '',
                            "Backnumber": '',
                            "Games": '',
                            "Points": '',
                            "Rebounds": '',
                            "Assists": ''
                        };
                        temp.Name = newValue[index]['user'].name;
                        temp.Backnumber = newValue[index]['user'].backnumber;
                        temp.Games = newValue[index]['record'].games;
                        temp.Points = parseFloat(newValue[index]['record'].points / temp.Games).toFixed(2);
                        temp.Rebounds = parseFloat(newValue[index]['record'].rebounds / temp.Games).toFixed(2);
                        temp.Assists = parseFloat(newValue[index]['record'].assists / temp.Games).toFixed(2);
                        pageData.push(temp);
                    };
                    recordService.playerRecordJoinUser.push(pageData);

                    recordService.recordLeader[0].games = pageData[0];
                    recordService.recordLeader[0].points = pageData[0];
                    recordService.recordLeader[0].assists = pageData[0];
                    recordService.recordLeader[0].rebounds = pageData[0];

                    for(var i = 1; i<pageData.length;i++)
                    {
                        if(pageData[i].Points > recordService.recordLeader[0].points.Points)
                        {
                            recordService.recordLeader[0].points = pageData[i];
                        }
                        if(pageData[i].Assists > recordService.recordLeader[0].assists.Assists)
                        {
                            recordService.recordLeader[0].assists = pageData[i];
                        }
                        if(pageData[i].Rebounds > recordService.recordLeader[0].rebounds.Rebounds)
                        {
                            recordService.recordLeader[0].rebounds = pageData[i];
                        }
                        if(pageData[i].Games > recordService.recordLeader[0].games.Games)
                        {
                            recordService.recordLeader[0].games = pageData[i];
                        }
                    }

                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get player join user");
                        console.log(res);   
                    }
                }
            );   
    };
    
    recordService.getMyRecord = function(userId,callback)
    {
        httpRequest.send('GET','playerrecords/'+userId)
            .then(
                function(res)
                {
                    recordService.playerRecordMyRecord.push(res.data.data);
                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get my record");
                        console.log(res);   
                    }
                }
            )
        
    };

    recordService.getMyRecordAverage = function(userId,callback)
    {
        httpRequest.send('GET','playerrecords/'+userId)
            .then(
                function(res)
                {
                    var temp = {
                        "Games": '',
                        "Points": '',
                        "Rebounds": '',
                        "Assists": ''
                    };
                    temp.Games = res.data.data.games;
                    temp.Points = parseFloat(res.data.data.points / temp.Games).toFixed(2);
                    temp.Rebounds = parseFloat(res.data.data.rebounds / temp.Games).toFixed(2);
                    temp.Assists = parseFloat(res.data.data.assists / temp.Games).toFixed(2);
                    recordService.playerRecordMyAverageRecord.push(temp);
                    callback();
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get my record");
                        console.log(res);   
                    }
                }
            )

    }
    

    recordService.getRecordByUserId = function(userId, callback)
    {
        httpRequest.send('GET','matchrecords/user/'+userId)
            .then(
                function(res)
                {
                    recordService.playerRecordDataByUserID.push(res.data.data);
                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get match record by user id");
                        console.log(res);   
                    }
                }
            )
    };
    
    recordService.addUserRecord = function(data) {

        httpRequest.send('POST','playerrecords',data[1])
            .then(
                function(res)
                {
                    console.log(res);
                },
                function(res)
                {
                    alert("실패");
                    console.log(res);
                }
            );
        
    };
    
    recordService.addMatch = function(matchId,data,callback)
    {
        httpRequest.send('PUT', 'recordmatches/'+matchId,data)
            .then(
                function(res)
                {
                    console.log(res);
                    alert("추가 완료!");
                    callback();
                },
                function(res)
                {
                    alert("fail");
                    console.log(res);
                }
            );
    };
    
    recordService.getMatchRecordWithMatch = function(userId,callback){
        httpRequest.send('GET','mainpage/'+userId)
            .then(
                function(res){
                    var tempdata = [];
                    for(var i=0;i<res.data.data.length;i++)
                    {
                        if(i==3) break;
                        tempdata.push(res.data.data[i]);
                    }
                    recordService.matchRecordWithMatch.push(tempdata);
                    callback();
                },
                function(res){
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get match record with match");
                        console.log(res);   
                    }
                }       
            );
    };

}]);
