import React from 'react';
import IdeaForm from '../components/IdeaForm';

const Landing = ({ user, setUser }) => {
  return (
    <>
      {/*  Embedded CSS for responsiveness */}
      <style>{`
        @media (max-width: 1024px) {
          .hero {
            flex-direction: column;
            align-items: center;
          }
          .leftBox, .rightBox {
            flex: 1 !important;
            width: 100%;
          }
          .title {
            font-size: 2.2rem !important;
          }
          .subtitle {
            font-size: 1rem !important;
          }
        }

        @media (max-width: 768px) {
          .title {
            font-size: 1.8rem !important;
          }
          .formHeading {
            font-size: 1.1rem !important;
          }
          .sectionHeading {
            font-size: 1.6rem !important;
          }
          .stepTitle {
            font-size: 1.2rem !important;
          }
          .stepText {
            font-size: 0.95rem !important;
          }
        }

        @media (max-width: 480px) {
          .page {
            padding: 1rem !important;
          }
          .title {
            font-size: 1.5rem !important;
          }
          .subtitle {
            font-size: 0.9rem !important;
            line-height: 1.5 !important;
          }
          .formHeading {
            font-size: 1rem !important;
          }
          .sectionHeading {
            font-size: 1.4rem !important;
          }
          .stepTitle {
            font-size: 1rem !important;
          }
          .stepText {
            font-size: 0.85rem !important;
          }
        }
      `}</style>

      <div style={styles.page} className="page">
        <div style={styles.hero} className="hero">
          {/* Left side: About box */}
          <div style={{ ...styles.box, ...styles.leftBox }} className="leftBox">
            <h1 style={styles.title} className="title">Validate and Score Your Startup Ideas</h1>
            <p style={styles.subtitle} className="subtitle">
              IdeaPulse helps founders evaluate their startup ideas with clarity and confidence.
              Instead of overwhelming you with crowded dashboards, it gives you a clean workspace
              where your idea is tested against feasibility, monetization, scalability, and market relevance.
              Each evaluation generates a structured report with an overall score, so you instantly know
              where your idea stands. You can save your reports in the Vault, a cinematic archive that makes
              your journey feel premium and expressive. Alongside evaluations, IdeaPulse offers FAQs with
              cinematic transitions to answer common founder questions, and curated blogs to keep you inspired.
              With its clean interface and cinematic polish, IdeaPulse is designed to be lean, cinematic, and
              resume‑ready — a companion for anyone refining their vision or pitching to investors.
              IdeaPulse is not just a validator, it’s a clarity‑driven workspace. It helps you benchmark
              your ideas against real‑world expectations, prune unnecessary complexity, and focus on what truly matters.
              Each saved idea becomes part of your cinematic Vault, where you can revisit, refine, and compare your journey.
              The FAQs section answers the most pressing founder questions with smooth transitions, while the Blogs section
              curates insights from startup journeys, failures, and breakthroughs. This combination of evaluation, storage,
              and inspiration makes IdeaPulse unique. It’s not about giving you endless tools; it’s about giving you clarity.
              With every report, you’ll see your strengths and weaknesses highlighted, guiding you toward sharper decisions.
              IdeaPulse is built for dreamers, builders, and founders who want to move forward with expressive clarity.
              Whether you’re preparing for an investor pitch, refining your own vision, or simply exploring possibilities,
              IdeaPulse provides the cinematic workspace you need. It’s lean, expressive, and designed to impress recruiters,
              investors, and yourself. Every idea deserves clarity — and IdeaPulse delivers it.
            </p>
          </div>

          {/* Right side: IdeaForm box */}
          <div style={{ ...styles.box, ...styles.rightBox }} className="rightBox">
            <h2 style={styles.formHeading} className="formHeading">👉 Is My Idea Any Good? Let’s Find Out!</h2>
            <IdeaForm user={user} setUser={setUser} />
          </div>
        </div>

        {/* How It Works Section */}
        <div style={styles.howItWorks}>
          <h2 style={styles.sectionHeading} className="sectionHeading">✨ How It Works</h2>

          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle} className="stepTitle">Step 1: Enter Your Idea</h3>
            <p style={styles.stepText} className="stepText">Type your startup idea into the IdeaForm. Keep it short, clear, and expressive.</p>
          </div>

          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle} className="stepTitle">Step 2: Get Your Evaluation</h3>
            <p style={styles.stepText} className="stepText">Receive a structured cinematic report instantly with feasibility, monetization, scalability, and market relevance with score.</p>
          </div>

          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle} className="stepTitle">Step 3: Save to Vault</h3>
            <p style={styles.stepText} className="stepText">Swipe and store your idea in the Vault. Revisit and compare your journey anytime.</p>
          </div>

          <div style={styles.stepBox}>
            <h3 style={styles.stepTitle} className="stepTitle">Step 4: Explore Insights</h3>
            <p style={styles.stepText} className="stepText">Browse FAQs, Idea Generator, Roadmap Generator, Trendy Ideas</p>
          </div>
        </div>
      </div>
    </>
  );
};

const styles = {
  page: {
    backgroundColor: '#ffffff',
    minHeight: '100vh',
    width: '100%',
    overflowY: 'scroll',
    fontFamily: 'Poppins, Inter, sans-serif',
    color: '#111',
    padding: '2rem',
    marginBottom: '3rem',
  },
  hero: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '2rem',
    maxWidth: '1400px',
    margin: '0 auto',
  },
  box: {
    border: '2px solid black',
    borderRadius: '12px',
    padding: '2rem',
    backgroundColor: '#fafafa',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    overflow: 'hidden',
  },
  leftBox: { flex: 0.65 },
  rightBox: { flex: 0.35 },
  title: { fontSize: '2.6rem', fontWeight: '700', marginBottom: '1rem' },
  subtitle: { fontSize: '1.1rem', lineHeight: '1.7', color: '#333' },
  formHeading: { fontSize: '1.3rem', fontWeight: '600', marginBottom: '1rem', color: '#222', textAlign: 'center' },
  howItWorks: { marginTop: '4rem', maxWidth: '1000px', marginLeft: 'auto', marginRight: 'auto', marginBottom: '3rem' },
  sectionHeading: { fontSize: '2rem', fontWeight: '700', textAlign: 'center', marginBottom: '2rem' },
  stepBox: { border: '2px solid black', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: '#f9f9f9', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  stepTitle: { fontSize: '1.4rem', fontWeight: '600', marginBottom: '0.5rem' },
  stepText: { fontSize: '1rem', lineHeight: '1.6', color: '#333' },
};

export default Landing;