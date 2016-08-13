gnp_app.service('matchesService', ['httpRequest', function (httpRequest) {
    
    var matchService = this;
    matchService.matchdata = ["nothing"];
    matchService.matchdataDetail = ["nothing"];
    
    httpRequest.send('GET','matches')
        .then(
            function(res)
            {
                matchService.matchdata.push(res.data.data);
                console.log(res.data.data);
            },
            function(res)
            {
                alert("fail to get matches");
                console.log(res);
            }
        );
    
    matchService.getMatchById = function(matchId)
    {
        httpRequest.send('GET','matches'+matchId)
            .then(
                function(res)
                {
                    matchService.matchdataDetail.push(res.data.data);
                    console.log(res.data.data);
                },
                function(res)
                {
                    alert("fail to get matches by id");
                    console.log(res);
                }
            );
        
        return matchService.matchdataDetail;
    };
    
}]);
