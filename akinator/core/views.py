from functools import partial
from django.http import JsonResponse
from core.models import DBDataSource
from logic.Akinator import Akinator
from logic.AkinatorDataSource import ANSWERS


sessions_pool = {}

ANSWERS_MAP = {
    0: ANSWERS.YES,
    1: ANSWERS.NO,
    2: ANSWERS.DOES_NOT_MATTER,
    3: ANSWERS.DO_NOT_KNOW,
}


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
    session_id = request.POST['sessionId']
    return sessions_pool[session_id]


def process_response(request):
    akinator = get_game(request)

    answer = ANSWERS_MAP[int(request.POST['answer'])]
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

    akinator = get_game(request)
    top = akinator.get_top_hypothesis(5)

    for entity, score in top:
        content['entities'].append({
            'name': entity.name,
            'score': score,
        })

    return JsonResponse(content)
