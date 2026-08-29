import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TransitionLink from './TransitionLink.jsx';
import ThemeToggle from './ThemeToggle.jsx';
import ArrowIcon from './ArrowIcon.jsx';
import { useSeason } from '../SeasonContext.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/works', label: 'Works' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/contact', label: 'Contact Us' },
];

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const theme = useSeason();
  const kiteVideoRef = useRef(null);

  useEffect(() => {
    if (theme === 'kites' && kiteVideoRef.current) {
      kiteVideoRef.current.play().catch(() => { });
    }
  }, [theme]);

  const closeNav = () => setNavOpen(false);

  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <TransitionLink to="/" className="logo" onClick={closeNav}>
          <img src="/assets/logo.png" alt="Gloma International" style={{ height: '45px', width: 'auto', display: 'block' }} />
          <video
            ref={kiteVideoRef}
            className={`header-kite-fx${theme === 'kites' ? ' active' : ''}`}
            muted
            loop
            playsInline
            autoPlay
            aria-hidden="true"
          >
            <source src="/assets/kite-header.mp4" type="video/mp4" />
          </video>
        </TransitionLink>
        <nav className={`nav-links${navOpen ? ' open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <TransitionLink
              key={link.to}
              to={link.to}
              className={location.pathname === link.to ? 'active' : ''}
              onClick={closeNav}
            >
              {link.label}
            </TransitionLink>
          ))}
        </nav>
        <div className="nav-right">
          <ThemeToggle />
          <TransitionLink to="/contact" className="btn btn-primary" onClick={closeNav}>
            <span className="btn-label">Let's Talk</span>
            <ArrowIcon />
          </TransitionLink>
          <button className="nav-toggle" aria-label="Toggle menu" onClick={() => setNavOpen((v) => !v)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
