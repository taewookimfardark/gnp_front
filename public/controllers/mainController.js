gnp_app.controller("mainController", ["$scope","recordsService","matchesService","usersService","$rootScope" ,function ($scope,
recordsService, matchesService, usersService, $rootScope) {
    
    $scope.recentMatchRecord = [];
    
    // $scope.myRecord;
    // $scope.recentMatch;
    // $scope.playerrecord;

    recordsService.getRecordByUserId($rootScope.toolbarUserData.id);
    
    // $rootScope.$watch(
    //     function()
    //     {
    //         return recordsService.playerRecordDataByUserID[1];
    //     },
    //     function(newValue, oldValue)
    //     {
    //         $scope.recentMyMatchRecord = [];
    //         resdata = newValue;
    //         console.log(resdata);
    //         for(var i = resdata.length - 1;i>;i++)
    //         {
    //             $scope.recentMyMatchRecord.push(resdata[i]);
    //         }
    //         console.log(oldValue);
    //     }
    // );
    
    

    
    
}]);


