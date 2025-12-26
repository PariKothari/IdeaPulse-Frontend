import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './SwipeDeck.css';

const SwipeDeck = ({ ideas }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const canSwipe = currentIndex < ideas.length;

  const swipe = (direction) => {
    if (direction === 'left') {
      // go back
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    } else if (direction === 'right') {
      // go forward
      setCurrentIndex((prev) => Math.min(prev + 1, ideas.length - 1));
    }
  };

  if (!canSwipe) {
    return (
      <div className="swipe-deck">
        <p className="deck-finished">
          You’ve reached the end of trendy ideas.
        </p>
      </div>
    );
  }

  const idea = ideas[currentIndex];

  return (
    <div className="swipe-deck">
      <motion.div
        className="swipe-card"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.x > 120) swipe('right');
          else if (info.offset.x < -120) swipe('left');
        }}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -30 }}
        whileDrag={{ rotate: 10 }} // tilt while dragging
        transition={{ type: 'spring', stiffness: 300, damping: 25 }} // smooth cinematic motion
      >
        <div className="card-content">
          <h3 className="card-title">{idea.title}</h3>
          <p className="card-desc">{idea.description}</p>
        </div>
      </motion.div>

      <div className="deck-controls">
        <button
          onClick={() => swipe('left')}
          className="deck-btn discard"
          disabled={currentIndex === 0}
        >
          ← Previous
        </button>
        <button
          onClick={() => swipe('right')}
          className="deck-btn save"
          disabled={currentIndex === ideas.length - 1}
        >
          Next →
        </button>
      </div>

      <p className="deck-progress">
        {currentIndex + 1} / {ideas.length}
      </p>
    </div>
  );
};

export default SwipeDeck;