from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    url(r'^new/$', 'game.views.newMatch', name='gameNewMatch'),
    url(r'^waiting/$', 'game.views.waiting', name='gameWaiting'),
    url(r'^getQuestion/$', 'game.views.getQuestion', name='gameGetQuestion'),
    url(r'^response/$', 'game.views.response', name='gameResponse'),
    url(r'^validate/$', 'game.views.validate', name='gameValidate'),
    
)
