from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url('game/start/', 'core.views.start_game', name='start_game'),
    url('game/next/', 'core.views.process_response', name='process_response'),
)
