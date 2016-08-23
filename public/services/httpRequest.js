gnp_app.service('httpRequest', ['$http','localStorage', function($http, localStorage)
{
    this.send = function(method, api, data,token)
    {   
        return $http(
            {   "method": method,
                // "url": "http://2-dot-bucket-1362.appspot.com/api/" + api,
                "url": "http://2-dot-bucket-1362.appspot.com/api/" + api,
                "headers": {'Content-Type': 'application/json','Authorization': localStorage.get('token')},
                "data": data
            }
        );
    };
}]);