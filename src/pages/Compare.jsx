import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import './compare.css';

const Compare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ideas = location.state?.ideas || [];

  const [ideaA, ideaB] = ideas;

  if (ideas.length !== 2) {
    return (
      <div className="compare-container text-center">
        <p className="text-gray-600">Please select two ideas to compare.</p>
        <button
          onClick={() => navigate('/history')}
          className="back-button mt-4"
        >
          Back to Vault
        </button>
      </div>
    );
  }

  //  Extract scores from feedback text (simple regex for numbers out of 10)
  const extractScores = (feedback) => {
    const matches = feedback.match(/\b(\d{1,2})\/10\b/g) || [];
    const numbers = matches.map(m => parseInt(m.replace('/10', ''), 10));
    if (numbers.length === 0) return 0;
    const avg = numbers.reduce((a, b) => a + b, 0) / numbers.length;
    return Math.round(avg * 10) / 10; // one decimal place
  };

  const scoreA = extractScores(ideaA.feedback);
  const scoreB = extractScores(ideaB.feedback);

  const winner =
    scoreA > scoreB
      ? ` ${ideaA.title} wins overall (${scoreA}/10 vs ${scoreB}/10)`
      : scoreB > scoreA
      ? ` ${ideaB.title} wins overall (${scoreB}/10 vs ${scoreA}/10)`
      : ` Both ideas are equally strong (${scoreA}/10 each)`;

  return (
    <div className="compare-container">
      <h1 className="compare-heading">Idea Comparison</h1>

      <div className="compare-grid">
        {[ideaA, ideaB].map((idea, index) => {
          const score = index === 0 ? scoreA : scoreB;
          return (
            <div key={index} className="compare-card">
              <h2 className="compare-title">{idea.title}</h2>


              <div className="compare-feedback">
                <ReactMarkdown>{idea.feedback}</ReactMarkdown>
              </div>

              <p className="compare-score">Overall Score: {score}/10</p>
            </div>
          );
        })}
      </div>

      <h3 className="compare-result">{winner}</h3>

      <button onClick={() => navigate('/history')} className="back-button">
        Back to Vault
      </button>
    </div>
  );
};

export default Compare;