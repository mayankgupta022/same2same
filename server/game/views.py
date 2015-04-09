from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from game.models import *
import json
# Create your views here.


@login_required
def newMatch(request):
	info = dict()

	try:
		availableMatch = MatchInfo.objects.filter(status = 0, player1__nt = request.user.username)[0]
		if not availableMatch:
			game = Game.objects.order_by('?')[0]
			availableMatch = MathInfo.objects.create(
					game = game,
					player1 = request.user.username
				)
		else:
			availableMatch.player2 = request.user.username
			availableMatch.status = 1
			availableMatch.save()
		info["status"] = 0
		request.session['match'] = availableMatch.pk
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
			request.session['question'] = getNextQuestion(request.session['match'],request.session['question'])			
			info["msg"] = "READY"
			request.session['response'] = 0
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
		if match.status == 2:
			info["msg"] = "WON"
		else:
			game = match.game
			next_question = Question.objects.filter(game = game, pk__gt = request.session['question']).order_by(pk)
			if next_question:
				request.session['question']=next_question[0].pk
				match.curr_question = next_question[0].pk
				match.save()
				info["question"] = next_question
				info["msg"] = "NEXT"
			else:
				request.session['question']=-1
				match.curr_question = -1
				match.status = 2
				match.save()
				info["msg"] = "WON"
				del request.session['question']
				del request.session['response']
				del request.session['match']
				#destroy session variables except user's credentials

		request.session['response'] = 0
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

		match = MatchInfo.objects.filter(pk = request.session['match'])
		response = MatchDetails.objects.filter(match = match, question = request.session['question'])
		if not response:
			response = MatchDetails.objects.create(
				match = match,
				question = request.session['question']
				)

		if match.player1 == request.user.username:
			response.player1_response = answer
		else:
			response.player2_response = answer
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
			match = MatchInfo.objects.filter(pk = request.session['match'])
			response = MatchDetails.objects.filter(match = match, question = request.session['question'])
			if response.player1_response and response.player2_response:
				if response.player1_response == response.player2_response:
					info["msg"] = "NEXT"
				else:
					info["msg"] = "LOST"
			else:
				info["msg"] = "WAITING"
		info["status"] = 0
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")