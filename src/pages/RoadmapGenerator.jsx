// client/src/pages/RoadmapGenerator.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoadmapGenerator.css'; //  external CSS

const RoadmapGen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!title || !description) return;
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/roadmap-gen', {
        title,
        description,
      });
      navigate('/results', {
        state: {
          feedback: res.data.roadmap,
          title: 'Generated Roadmap',
          description,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="roadmap-page">
      <h1 className="roadmap-heading">🛣️ Roadmap Generator</h1>
      <input
        className="roadmap-input"
        placeholder="Startup Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="roadmap-textarea"
        placeholder="Describe your idea..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button
        className="roadmap-button"
        onClick={handleGenerate}
        disabled={loading}
      >
        {loading ? 'Generating...' : 'Generate Roadmap'}
      </button>
    </div>
  );
};

export default RoadmapGen;