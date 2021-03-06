gnp_app.service('usersService', ['httpRequest','$state', function (httpRequest, $state) {
    var userService = this;
    userService.userdata = [];
    userService.userdataById = [];
    userService.userdataLoginCheck= [];

    userService.getUsers = function(callback)
    {
        httpRequest.send('GET','users')
            .then
            (
                function(res)
                {
                    userService.userdata.push(res.data.data);
                    callback();
                },
                function(res)
                {
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get users");
                        console.log(res);   
                    }
                }

            );   
    };

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
                    if(res.statusText == "Unauthorized") {
                        alert("인증정보가 없습니다");
                        $state.go('logout');
                    }
                    else{
                        alert("fail to get user by id");
                        console.log(res);   
                    }
                }
            );
    };

    userService.logIn = function(data, callback)
    {
        httpRequest.send('POST','login',data)
            .then(
                function(res)
                {
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
