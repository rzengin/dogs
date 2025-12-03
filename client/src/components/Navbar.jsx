import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Heart, User, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      const user = localStorage.getItem('currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🐾</span>
          <span className="logo-text">Rintintin</span>
        </Link>

        <button
          className="navbar-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/search" className="navbar-link">Buscar Cuidadores</Link>
          <Link to="/become-sitter" className="navbar-link">Ser Cuidador</Link>
          <Link to="/services" className="navbar-link">Servicios</Link>

          <div className="navbar-actions">
            {isLoggedIn ? (
              <>
                <button className="navbar-icon-btn" aria-label="Favorites">
                  <Heart size={20} />
                </button>
                <div className="user-menu">
                  <span className="user-name">
                    {currentUser?.firstName || 'Usuario'}
                  </span>
                  <button
                    className="navbar-icon-btn"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <LogOut size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <button className="navbar-icon-btn" aria-label="Favorites">
                  <Heart size={20} />
                </button>
                <Link to="/login" className="navbar-icon-btn" aria-label="Profile">
                  <User size={20} />
                </Link>
                <Link to="/signup" className="btn btn-primary navbar-cta">
                  Comenzar
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
