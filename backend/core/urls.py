from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MoodEntryViewSet, JournalEntryViewSet

router = DefaultRouter()
router.register(r'moods', MoodEntryViewSet)
router.register(r'journals', JournalEntryViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
