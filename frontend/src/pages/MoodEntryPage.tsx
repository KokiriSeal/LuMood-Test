import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const emojiOptions = ['😊', '😢', '😡', '😐', '😰'];

const MoodEntryPage = () => {
  const [mood, setMood] = useState('');
  const [moodScore, setMoodScore] = useState(5);
  const [tags, setTags] = useState('');
  const [journal, setJournal] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('access');
    if (!token) {
      alert('Not logged in!');
      navigate('/login');
      return;
    }

    try {
      const date = new Date().toISOString().split('T')[0]; // yyyy-mm-dd

      await API.post(
        'moods/',
        {
          mood,
          mood_score: moodScore,
          tags: tags.split(',').map((t) => t.trim()),
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (journal) {
        await API.post(
          'journals/',
          {
            date,
            entry_text: journal,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      alert('Mood & journal saved!');
    } catch (err) {
      console.error(err);
      alert('Error saving entry.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">How are you feeling today?</h2>

        <div className="mb-4 flex space-x-2">
          {emojiOptions.map((e) => (
            <button
              type="button"
              key={e}
              className={`text-3xl ${mood === e ? 'ring-2 ring-blue-400' : ''}`}
              onClick={() => setMood(e)}
            >
              {e}
            </button>
          ))}
        </div>

        <label className="block mb-1 font-medium">Mood Score: {moodScore}</label>
        <input
          type="range"
          min={1}
          max={10}
          value={moodScore}
          onChange={(e) => setMoodScore(Number(e.target.value))}
          className="w-full mb-4"
        />

        <label className="block mb-1 font-medium">Tags (comma separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. tired, social, rainy"
        />

        <label className="block mb-1 font-medium">Journal Entry (optional)</label>
        <textarea
          rows={5}
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Write something about your day..."
        />

        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Save Entry
        </button>
      </form>
    </div>
  );
};

export default MoodEntryPage;
