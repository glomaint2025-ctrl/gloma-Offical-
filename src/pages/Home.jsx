import { useEffect, useRef, useState } from 'react';
import usePageTitle from '../usePageTitle.js';
import TransitionLink from '../components/TransitionLink.jsx';
import ArrowIcon from '../components/ArrowIcon.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CountUp from '../components/CountUp.jsx';
import CtaBand from '../components/CtaBand.jsx';
import { SERVICE_ICONS } from '../serviceIcons.jsx';

const DEFAULT_HOME_SERVICES = [
  { id: '1', icon_key: 'web', title: 'Web Development', text: 'Fast, responsive, and scalable websites built to convert visitors into customers.' },
  { id: '2', icon_key: 'social', title: 'Social Media Handling', text: 'Strategy, scheduling, and community management that builds real engagement.' },
  { id: '3', icon_key: 'content', title: 'Content Creation', text: 'Scroll-stopping visuals, video, and copy crafted for every platform.' },
  { id: '4', icon_key: 'it', title: 'IT Solutions', text: 'Reliable infrastructure, systems integration, and technical support.' },
  { id: '5', icon_key: 'branding', title: 'Advertising & Branding', text: 'Brand identity and campaigns that make a lasting impression.' },
  { id: '6', icon_key: 'mobile', title: 'Mobile Apps', text: 'Native and cross-platform apps designed for performance and scale.' },
];

const DEFAULT_HOME_WORKS = [
  { id: '1', category: 'web', cat_label: 'Web Development', title: 'Magic Mirror Art', link: 'https://magic-mirror-art.lovable.app' },
  { id: '2', category: 'branding', cat_label: 'Branding', title: 'Pettah Mall', link: 'https://pettahmall.com/' },
  { id: '3', category: 'social', cat_label: 'Social Media', title: "Russel's Catering", link: 'https://www.facebook.com/russelscatering', img: '/assets/russels-catering.png' },
];

const DEFAULT_HOME_REVIEWS = [
  { id: '1', quote: 'Gloma International transformed our online presence. Their creativity and professionalism are unmatched.', name: 'Amina Yusuf', role: 'Founder, Velosea' },
  { id: '2', quote: 'The team delivered a stunning app experience. Communication was smooth from start to finish.', name: 'David Okoro', role: 'CEO, Groceria' },
  { id: '3', quote: 'Highly recommended. They understand branding and how it connects with an audience.', name: 'Sara Bello', role: 'Marketing Lead, Zenara' },
];

export default function Home() {
  usePageTitle('Gloma International — Web, Branding & Digital Solutions');
  const splineStageRef = useRef(null);

  const [services, setServices] = useState(DEFAULT_HOME_SERVICES);
  const [works, setWorks] = useState(DEFAULT_HOME_WORKS);
  const [reviews, setReviews] = useState(DEFAULT_HOME_REVIEWS);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((d) => { if (d.services && d.services.length) setServices(d.services); })
      .catch(() => {});

    fetch('/api/works')
      .then((r) => r.json())
      .then((d) => { if (d.works && d.works.length) setWorks(d.works.slice(0, 3)); })
      .catch(() => {});

    fetch('/api/reviews')
      .then((r) => r.json())
      .then((d) => { if (d.reviews && d.reviews.length) setReviews(d.reviews.slice(0, 3)); })
      .catch(() => {});
  }, []);

  return (
    <>
      <section className="hero">
        <div className="hero-blob b1" />
        <div className="hero-blob b2" />
        <div className="container">
          <div className="hero-grid">
            <div className="hero-copy">
              <div className="eyebrow anim-fade-up">Digital Growth Partner</div>
              <h1 className="anim-fade-up anim-d1">We Build Brands<br />That <span className="accent-dot">Perform.</span></h1>
              <p className="anim-fade-up anim-d2">Gloma International is a full-service digital agency delivering web development, mobile apps, IT solutions, content creation, social media management, and advertising &amp; branding — all under one roof.</p>
              <div className="hero-actions anim-fade-up anim-d3">
                <TransitionLink to="/works" className="btn btn-primary">View Our Work <ArrowIcon /></TransitionLink>
                <TransitionLink to="/contact" className="btn btn-outline">Get In Touch <ArrowIcon /></TransitionLink>
              </div>
            </div>
            <div className="hero-visual anim-fade-up anim-d2">
              <div className="hero-spline" ref={splineStageRef}>
                <spline-viewer hint="none" url="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"></spline-viewer>
                <div className="spline-fallback"><span className="loader" /></div>
              </div>
            </div>
          </div>

          <div className="stats-bar">
            <Reveal as="div" className="stat"><CountUp target={300} suffix="+" /><div className="label">Projects Delivered</div></Reveal>
            <Reveal as="div" className="stat"><CountUp target={120} suffix="+" /><div className="label">Happy Clients</div></Reveal>
            <Reveal as="div" className="stat"><CountUp target={6} suffix="+" /><div className="label">Years Experience</div></Reveal>
            <Reveal as="div" className="stat"><CountUp target={15} suffix="+" /><div className="label">Countries Served</div></Reveal>
            <Reveal as="div" className="stat"><CountUp target={40} suffix="+" /><div className="label">Team Experts</div></Reveal>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="about-split">
            <div>
              <div className="eyebrow">About Us</div>
              <SplitReveal>Driving Growth Through Design, Tech &amp; Strategy</SplitReveal>
              <p style={{ marginTop: 16 }}>We're a team of designers, developers, strategists and creators dedicated to building digital experiences that help brands stand out and scale — from first concept to full-scale launch.</p>
              <div className="tag-row">
                <span className="tag-pill">Web Development</span>
                <span className="tag-pill">Mobile Apps</span>
                <span className="tag-pill">Branding</span>
                <span className="tag-pill">IT Solutions</span>
                <span className="tag-pill">Social Media</span>
              </div>
              <TransitionLink to="/about" className="btn btn-dark" style={{ marginTop: 30 }}>More About Us <ArrowIcon /></TransitionLink>
            </div>
            <div className="feature-grid">
              <Reveal as="div" className="feature-card">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></svg></div>
                <h4>Creative Thinking</h4>
                <p>Turning ideas into meaningful digital stories.</p>
              </Reveal>
              <Reveal as="div" className="feature-card">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg></div>
                <h4>Attention to Detail</h4>
                <p>Pixel-perfect execution with real purpose.</p>
              </Reveal>
              <Reveal as="div" className="feature-card">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></div>
                <h4>On-Time Delivery</h4>
                <p>We respect deadlines without cutting corners.</p>
              </Reveal>
              <Reveal as="div" className="feature-card">
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg></div>
                <h4>Client Focused</h4>
                <p>Your growth is at the center of everything we do.</p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>What We Do</div>
            <SplitReveal>Services Built To Help You Scale</SplitReveal>
          </Reveal>
          <div className="services-grid">
            {services.map((s, idx) => (
              <Reveal as="div" className="service-card" key={s.id || s.title || idx}>
                <div className="service-num">{String(idx + 1).padStart(2, '0')}</div>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{SERVICE_ICONS[s.icon_key] || SERVICE_ICONS.web}</svg></div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <TransitionLink to="/services" className="link-arrow">Explore →</TransitionLink>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Featured Work</div>
            <SplitReveal>Selected Projects</SplitReveal>
          </Reveal>
          <div className="works-grid">
            {works.map((w, idx) => {
              const Tag = w.link ? "a" : "div";
              const catLabel = w.cat_label || w.cat || 'Web Development';
              return (
                <Reveal 
                  as={Tag} 
                  href={w.link}
                  target={w.link ? "_blank" : undefined}
                  rel={w.link ? "noopener noreferrer" : undefined}
                  className="work-card" 
                  key={w.id || w.title || idx}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="work-thumb" style={{ overflow: 'hidden' }}>
                    {w.link && (w.category === 'web' || w.category === 'branding' || catLabel.includes('Web') || catLabel.includes('Brand')) ? (
                      <iframe 
                        src={w.link} 
                        title={w.title}
                        scrolling="no" 
                        style={{ position: 'absolute', top: 0, left: 0, width: '400%', height: '400%', transform: 'scale(0.25)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }} 
                      />
                    ) : w.img ? (
                      <img 
                        src={w.img} 
                        alt={w.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
                      />
                    ) : null}
                  </div>
                  <div className="work-glyph">↗</div>
                  <div className="work-info"><div className="cat">{catLabel}</div><h3>{w.title}</h3></div>
                </Reveal>
              );
            })}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <TransitionLink to="/works" className="btn btn-outline">View All Projects <ArrowIcon /></TransitionLink>
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Process</div>
            <SplitReveal>How We Work</SplitReveal>
          </Reveal>
          <div className="process-grid process-3-col">
            {[
              { id: '01', title: 'Strategize & Subscribe', text: 'Choose the right service package tailored to your specific business goals.', icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></> },
              { id: '02', title: 'Expert Execution', text: 'Our specialists build and polish your project with meticulous attention to detail.', icon: <><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></> },
              { id: '03', title: 'Refine & Scale', text: 'We make revisions simple and focus on scaling your results for maximum ROI.', icon: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></> },
            ].map((s) => (
              <Reveal as="div" className="process-step" key={s.id}>
                <div className="process-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg>
                </div>
                <h4>{s.title}</h4>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Testimonials</div>
            <SplitReveal>What Clients Say</SplitReveal>
          </Reveal>
          <div className="reviews-grid">
            {reviews.map((r, idx) => (
              <Reveal as="div" className="review-card" key={r.id || r.name || idx}>
                <div className="stars">★★★★★</div>
                <p className="quote">"{r.quote}"</p>
                <div className="reviewer"><div className="avatar">{(r.name || 'C')[0]}</div><div><div className="name">{r.name}</div><div className="role">{r.role}</div></div></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's Build Something Amazing Together"
        text="Have a project in mind? Let's create something impactful."
        buttonLabel="Start Your Project"
      />
    </>
  );
}
