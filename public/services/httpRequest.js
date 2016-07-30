gnp_app.service('httpRequest', ['$http', function($http)
{
    this.send = function(method, api, data)
    {   
        return $http(
            {   "method": method,
                "url": "http://localhost:3000/api/" + api,
                "headers": {'Content-Type': 'application/json'},
                "data": data
            }
        );
    };
}]);
