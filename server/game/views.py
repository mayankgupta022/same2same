from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
from game.models import *
import json
from common.utils import model_to_json, collection_to_json
# Create your views here.


@login_required
def newMatch(request):
	info = dict()

	try:
		availableMatch = MatchInfo.objects.filter(status = 0, player1 != request.user.username)[0]
		if not availableMatch:
			game = Game.objects.order_by('?')[0]
			availableMatch = MathInfo.objects.create(
					game = game
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
		if match.status == 1
			request.session['question'] = getNextQuestion(request.session['match'],request.session['question'])			
			info["msg"] = "READY"
			request.session['response'] = 0
		else
			info["msg"] = "WAITING"
		info["status"] = 0
		info["calender"] = model_to_json(calender)
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")


@login_required
def getQuestion(request):
	info = dict()

	try:
		# info["question,answers"] =  next question,answers



		# request.session['question'] = pk of next question
		


		info["msg"] = "READY"
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
		if request.method == "POST":
			# submit response here
			# matchSubmitResponse(request.session['match'],request.session['question'],request.user.username,data['response'])
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
		if(request.session['response'])
			# validate response here
			# result = matchValidateResponse(request.session['match'],request.session['question']) # 0 = waiting, 1 = same, -1 = different
			if result == 1
					info["msg"] = "NEXT"
			else if result == -1
				info["msg"] = "LOST"
			else
				info["msg"] = "WAITING"
		info["status"] = 0
	except Exception as e:
		info["status"] = 1
		info["msg"] = e.message + str(type(e))

	return HttpResponse(json.dumps(info), content_type="application/json")