import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1 className="homepage-title">TechSpec Advisor</h1>
      </header>

      <main className="homepage-main">
        <h2 className="homepage-subtitle">
        Get expert advice. Find the best electronic components. Make your projects come to life.
        </h2>
        <p className="homepage-description">
          Free to use. Easy to try. Just ask and TechSpec Advisor can help with
          component selection, learning, brainstorming, and more.
        </p>

        <div className="homepage-buttons">
          <Link to="/chat" className="homepage-button primary">
            Start Chat
          </Link>
          <Link to="/download" className="homepage-button secondary">
            Download the App
          </Link>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
