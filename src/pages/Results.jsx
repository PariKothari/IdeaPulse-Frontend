import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import './Results.css';   // external CSS file

const Results = ({ user: userProp }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const user = userProp || location.state?.user;
  const userId = user?.uid;

  const feedback = location.state?.feedback;
  const ideaTitle = location.state?.title || 'Untitled';
  const ideaDescription = location.state?.description || '';
  const ideaMonetization = location.state?.monetization || '';
  const includeMarket = location.state?.includeMarket || false;

  // Detect modes
  const isIdeaGen = ideaTitle === 'Generated Ideas';
  const isRoadmapGen = ideaTitle === 'Generated Roadmap';
  const isCompare = location.state?.compare || false;
  const ideas = location.state?.ideas || [];

  const handleSave = async () => {
    if (!userId || !ideaTitle || !feedback) {
      toast.error('Missing required fields');
      return;
    }

    const payload = {
      userId,
      title: ideaTitle,
      description: ideaDescription,
      monetization: ideaMonetization,
      includeMarket,
      feedback,
      tags: ['ai', 'startup'],
      ideaId: uuidv4(),
      createdAt: new Date(),
    };

    try {
      const API = process.env.REACT_APP_API_URL;
      await axios.post(`${API}/api/history`, payload);
      toast.success('Saved to Vault!');
    } catch (err) {
      console.error(err);
      toast.error('Save failed. Please try again.');
    }
  };

  if (!feedback && !isCompare) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="results-container"
      >
        <p>No feedback found. Please evaluate or generate an idea first.</p>
        <button onClick={() => navigate('/')} className="results-button">
          Back to Form
        </button>
      </motion.div>
    );
  }

  // Parse ideas for IdeaGen
  const parsedIdeas = isIdeaGen
    ? feedback
        .split(/\n(?=\d+\.\s|\*\*Title|\- Idea|\#\#)/)
        .filter(line => line.trim() !== '')
        .filter(line => !line.toLowerCase().includes('here are'))
        .slice(0, 5)
    : [];

  // Extract overall score from feedback
  const extractOverall = (text) => {
    const match = text?.match(/Overall Score.*?(\d{1,2})\/10/i);
    return match ? parseInt(match[1], 10) : null;
  };

  const overallScore = !isIdeaGen && !isRoadmapGen && !isCompare ? extractOverall(feedback) : null;

  // Compare Mode scoring
  let scoreA = 0, scoreB = 0, winner = '';
  if (isCompare && ideas.length === 2) {
    scoreA = extractOverall(ideas[0].feedback);
    scoreB = extractOverall(ideas[1].feedback);
    winner =
      scoreA > scoreB
        ? `🏆 ${ideas[0].title} wins overall (${scoreA}/10 vs ${scoreB}/10)`
        : scoreB > scoreA
        ? `🏆 ${ideas[1].title} wins overall (${scoreB}/10 vs ${scoreA}/10)`
        : `🤝 Both ideas are equally strong (${scoreA}/10 each)`;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="results-container"
    >
      <h2 className="results-heading">
        {isIdeaGen
          ? 'Generated Ideas'
          : isRoadmapGen
          ? 'Generated Roadmap'
          : isCompare
          ? 'Compare Mode'
          : 'Evaluation Results'}
      </h2>

      <div className="results-feedback">
        {isIdeaGen ? (
          parsedIdeas.map((idea, idx) => (
            <div key={idx} className="idea-box">
              <h3 className="idea-title">Idea {idx + 1}</h3>
              <div className="idea-text">
                <ReactMarkdown>{idea}</ReactMarkdown>
              </div>
            </div>
          ))
        ) : isRoadmapGen ? (
          <div className="roadmap-box">
            <h3 className="roadmap-title">Step-by-Step Roadmap</h3>
            <div className="roadmap-text">
              <ReactMarkdown>{feedback}</ReactMarkdown>
            </div>
          </div>
        ) : isCompare && ideas.length === 2 ? (
          <div className="compare-box">
            <div className="compare-grid">
              {ideas.map((idea, idx) => {
                const score = idx === 0 ? scoreA : scoreB;
                return (
                  <div
                    key={idx}
                    className={`compare-card ${score === Math.max(scoreA, scoreB) ? 'winner' : ''}`}
                  >
                    <h3 className="idea-title">{idea.title}</h3>
                    <div className="idea-text">
                      <ReactMarkdown>{idea.feedback}</ReactMarkdown>
                    </div>
                    <p className="compare-score">Overall Score: {score}/10</p>
                    <div className="score-bar-container">
                      <div className="score-bar" style={{ width: `${score * 10}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
            <h3 className="compare-result">{winner}</h3>
          </div>
        ) : (
          <div className="idea-text">
            <ReactMarkdown>{feedback}</ReactMarkdown>
            {overallScore !== null && (
              <p className="overall-score">⭐ Overall Score: {overallScore}/10</p>
            )}
            {overallScore !== null && (
              <div className="score-bar-container">
                <div className="score-bar" style={{ width: `${overallScore * 10}%` }}></div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Save button only for evaluated ideas */}
      {!isIdeaGen && !isRoadmapGen && !isCompare && (
        <button onClick={handleSave} className="results-button save">
          Save to Vault
        </button>
      )}

      <button onClick={() => navigate('/')} className="results-button">
        {isIdeaGen
          ? 'Generate Another Idea'
          : isRoadmapGen
          ? 'Generate Another Roadmap'
          : isCompare
          ? 'Back to Vault'
          : 'Evaluate Another Idea'}
      </button>
    </motion.div>
  );
};

export default Results;