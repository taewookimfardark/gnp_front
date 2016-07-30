gnp_app.service('localStorage', [function()
{
    this.set = function(key, data){
        window.localStorage.setItem(key, JSON.stringify(data));
    };

    this.get = function (key, defaultValue) {
        defaultValue = defaultValue || null;
        var data = window.localStorage.getItem(key);
        if (data === null) {
            return defaultValue;
        } else {
            return JSON.parse(data);
        }
    };

    this.remove = function (key) {
        window.localStorage.removeItem(key);
    };
}]);
