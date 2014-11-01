from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url('game/start/', 'core.views.start_game', name='start_game'),
    url('game/end/', 'core.views.end_game', name='end_game'),
    url('game/next/', 'core.views.process_response', name='process_response'),
    url('game/stats/', 'core.views.current_stats', name='game_stats'),
    url('statistics/', 'core.views.statistics', name='statistics'),
)
