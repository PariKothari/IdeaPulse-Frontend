import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';
import './header.css';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setMenuOpen(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <header className="header">
      <div className="logo" onClick={() => navigate('/')}>IdeaPulse</div>

      <nav className="nav">
        {/* Saved Ideas button */}
        <button
          onClick={() => {
            if (user) {
              navigate('/history');
            } else {
              alert('Please login to view saved ideas.');
            }
          }}
          className="nav-link"
        >
          Saved Ideas
        </button>

        {/* FAQs link */}
        <Link to="/faqs" className="nav-link">FAQs</Link>
        <Link to="/idea-gen" className="nav-link">Idea Generator</Link>
        <Link to="/roadmap-gen" className="nav-link">Roadmap Generator</Link>
        <Link to="/trendy" className="nav-link">Trendy Ideas</Link>

        {/* Auth section */}
        <div className="auth">
          {user ? (
            <div className="avatar-wrapper">
              <img
                src={user.photoURL}
                alt="avatar"
                className="avatar"
                onClick={() => setMenuOpen(!menuOpen)}
              />
              {menuOpen && (
                <div className="dropdown">
                  <button onClick={handleLogout} className="btn-black">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={handleLogin} className="btn-black">
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;