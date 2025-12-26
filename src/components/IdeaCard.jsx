import React from 'react';
import './IdeaCard.css';

const IdeaCard = ({ idea, handleView, handleDelete, compareMode, compareQueue, toggleCompare }) => {
  const { title, createdAt } = idea;   

  const isSelected = compareQueue?.some((i) => i._id === idea._id);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN');
  };

  return (
    <div className="idea-card">
      {compareMode && (
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => toggleCompare(idea)}
          className="compare-checkbox"
        />
      )}

      <h2 className="idea-title">{title}</h2>

      <div className="idea-meta">
        <span className="idea-date">{formatDate(createdAt)}</span>
      </div>

      {/*  Removed tags section */}

      <div className="idea-actions">
        <button onClick={() => handleView(idea)} className="action-button view-button">
          View Full Report
        </button>
        <button onClick={() => handleDelete(idea)} className="action-button delete-button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default IdeaCard;