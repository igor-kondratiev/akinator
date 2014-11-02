angular.module('app')
    .run(['$httpBackend', function ($httpBackend) {
        $httpBackend.whenGET(/views\/.*/).passThrough();
        var questions = [
            'Ця книга про коней?',
            'В цій книзі більше 100 сторінок?',
            'Ця книга видавалась на українській мові?',
            'Це українські народні казки?',
            'В цій книзі є інопланетяни?',
            'Ця книга ніколи не видавалась?'
        ];
        var sessionId = '4c97135c6ed14d6bb33714e26bc88ffa';
        $httpBackend.whenGET('/api/game/start').respond({
            sessionId: sessionId,
            firstQuestion: questions[Math.floor(Math.random() * 4)]
        });
        $httpBackend.whenGET('/api/statistics').respond({
            gamesCount: 15,
            winRate: '70%',
            avgLength: 6
        });
        $httpBackend.whenGET('/api/game/stats/').respond({
            "entities": [
                {
                    "score": 0.32142857142857145,
                    "name": "\u0410\u0440\u043d\u043e\u043b\u044c\u0434 \u0428\u0432\u0430\u0440\u0446\u043d\u0435\u0433\u0435\u0440"
                },
                {
                    "score": 0.32142857142857145,
                    "name": "MacDonald's"
                },
                {
                    "score": 0.17857142857142858,
                    "name": "\u0421\u043b\u043e\u043d"
                },
                {
                    "score": 0.16071428571428573,
                    "name": "\u0414\u0435\u0434 \u041c\u043e\u0440\u043e\u0437"
                },
                {
                    "score": 0.017857142857142856,
                    "name": "\u0427\u0435\u0431\u0443\u0440\u0430\u0448\u043a\u0430"
                }
            ]
        });
        $httpBackend.whenPOST('/api/game/next').respond(function (method, url, data, headers) {
            var response;
            if (Math.random() > 0.3) {
                response = {
                    nextQuestion: 'Разве?',
                    result: null
                };
            } else {
                response = {
                    nextQuestion: null,
                    result: {
                        name: 'Букварь',
                        description: 'Сама крута книжка'
                    }
                }
            }
            return [
                200,
                JSON.stringify(response),
                {}
            ];
        });
            $httpBackend.whenPOST('/api/game/end').respond({status: 'ok'});
            //answers { 0 - yes, 1 - no, 2 - maybe, 3 - don't know
//            data = JSON.parse(data);
//            if (data.answer == 0) {
//                return [
//                    200,
//                    JSON.stringify({
//                        isFinish: false,
//                        isReady: true,
//                        result: {
//                            book: 'Буквар',
//                            description: 'Чудова книжка для дітей'
//                        }
//                    }),
//                    {}]
//            } else if (data.answer == 2) {
//
//            } else if (data.answer == 4) {
//                return [
//                    200,
//                    JSON.stringify({
//                        isFinish: true,
//                        isReady: true
//                    }),
//                    {}]
//            } else if (data.answer == 5) {
//                return [
//                    200,
//                    JSON.stringify({
//                        isFinish: true,
//                        isReady: false,
//                        question: questions[Math.floor(Math.random() * 4)]
//                    }),
//                    {}]
//            } else {
//                return [
//                    200,
//                    JSON.stringify({
//                        isFinish: false,
//                        isReady: false,
//                        question: questions[Math.floor(Math.random() * 4)]
//                    }),
//                    {}]
//            }

    }]);