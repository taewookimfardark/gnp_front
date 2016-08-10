gnp_app.service('httpRequest', ['$http', function($http)
{
    this.send = function(method, api, data)
    {   
        return $http(
            {   "method": method,
                // "url": "http://2-dot-bucket-1362.appspot.com/api/" + api,
                "url": "http://localhost:5000/api/" + api,
                "headers": {'Content-Type': 'application/json'},
                "data": data
            }
        );
    };
}]);
