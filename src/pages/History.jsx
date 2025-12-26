import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import IdeaCard from '../components/IdeaCard';
import './History.css';

const History = ({ userId: propUserId }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = location.state?.userId || propUserId;

  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [compareQueue, setCompareQueue] = useState([]);
  const [compareMode, setCompareMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const API = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API}/api/history/${userId}`);
        setIdeas(res.data.ideas || []);
      } catch (err) {
        console.error('Failed to fetch history:', err);
      } finally {
        setLoading(false);
      }
    };
    if (userId) fetchHistory();
  }, [userId]);

  const filteredIdeas = ideas.filter((idea) =>
    (idea.title || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (idea) => {
    if (!window.confirm(`Delete "${idea.title}"?`)) return;
    try {
      const API = process.env.REACT_APP_API_URL;
      await axios.delete(`${API}/api/history/${idea._id}`);
      const newIdeas = ideas.filter((i) => i._id !== idea._id);
      setIdeas(newIdeas);
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const handleView = (idea) => {
    navigate('/results', {
      state: {
        user: { uid: userId },
        feedback: idea.feedback,
        title: idea.title,
        description: idea.description,
        monetization: idea.monetization,
        includeMarket: idea.includeMarket,
      },
    });
  };

  const toggleCompare = (idea) => {
    const alreadySelected = compareQueue.some((i) => i._id === idea._id);
    if (alreadySelected) {
      setCompareQueue(compareQueue.filter((i) => i._id !== idea._id));
    } else {
      if (compareQueue.length === 2)
        return alert('You can only compare two ideas at a time');
      setCompareQueue([...compareQueue, idea]);
    }
  };

  return (
    <div className="history-container">
      {/* Top controls */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Buttons centered */}
      <div className="top-actions">
        <button
          onClick={() => setCompareMode(!compareMode)}
          className="button-primary"
        >
          {compareMode ? 'Cancel Compare' : 'Compare Ideas'}
        </button>
      </div>

      {/* Grid Mode */}
      <div className="grid-mode">
        {!loading && filteredIdeas.length > 0 ? (
          filteredIdeas.map((idea) => (
            <IdeaCard
              key={idea._id}
              idea={idea}
              handleDelete={handleDelete}
              handleView={handleView}
              compareMode={compareMode}
              compareQueue={compareQueue}
              toggleCompare={toggleCompare}
            />
          ))
        ) : (
          <p className="empty-message">
            {loading ? 'Loading...' : 'No ideas found.'}
          </p>
        )}
      </div>

      {/* Compare popup */}
      {compareMode && compareQueue.length === 2 && (
        <>
          <div className="compare-overlay"></div>
          <div className="compare-popup">
            <p>Do you want to compare these two ideas?</p>
            <div className="popup-actions">
              <button
                className="button-primary"
                onClick={() =>
                  navigate('/compare', { state: { ideas: compareQueue } })
                }
              >
                Yes, Compare
              </button>
              <button
                className="button-secondary"
                onClick={() => setCompareQueue([])}
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default History;