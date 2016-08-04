gnp_app.service('httpRequest', ['$http', function($http)
{
    this.send = function(method, api, data)
    {   
        return $http(
            {   "method": method,
                "url": "http://bucket-1362.appspot.com/api/" + api,
                "headers": {'Content-Type': 'application/json'},
                "data": data
            }
        );
    };
}]);
