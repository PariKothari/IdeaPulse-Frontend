import React, { useState } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider } from '../firebase';

const AuthPanel = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      // No need to call setUser — App.js handles it via onAuthStateChanged
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowDropdown(false);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <div style={{ textAlign: 'right', marginTop: '1rem', marginRight: '1rem' }}>
      {!user ? (
        <button
          onClick={handleLogin}
          style={{
            backgroundColor: '#000',
            color: '#fff',
            padding: '0.8rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          Login with Google
        </button>
      ) : (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <div
            onClick={() => setShowDropdown(!showDropdown)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
              backgroundColor: '#000',
              color: '#fff',
              padding: '0.6rem 1rem',
              borderRadius: '8px',
              fontSize: '0.9rem',
              fontWeight: '500',
            }}
          >
            <img
              src={user.photoURL || user.photo}
              alt="User Avatar"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #fff',
              }}
            />
            <span>{user.displayName || user.name}</span>
          </div>

          {showDropdown && (
            <div
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                marginTop: '0.5rem',
                backgroundColor: '#fff',
                border: '1px solid #ccc',
                borderRadius: '6px',
                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                zIndex: 10,
              }}
            >
              <button
                onClick={handleLogout}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  textAlign: 'left',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                }}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthPanel;