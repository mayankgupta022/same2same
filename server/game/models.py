from django.db import models
from django.core.files.storage import FileSystemStorage
# Create your models here.

class Game(models.Model):
	name = models.CharField(max_length = 1000)
	def __unicode__(self):
		return str(self.name)

class Question(models.Model):
	game = models.ForeignKey(Game, on_delete=models.CASCADE)
	question_image = models.ImageField(upload_to = ('questions'),max_length=1000, blank=True)
	answer_image1 = models.ImageField(upload_to = ('questions'),max_length=1000, blank=True)
	answer_image2 = models.ImageField(upload_to = ('questions'),max_length=1000, blank=True)
	answer_image3 = models.ImageField(upload_to = ('questions'),max_length=1000, blank=True)

	def __unicode__(self):
		return str(self.pk)


class MatchInfo(models.Model):
	game = models.ForeignKey(Game, on_delete=models.CASCADE)
	player1 = models.CharField(max_length = 300)
	player2 = models.CharField(max_length = 300)
	status = models.IntegerField(max_length = 1, default = 0)#0 = waiting, 1 = ready, 2 = won, 3 = lost
	curr_question = models.IntegerField(max_length = 1000, default = 0)

	class Meta:
         verbose_name_plural = "Matches Info"

	def __unicode__(self):
		return str(self.player1 + " " + self.player2)


class MatchDetails(models.Model):
	match = models.ForeignKey(MatchInfo, on_delete=models.CASCADE)
	question = models.ForeignKey(Question, on_delete=models.CASCADE)
	player1_response = models.IntegerField(max_length = 1, default = 0)
	player2_response = models.IntegerField(max_length = 1, default = 0)
	updated = models.DateTimeField(auto_now = True)

	class Meta:
         verbose_name_plural = "Matches Details"

	def __unicode__(self):
		return str(self.pk)