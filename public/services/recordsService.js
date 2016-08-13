gnp_app.service('recordsService', ['httpRequest', function (httpRequest) {

    var recordService = this;
    recordService.playerRecordData = ["nothing"];
    recordService.matchRecordData = ["nothing"];
    recordService.playerRecordJoinUser = ["nothing"];

    httpRequest.send('GET','playerrecords')
        .then(
            function(res)
            {
                recordService.playerRecordData.push(res.data.data);
            },
            function(res)
            {
                alert("fail to get player records");
                console.log(res);
            }
        );

    httpRequest.send('GET','matchrecords')
        .then(
            function(res)
            {
                recordService.matchRecordData.push(res.data.data);
            },
            function(res)
            {
                alert("fail to get match records");
                console.log(res);
            }
        );

    httpRequest.send('GET','recordpage')
        .then(
            function(res)
            {
                recordService.playerRecordJoinUser.push(res.data.data);
            },
            function(res)
            {
                alert("fail to get player join user");
                console.log(res);
            }
        );
    
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
    
    
            

}]);
