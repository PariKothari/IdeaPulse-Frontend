import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SwipeDeck from './Swipedeck';
import './TrendyIdeas.css';

const TrendyIdeas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const API = process.env.REACT_APP_API_URL;
        const res = await axios.get(`${API}/api/trendy`);
        setIdeas(res.data.ideas || []);
      } catch (err) {
        console.error('Failed to fetch trendy ideas:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdeas();
  }, []);

  return (
    <div className="trendy-container">
      <h1 className="trendy-heading">🔥 Trendy Ideas</h1>
      {loading ? (
        <p className="trendy-loading">Loading trendy ideas...</p>
      ) : ideas.length > 0 ? (
        <SwipeDeck ideas={ideas} />
      ) : (
        <p className="trendy-empty">No trendy ideas found right now.</p>
      )}
    </div>
  );
};

export default TrendyIdeas;