from django.contrib import admin
from .models import UserProfile, MoodEntry, JournalEntry

admin.site.register(UserProfile)
admin.site.register(MoodEntry)
admin.site.register(JournalEntry)

# Register your models here.
