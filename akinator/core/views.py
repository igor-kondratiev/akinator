import json
from django.http import HttpResponse
from core.models import DBDataSource
from logic.Akinator import Akinator


sessions_pool = {}


def start_game(request):
    session = Akinator(DBDataSource())
    sessions_pool[session.game_id] = session

    content = {
        'sessionId': session.game_id,
        'firstQuestion': session.current_question.text,
    }
    return HttpResponse(content=json.dumps(content), content_type='application/json')
