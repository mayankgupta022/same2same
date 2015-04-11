from django.contrib import admin
from game.models import *
# Register your models here.


@admin.register(Game)
class GameAdmin(admin.ModelAdmin):
	list_display = ('name',)
	search_fields = ('name',)

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
	list_display = ('game', 'question_image', 'answer_image1', 'answer_image2', 'answer_image3')
	search_fields = ('game',)


@admin.register(MatchInfo)
class MatchInfoAdmin(admin.ModelAdmin):
	list_display = ('game', 'player1', 'player2', 'status', 'curr_question')
	search_fields = ('game', 'player1', 'player2')
	list_filter = ('status',)


@admin.register(MatchDetails)
class MatchDetailsAdmin(admin.ModelAdmin):
	list_display = ('match', 'question', 'player1_response', 'player2_response', 'updated')
	search_fields = ('match',)