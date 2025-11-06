import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Layout.css';

export default function Layout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const user = JSON.parse(localStorage.getItem('user'));
    const isLoggedIn = !!localStorage.getItem('token');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsMenuOpen(false);
        navigate('/');
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Check if link is active
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Check if current page is home
    const isHomePage = () => {
        return location.pathname === '/home' || location.pathname === '/';
    };

    return (
        <div className="layout">
            <nav className="navbar">
                <div className="nav-content">
                    <div className="logo">
                        <Link to="/home" className={`nav-link ${isHomePage() ? 'active' : ''}`} onClick={closeMenu}>
                            <img src="/images/appLogo.PNG" alt="appLogo" />
                        </Link>
                    </div>

                    <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
                        <Link to="/home" className={`nav-link ${isActiveLink('/home') || isHomePage() ? 'active' : ''}`} onClick={closeMenu}>Home</Link>
                        <Link to="/favourites" className={`nav-link ${isActiveLink('/favourites') ? 'active' : ''}`} onClick={closeMenu}>Favourites</Link>
                        <Link to="/game" className={`nav-link ${isActiveLink('/game') ? 'active' : ''}`} onClick={closeMenu}>Game</Link>
                        <Link to="/talktalk" className={`nav-link ${isActiveLink('/talktalk') ? 'active' : ''}`} onClick={closeMenu}>TalkTalk</Link>

                        {/* 👤 Show user name if logged in */}
                        {isLoggedIn && user && (
                           <Link to="/profile" className={`nav-link ${isActiveLink('/profile') ? 'active' : ''}`} onClick={closeMenu}>👋 {user.name}</Link>
                        )}

                        {isLoggedIn ? (
                            <Link
                                to="#"
                                className="nav-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleLogout();
                                }}
                            >
                                Logout
                            </Link>
                        ) : (
                            <Link to="/login" className={`nav-link ${isActiveLink('/login') ? 'active' : ''}`} onClick={closeMenu}>Login</Link>
                        )}
                    </div>

                    <button 
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>

                    <div 
                        className={`menu-overlay ${isMenuOpen ? 'active' : ''}`}
                        onClick={closeMenu}
                    ></div>
                </div>
            </nav>
        </div>
    );
}
