gnp_app.service('matchesService', ['httpRequest','$state', function (httpRequest,$state) {
    
    var matchService = this;
    matchService.matchdata = [];
    matchService.matchdataDetail = [];
    matchService.matchdataRecent = [];
    
    matchService.getMatches = function(callback)
    {
        httpRequest.send('GET','matches')
            .then(
                function(res)
                {
                    matchService.matchdata.push(res.data.data);
                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get matches");
                        console.log(res);
                    }
                    
                }
            );    
    };

    matchService.getRecentMatches = function(callback)
    {
        httpRequest.send('GET','matches')
            .then(
                function(res)
                {   var tempdata = [];
                    for(var i = 0;i<4;i++)
                    {   
                        if(res.data.data[res.data.data.length-i-1] == undefined) break;
                        tempdata.push(res.data.data[res.data.data.length-i-1]);
                    }
                    matchService.matchdataRecent.push(tempdata);
                    callback();
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get matches");
                        console.log(res);
                    }
                }
            );
    };
    
    
    matchService.getMatchById = function(matchId,callback)
    {
        httpRequest.send('GET','matches/'+matchId)
            .then(
                function(res)
                {
                    matchService.matchdataDetail.push(res.data.data);
                    callback(res);
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get matches by id");
                        console.log(res);
                    }
                }
            );
    };
    
    
}]);
