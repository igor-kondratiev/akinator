angular.module('services')
    .service('ApiClient',['$http', function($http) {
        return {
            startSession: function() {
                return $http.get('/api/start');
            },
            getQuestion: function(sessionId) {

            }
        }
    }]);