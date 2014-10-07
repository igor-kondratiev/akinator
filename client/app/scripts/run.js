angular.module('app')
    .run(['$httpBackend', function ($httpBackend) {
        var questions = [
            'В этой книге есть лошади?',
            'Эnа книга толстая?',
            'В этой книге есть Илья Муромец?',
            'Это русские народные сказки?'
        ];
        var sessionId = 0;
        $httpBackend.whenGET('/api/start').respond(function (method, url, data) {
            return [
                200,
                {
                    sessionId : sessionId,
                    question : questions[Math.floor(Math.random() * 11)]
                },
                {}
            ];
        });
    }]);