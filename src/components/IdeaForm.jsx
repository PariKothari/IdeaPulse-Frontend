import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import './IdeaForm.css';

const IdeaForm = ({ user, setUser }) => {   
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    monetization: '',
    includeMarket: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    
    if (!user) {
      try {
        const result = await signInWithPopup(auth, provider);
        const loggedInUser = result.user;
        setUser(loggedInUser);   
      } catch (err) {
        setError('Login required to evaluate your idea.');
        setLoading(false);
        return;
      }
    }

    try {
      const API = process.env.REACT_APP_API_URL;
const res = await axios.post(`${API}/api/evaluate`, formData);

      if (!res.data.feedback) {
        setError('No feedback received. Please try again.');
        return;
      }

      navigate('/results', {
        state: {
          user: {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL, 
          },
          feedback: res.data.feedback,
          title: formData.title,
          description: formData.description,
          monetization: formData.monetization,
          includeMarket: formData.includeMarket,
        },
      });
    } catch (err) {
      console.error('Evaluation failed:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="idea-form">
      <input
        type="text"
        name="title"
        placeholder="Startup Title"
        value={formData.title}
        onChange={handleChange}
        className="idea-input"
        required
      />
      <textarea
        name="description"
        placeholder="Describe your idea..."
        value={formData.description}
        onChange={handleChange}
        className="idea-textarea"
        required
      />
      <input
        type="text"
        name="monetization"
        placeholder="Monetization Strategy"
        value={formData.monetization}
        onChange={handleChange}
        className="idea-input"
        required
      />
      <label className="idea-checkbox-label">
        <input
          type="checkbox"
          name="includeMarket"
          checked={formData.includeMarket}
          onChange={handleChange}
          className="idea-checkbox"
        />
        Include Market Relevance
      </label>
      <button type="submit" className="idea-button" disabled={loading}>
        {loading ? 'Evaluating...' : 'Evaluate Idea'}
      </button>

      {error && <p className="idea-error">{error}</p>}
    </form>
  );
};

export default IdeaForm;