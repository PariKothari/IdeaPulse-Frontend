import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from './firebase';

import Compare from './pages/Compare';
import Landing from './pages/Landing';
import Results from './pages/Results';
import History from './pages/History';
import Header from './components/header';
import IdeaGen from './pages/IdeaGen';
import Faqs from './pages/faqs';
import RoadmapGen from './pages/RoadmapGenerator';
import TrendyIdeas from './pages/TrendyIdeas';

function App() {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <Router>
      {/* Header with avatar/login */}
      <Header user={user} setUser={setUser} />

      {/*  Global container instead of Tailwind p-6 */}
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing user={user} />} />
          <Route path="/results" element={<Results user={user} />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/idea-gen" element={<IdeaGen />} />
          <Route path="/roadmap-gen" element={<RoadmapGen />} />
          <Route path="/trendy" element={<TrendyIdeas />} />
          <Route path="/faqs" element={<Faqs />} />

          {/* History route */}
          <Route
            path="/history"
            element={
              user ? (
                <History userId={user.uid} />
              ) : (
                <p className="text-center mt-10 text-gray-600">
                  Please log in to view your saved ideas.
                </p>
              )
            }
          />
        </Routes>
      </div>

      <ToastContainer position="top-left" autoClose={2000} />
    </Router>
  );
}

export default App;