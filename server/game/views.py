from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from common.utils import *
from game.models import *
import json
from datetime import datetime, timedelta
from django.utils import timezone
# Create your views here.


@login_required
def newMatch(request):
	info = dict()

	try:
		if request.session.get('match'):
			info["match"] = request.session['match']
			info["status"] = 0
		else:
			availableMatches = MatchInfo.objects.filter(status = 0).exclude(player1 = request.user.username)
			if not availableMatches:
				game = Game.objects.order_by('?')[0]
				availableMatch = MatchInfo.objects.create(
						game = game,
						player1 = request.user.username
					)
				request.session['player'] = 1
			else:
				availableMatch = availableMatches[0]
				availableMatch.player2 = request.user.username
				availableMatch.status = 1
				availableMatch.save()
				request.session['player'] = 2
			info["status"] = 0
			request.session['match'] = availableMatch.pk
			request.session['question'] = 0	
			info["match"] = availableMatch.pk
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")


@login_required
def waiting(request):
	info = dict()

	try:
		match = MatchInfo.objects.filter(pk = request.session['match'])[0]
		if match.status == 1:
			info["msg"] = "READY"
			request.session['response'] = 0
			request.session['next'] = 1
		else:
			info["msg"] = "WAITING"
		info["status"] = 0
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")


@login_required
def getQuestion(request):
	info = dict()

	try:

		match = MatchInfo.objects.filter(pk = request.session['match'])[0]

		if match.status != 2:
			game = match.game
			if request.session['next']:
				next_question = Question.objects.filter(game = game, pk__gt = request.session['question'])
				request.session['next'] = 0
			else:
				next_question = Question.objects.filter(game = game, pk = request.session['question'])
			if next_question:
				request.session['question']=next_question[0].pk
				match.curr_question = next_question[0].pk
				match.save()
				info["question"] = model_to_json(next_question[0])
				info["msg"] = "NEXT"
			else:
				request.session['question']=-1
				match.curr_question = -1
				match.status = 2
				match.save()

		request.session['response'] = 0

		if match.status == 2:
			info["msg"] = "WON"
			del request.session['question']
			del request.session['response']
			del request.session['match']
			del request.session['next']

		info["status"] = 0
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")


@login_required
def response(request):
	info = dict()

	try:
		data = json.loads(request.body)
		answer = data['response']

		match = MatchInfo.objects.filter(pk = request.session['match'])[0]
		responses = MatchDetails.objects.filter(match = match, question = request.session['question'])
		question = Question.objects.filter(game = match.game, pk = request.session['question'])[0]
		info["match"] = match.pk
		info["question"] = question.pk

		if responses:
			response = responses[0]
		else:
			response = MatchDetails.objects.create(
				match = match,
				question = question
				)

		if match.player1 == request.user.username:
			response.player1_response = answer
		else:
			response.player2_response = answer
		response.player = request.session['player']
		response.save()

		request.session['response'] = 1
		info["msg"] = "WAITING"
		info["status"] = 0
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")


@login_required
def validate(request):
	info = dict()

	try:
		if request.session['response']:
			match = MatchInfo.objects.filter(pk = request.session['match'])[0]
			response = MatchDetails.objects.filter(match = match, question = request.session['question'])[0]
			if response.player1_response and response.player2_response:
				if response.player1_response == response.player2_response:
					info["msg"] = "NEXT"
					request.session['next'] = 1
				else:
					info["msg"] = "LOST"
			elif response.updated + timedelta(seconds = 100) < timezone.now():
				info["msg"] = "LEFT"
			else:
				info["msg"] = "WAITING"
		info["status"] = 0
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")

#if one person logs out, other person keeps on waiting
