gnp_app.service('httpRequest', ['$http', function($http)
{
    this.send = function(method, api, data)
    {   
        return $http(
            {   "method": method,
                // "url": "http://2-dot-bucket-1362.appspot.com/api/" + api,
                "url": "http://2-dot-bucket-1362.appspot.com/api/" + api,
                "headers": {'Content-Type': 'application/json'},
                "data": data
            }
        );
    };
}]);

// gnp_app.service('matchDataSvc', ['httpRequest', function(httpRequest){
//     var vm = this;
//     vm.data = [1];
//
//     httpRequest.send('GET','matches')
//         .then(
//             function(res)
//             {
//                 vm.data.append(res.data.data);
//             },
//             function(res)
//             {
//                 alert("fail");
//                 console.log(res);
//             }
//         );
// }]);
//
// gnp_app.service('userDataSvc', ['httpRequest', function(httpRequest){
//     var vm = this;
//     vm.data = [1];
//
//     init();
//
//     function init(){
//         httpRequest.send('POST','users')
//             .then(
//                 function(res)
//                 {
//                     console.log("success");
//                     console.log(res);
//                     alert("선수등록을 완료하셨습니다");
//                     $state.go("login");
//                 }
//                 ,
//                 function(res)
//                 {
//                     alert("fail");
//                     console.log("fail");
//                     console.log(res);
//                 }
//             );
//     }
//
//
//
//     vm.createUser = function(data){
//         //validation
//
//         httpRequest.send('POST','users',data)
//             .then(
//                 function(res)
//                 {
//                     console.log("success");
//                     console.log(res);
//                     alert("선수등록을 완료하셨습니다");
//                     $state.go("login");
//
//                 }
//                 ,
//                 function(res)
//                 {
//                     alert("fail");
//                     console.log("fail");
//                     console.log(res);
//                 }
//             );
//     }
//
//
// }]);
//
//
// app.controller('acontroller', ['httprequest', function(aaaa){
//     aaa.send(
// }]);