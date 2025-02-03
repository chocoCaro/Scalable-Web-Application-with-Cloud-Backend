import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <a href="/" className="logo-link">
          <img src="/logo.jpg" alt="Blog Logo" className="logo" />
        </a>
      </div>
      <div>
        <h1 className="blog-title">Personal Blog Project</h1>
      </div>
      <div>
        <select className="search-filter">
          <option value="">All Topic</option>
          <option value="technology">Technology</option>
          <option value="programming">Programming</option>
          <option value="travel">Travel</option>
          <option value="health">Health</option>
          <option value="sport">Sport</option>
        </select>
      </div>
    </header>
  );
};

export default Header;
