import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [searchText, setSearchText] = useState('');

  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">My Blog</h1>
        
        <div className="header-search">
          <input
            type="text"
            className="search-input"
            placeholder="Search posts..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
    </header>
  );
}