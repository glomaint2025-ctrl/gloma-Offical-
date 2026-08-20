import { useRef } from 'react';
import TransitionLink from './TransitionLink.jsx';

function NewsletterForm() {
  const formRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    formRef.current?.reset();
  };
  return (
    <form className="footer-newsletter" ref={formRef} onSubmit={handleSubmit}>
      <input type="email" placeholder="Your email" required />
      <button type="submit" aria-label="Subscribe">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </button>
    </form>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <TransitionLink to="/" className="logo">
              <img src="/assets/logo.png" alt="Gloma International" style={{ height: '45px', width: 'auto', display: 'block' }} />
            </TransitionLink>
            <p>A full-service digital agency helping brands grow through web, mobile, IT, content and marketing solutions.</p>
            <div className="social-row">
              <a href="https://www.facebook.com/profile.php?id=61552153765925" className="social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
              <a href="https://www.youtube.com/@glomauniversity" className="social-btn" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg></a>
              <a href="https://wa.me/94770654639" className="social-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.201.3-.773.966-.946 1.167-.174.201-.347.225-.647.075-.3-.15-1.261-.466-2.404-1.488-.888-.795-1.488-1.777-1.663-2.078-.174-.3-.02-.462.131-.611.135-.133.301-.351.451-.527.151-.176.201-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.673-1.62-.922-2.206-.241-.579-.485-.501-.673-.51l-.573-.01c-.201 0-.526.075-.801.401-.275.326-1.052 1.026-1.052 2.502 0 1.477 1.077 2.903 1.227 3.104.15.201 2.115 3.227 5.122 4.526 2.062.894 2.896.969 3.968.814 1.166-.171 3.555-1.452 4.055-2.854.5-1.403.5-2.604.35-2.854-.15-.251-.55-.401-.85-.551z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.76.456 3.42 1.258 4.881L2 22l5.253-1.371C8.618 21.464 10.268 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg></a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><TransitionLink to="/">Home</TransitionLink></li>
              <li><TransitionLink to="/about">About</TransitionLink></li>
              <li><TransitionLink to="/works">Works</TransitionLink></li>
              <li><TransitionLink to="/contact">Contact</TransitionLink></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <ul>
              <li><TransitionLink to="/services">Web Development</TransitionLink></li>
              <li><TransitionLink to="/services">IT Solutions</TransitionLink></li>
              <li><TransitionLink to="/services">Branding</TransitionLink></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Stay Connected</h4>
            <p>Subscribe to our newsletter and never miss an update.</p>
            <NewsletterForm />
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; <span>{new Date().getFullYear()}</span> Gloma International. All rights reserved.</p>
          <div className="footer-bottom-links"><a href="#">Privacy Policy</a><a href="#">Terms &amp; Conditions</a></div>
        </div>
      </div>
    </footer>
  );
}
