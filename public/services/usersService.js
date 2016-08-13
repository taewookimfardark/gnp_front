gnp_app.service('usersService', ['httpRequest', function (httpRequest) {
    var userService = this;
    userService.userdata = ["nothing"];
    userService.userdataById = ["nothing"];
    userService.userdataLoginCheck= ["nothing"];

    httpRequest.send('GET','users')
        .then
        (
        function(res)
        {
            userService.userdata.push(res.data.data);
        },
        function(res)
        {
            alert("fail to get users");
            console.log(res);
        }

    );

    userService.getUserById = function(userId)
    {
        httpRequest.send('GET','users/'+userId)
            .then
            (
                function(res)
                {
                    userService.userdataById.push(res.data.data);
                },
                function(res)
                {
                    alert("fail to get user by id");
                    console.log(res);
                }
            );
    };

    userService.logIn = function(data, callback)
    {
        httpRequest.send('POST','login',data)
            .then(
                function(res)
                {
                    console.log(res);
                    userService.userdataLoginCheck.push(res.data);
                    temp = res.data;
                    callback(temp);
                },
                function(res)
                {
                    alert("fail to login");
                    console.log(res);
                }
            );
    };

    userService.join = function(data,callback)
    {
        httpRequest.send('POST','users',data)
            .then(
                function(res)
                {
                    console.log(res.data.data);
                    callback();
                },
                function(res)
                {
                    alert("fail to join");
                    console.log(res);
                }
            )
    }



}]);
