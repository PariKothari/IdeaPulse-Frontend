import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const IdeaGen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const API = process.env.REACT_APP_API_URL;
      const res = await axios.post(`${API}/api/idea-gen`, { prompt });

      navigate('/results', {
        state: {
          feedback: res.data.output,
          title: 'Generated Ideas',
          description: prompt,
        },
      });
    } catch (err) {
      console.error('Idea generation failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Embedded CSS for responsiveness */}
      <style>{`
        .idea-page {
          background-color: #f7f7f7;
          min-height: 100vh;
          padding: 2rem;
          font-family: Inter, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          box-sizing: border-box;
          overflow-y: auto;
        }

        .idea-heading {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          color: #111;
        }

        .idea-input {
          width: 100%;
          max-width: 600px;
          min-height: 120px;
          border: 1.5px solid #ccc;
          border-radius: 12px;
          padding: 1rem;
          margin-bottom: 1.2rem;
          font-size: 1rem;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .idea-input:focus {
          border-color: #111;
          box-shadow: 0 0 6px rgba(0,0,0,0.15);
          outline: none;
        }

        .idea-button {
          background-color: #111;
          color: #fff;
          padding: 0.8rem 1.6rem;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          transition: background-color 0.2s ease, transform 0.2s ease;
          margin-top: 0.5rem;
        }

        .idea-button:hover {
          background-color: #333;
          transform: scale(1.03);
        }

        .idea-button:active {
          background-color: #000;
          transform: scale(0.98);
        }

        @media (max-width: 768px) {
          .idea-heading { font-size: 1.8rem; }
          .idea-input { max-width: 90%; font-size: 0.95rem; padding: 0.9rem; }
          .idea-button { font-size: 0.95rem; padding: 0.7rem 1.4rem; }
        }

        @media (max-width: 480px) {
          .idea-page { padding: 1.2rem; }
          .idea-heading { font-size: 1.5rem; margin-bottom: 1.5rem; }
          .idea-input { max-width: 100%; font-size: 0.9rem; padding: 0.8rem; }
          .idea-button { width: 100%; font-size: 0.9rem; padding: 0.7rem; }
        }
      `}</style>

      <div className="idea-page">
        <h1 className="idea-heading">💡 Idea Generator</h1>

        <textarea
          className="idea-input"
          placeholder="Describe your domain or interest..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <button
          className="idea-button"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Ideas'}
        </button>
      </div>
    </>
  );
};

export default IdeaGen;