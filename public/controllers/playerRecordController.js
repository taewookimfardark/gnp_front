gnp_app.controller('playerRecordController', ["$scope", "httpRequest","recordsService","$rootScope", function ($scope, httpRequest,
recordsService,$rootScope) {

    $scope.playerrecord = [];

    $rootScope.$watch(function()
    {
        return recordsService.playerRecordJoinUser[1];
    },
        function(newValue,oldValue)
        {
            console.log(newValue);
            for(var index = 0; index < newValue.length; index ++)
            {
                console.log("dfdf");
                var temp = {"Name" :'',"Backnumber":'',"Games":'',"Points":'',"Rebounds":'',"Assists":''};
                temp.Name = newValue[index]['user'].name;
                temp.Backnumber = newValue[index]['user'].backnumber;
                temp.Games = newValue[index]['record'].games;
                temp.Points = parseFloat(newValue[index]['record'].points/temp.Games).toFixed(2);
                temp.Rebounds = parseFloat(newValue[index]['record'].rebounds/temp.Games).toFixed(2);
                temp.Assists = parseFloat(newValue[index]['record'].assists/temp.Games).toFixed(2);

                $scope.playerrecord.push(temp);
            }
            console.log(oldValue);
        }
    );

}]);
