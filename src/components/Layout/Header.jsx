// src/components/Layout/Header.jsx
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>CordisArchivum</h1>
        </Link>
        <nav className="main-nav">
          <Link to="/" className="nav-link">Dashboard</Link>
          {/* Add more nav links as needed */}
        </nav>
      </div>
    </header>
  );
}

export default Header;
