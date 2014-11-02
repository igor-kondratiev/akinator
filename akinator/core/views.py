from functools import partial
from django.db.models import Avg
from django.http import HttpResponse
import json
from core.models import DBDataSource, GameResult
from logic.Akinator import Akinator
from logic.AkinatorDataSource import ANSWERS


sessions_pool = {}

ANSWERS_MAP = {
    0: ANSWERS.YES,
    1: ANSWERS.NO,
    2: ANSWERS.DOES_NOT_MATTER,
    3: ANSWERS.DO_NOT_KNOW,
}


class JsonResponse(HttpResponse):
    def __init__(self, content, **kwargs):
        kwargs.setdefault('content_type', 'application/json')
        jContent = json.dumps(content, ensure_ascii=False).encode('utf-16')
        super(JsonResponse, self).__init__(jContent, **kwargs)


def _remove_game(session_id):
    sessions_pool.pop(session_id, None)


def start_game(request):
    session = Akinator(DBDataSource())
    sessions_pool[session.game_id] = session

    session.set_finish_callback(partial(_remove_game, session.game_id))

    content = {
        'sessionId': session.game_id,
        'firstQuestion': session.current_question.text,
    }

    return JsonResponse(content)


def get_game(request):
    """
    Helper function to fetch game based on request data
    """
    session_id = request.REQUEST['sessionId']
    return sessions_pool[session_id]


def process_response(request):
    akinator = get_game(request)

    answer = ANSWERS_MAP[int(request.REQUEST['answer'])]
    entity, question = akinator.process_answer(answer)

    response = {
        'nextQuestion': None,
        'result': None,
    }
    if entity:
        response['result'] = {
            'name': entity.name,
            'description': entity.description,
        }
    else:
        response['nextQuestion'] = question.text

    return JsonResponse(response)


def current_stats(request):
    content = {
        'entities': []
    }

    count = int(request.REQUEST['count'])
    akinator = get_game(request)
    top = akinator.get_top_hypothesis(count)

    for entity, score in top:
        content['entities'].append({
            'name': entity.name,
            'score': score,
        })

    return JsonResponse(content)


def end_game(request):
    akinator = get_game(request)

    status = request.REQUEST['answer']
    if int(status) == 4:
        akinator.hypothesis_accepted()
    else:
        name = request.REQUEST['name']
        description = request.REQUEST['description']

        akinator.hypothesis_declined(name, description)

    return JsonResponse({'status': 'OK'})


def statistics(request):
    games_count = GameResult.objects.count()
    win_rate = GameResult.objects.filter(success=True).count * 100.0 / games_count
    avg_game_length = GameResult.objects.all().aggregate(Avg('game_length'))['game_length__avg']

    content = {
        'gamesCount': games_count,
        'winRate': win_rate,
        'avgLength': avg_game_length,
    }

    return JsonResponse(content)
