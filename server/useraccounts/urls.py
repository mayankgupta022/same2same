from django.conf.urls import patterns, include, url

urlpatterns = patterns('',
    # Examples:
    url(r'^login/', 'useraccounts.views.userLogin', name='userLogin'),
    url(r'^logout/', 'useraccounts.views.userLogout', name='userLogout'),
    url(r'^signUp/', 'useraccounts.views.userSignUp', name='userSignUp'),
    url(r'^getInfo/', 'useraccounts.views.userGetInfo', name='userGetInfo'),
)
