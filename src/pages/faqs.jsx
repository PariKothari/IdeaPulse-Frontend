import React from 'react';

const Faqs = () => {
  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>❓ Frequently Asked Questions</h1>

      {/* Each FAQ in a rounded black bordered box */}
      <div style={styles.faqBox}>
        <h3 style={styles.question}>1. What is IdeaPulse?</h3>
        <p style={styles.answer}>
          IdeaPulse is a clarity‑first startup idea evaluator. It helps founders test feasibility,
          monetization, scalability, and market relevance with cinematic reports.
        </p>
      </div>

      <div style={styles.faqBox}>
        <h3 style={styles.question}>2. How does the evaluation work?</h3>
        <p style={styles.answer}>
          You enter your idea in the IdeaForm. Our AI generates a structured report with an overall score
          and detailed feedback on your strengths and weaknesses.
        </p>
      </div>

      <div style={styles.faqBox}>
        <h3 style={styles.question}>3. What is the Vault?</h3>
        <p style={styles.answer}>
          The Vault is your cinematic archive. It stores all your evaluated ideas in rounded cards so you
          can revisit, refine, and compare them anytime.
        </p>
      </div>

      <div style={styles.faqBox}>
        <h3 style={styles.question}>4. Do I need to log in?</h3>
        <p style={styles.answer}>
          Yes, you log in with Google before evaluating. This ensures your reports and Vault entries are
          saved securely to your account.
        </p>
      </div>

      <div style={styles.faqBox}>
        <h3 style={styles.question}>5. Is IdeaPulse free?</h3>
        <p style={styles.answer}>
          Yes, IdeaPulse is free to use while in MVP stage. Premium features may be introduced later,
          but the core evaluation will remain accessible.
        </p>
      </div>

      {/* Spacer at bottom */}
      <div style={styles.spacer}></div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: '#f7f7f7',  
    minHeight: '100vh',
    width: '100%',
    fontFamily: 'Poppins, Inter, sans-serif',
    color: '#111',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '2.2rem',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: '2rem',
  },
  faqBox: {
    border: '2px solid black',    
    borderRadius: '12px',        
    padding: '1.5rem',
    marginBottom: '1.5rem',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  question: {
    fontSize: '1.3rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
  },
  answer: {
    fontSize: '1rem',
    lineHeight: '1.6',
    color: '#333',
  },
  spacer: {
    height: '60px',
  },
};

export default Faqs;