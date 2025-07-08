from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    timezone = models.CharField(max_length=100, default="UTC")
    reminders_enabled = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

class MoodEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    mood = models.CharField(max_length=10)  # happy, sad, etc.
    mood_score = models.IntegerField()  # 1–10 scale
    tags = models.JSONField(default=list, blank=True)  # ["lonely", "tired"]

    def __str__(self):
        return f"{self.user.username} - {self.date}"

class JournalEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    entry_text = models.TextField(blank=True)

    def __str__(self):
        return f"{self.user.username} - {self.date}"

# Create your models here.
