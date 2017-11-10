from django.conf.urls import url
from django.contrib import admin
from views import *

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', index),
    url(r'^notes/list/$', notes_list),
    url(r'^save/note/$', save_note),
    url(r'^delete/note/$', delete_note),
]
