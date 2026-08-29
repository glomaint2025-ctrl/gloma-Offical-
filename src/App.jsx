import { Routes, Route } from 'react-router-dom';
import { SeasonProvider } from './SeasonContext.jsx';
import PageTransitionOverlay from './components/PageTransitionOverlay.jsx';
import PageLoader from './components/PageLoader.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Works from './pages/Works.jsx';
import Reviews from './pages/Reviews.jsx';
import Contact from './pages/Contact.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import AdminGate from './admin/AdminGate.jsx';
import AdminLayout from './admin/AdminLayout.jsx';
import Leads from './admin/pages/Leads.jsx';
import WorksAdmin from './admin/pages/WorksAdmin.jsx';
import ReviewsAdmin from './admin/pages/ReviewsAdmin.jsx';
import ServicesAdmin from './admin/pages/ServicesAdmin.jsx';
import './admin/admin.css';



import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      direction: 'vertical',
      smoothTouch: false,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);
    
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  
  return null;
}

function PublicLayout() {
  return (
    <SeasonProvider>
      <SmoothScroll />
      <PageTransitionOverlay>
        <PageLoader />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/works" element={<Works />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <a
          href="https://wa.me/94770654639"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat on WhatsApp"
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#25D366',
            color: '#fff',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
            zIndex: 9999,
            transition: 'transform 0.25s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          <svg viewBox="0 0 24 24" width="34" height="34" fill="currentColor">
            <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.201.3-.773.966-.946 1.167-.174.201-.347.225-.647.075-.3-.15-1.261-.466-2.404-1.488-.888-.795-1.488-1.777-1.663-2.078-.174-.3-.02-.462.131-.611.135-.133.301-.351.451-.527.151-.176.201-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.673-1.62-.922-2.206-.241-.579-.485-.501-.673-.51l-.573-.01c-.201 0-.526.075-.801.401-.275.326-1.052 1.026-1.052 2.502 0 1.477 1.077 2.903 1.227 3.104.15.201 2.115 3.227 5.122 4.526 2.062.894 2.896.969 3.968.814 1.166-.171 3.555-1.452 4.055-2.854.5-1.403.5-2.604.35-2.854-.15-.251-.55-.401-.85-.551z"/>
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.76.456 3.42 1.258 4.881L2 22l5.253-1.371C8.618 21.464 10.268 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
      </PageTransitionOverlay>
    </SeasonProvider>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={(
          <AdminGate>
            <AdminLayout />
          </AdminGate>
        )}
      >
        <Route index element={<Leads />} />
        <Route path="leads" element={<Leads />} />
        <Route path="works" element={<WorksAdmin />} />
        <Route path="reviews" element={<ReviewsAdmin />} />
        <Route path="services" element={<ServicesAdmin />} />
      </Route>
      <Route path="/*" element={<PublicLayout />} />
    </Routes>
  );
}

