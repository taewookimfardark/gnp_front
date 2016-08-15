gnp_app.service('recordsService', ['httpRequest', function (httpRequest) {

    var recordService = this;
    recordService.playerRecordData = [];
    recordService.matchRecordData = [];
    recordService.playerRecordJoinUser = [];
    recordService.playerRecordDataByUserID = [];
    recordService.playerRecordMyRecord = [];

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
                    alert("fail to get player records");
                    console.log(res);
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
                    alert("fail to get match records");
                    console.log(res);
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
                    callback(res);
                },
                function(res)
                {
                    alert("fail to get player join user");
                    console.log(res);
                }
            );   
    };
    
    recordService.getMyRecord = function(userId)
    {
        httpRequest.send('GET','playerrecords/'+userId)
            .then(
                function(res)
                {
                    recordService.playerRecordMyRecord.push(res.data.data);
                    console.log(res);
                },
                function(res)
                {
                    alert("fail to get my record");
                    console.log(res);
                }
            )
        
    }

    recordService.getRecordByUserId = function(userId)
    {
        httpRequest.send('GET','matchrecords/user/'+userId)
            .then(
                function(res)
                {
                    recordService.playerRecordDataByUserID.push(res.data.data);
                },
                function(res)
                {
                    alert("fail to get match record by user id");
                    console.log(res);
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
    
    
            

}]);
