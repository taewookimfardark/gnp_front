gnp_app.controller('playerRecordController', ["$scope", "httpRequest", function ($scope, httpRequest) {

    $scope.playerrecord = []
    httpRequest.send('GET','users')
        .then(
            function(res)
            {
                for(var index in res.data)
                {
                    var temp = {"Name" :'',"Backnumber":'',"Games":'',"Points":'',"Rebounds":'',"Assists":''}
                    temp.Name = res.data[index].name;
                    temp.Backnumber = res.data[index].backnumber;
                    temp.Games = res.data[index].records.games;
                    temp.Points = parseFloat(res.data[index].records.points/temp.Games).toFixed(2);
                    temp.Rebounds = parseFloat(res.data[index].records.rebounds/temp.Games).toFixed(2);
                    temp.Assists = parseFloat(res.data[index].records.assists/temp.Games).toFixed(2);
                    
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
