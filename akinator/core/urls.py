from django.conf.urls import patterns, url

urlpatterns = patterns('',
    url('start/', 'core.views.start_game', name='start_game'),
)
