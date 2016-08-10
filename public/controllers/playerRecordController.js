gnp_app.controller('playerRecordController', ["$scope", "httpRequest", function ($scope, httpRequest) {

    $scope.playerrecord = [];
    httpRequest.send('GET','playerrecord/page')
        .then(
            function(res)
            {
                console.log(res);
                for(var index in res.data.data)
                {
                    var temp = {"Name" :'',"Backnumber":'',"Games":'',"Points":'',"Rebounds":'',"Assists":''}
                    temp.Name = res.data.data[index][0].name;
                    temp.Backnumber = res.data.data[index][0].backnumber;
                    temp.Games = res.data.data[index][1].games;
                    temp.Points = parseFloat(res.data.data[index][1].points/temp.Games).toFixed(2);
                    temp.Rebounds = parseFloat(res.data.data[index][1].rebounds/temp.Games).toFixed(2);
                    temp.Assists = parseFloat(res.data.data[index][1].assists/temp.Games).toFixed(2);
                    
                    $scope.playerrecord.push(temp);
                    
                }

            },
            function(res)
            {
                alert("fail");
                console.log(res);
            }
        );

}]);
