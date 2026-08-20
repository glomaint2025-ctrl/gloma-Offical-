import { useEffect, useRef } from 'react';
import usePageTitle from '../usePageTitle.js';
import TransitionLink from '../components/TransitionLink.jsx';
import ArrowIcon from '../components/ArrowIcon.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CountUp from '../components/CountUp.jsx';
import CtaBand from '../components/CtaBand.jsx';



export default function Home() {
  usePageTitle('Gloma International — Web, Branding & Digital Solutions');
  const splineStageRef = useRef(null);

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
            {[
              { num: '01', title: 'Web Development', text: 'Fast, responsive, and scalable websites built to convert visitors into customers.', icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></> },
              { num: '02', title: 'Social Media Handling', text: 'Strategy, scheduling, and community management that builds real engagement.', icon: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></> },
              { num: '03', title: 'Content Creation', text: 'Scroll-stopping visuals, video, and copy crafted for every platform.', icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></> },
              { num: '04', title: 'IT Solutions', text: 'Reliable infrastructure, systems integration, and technical support.', icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></> },
              { num: '05', title: 'Advertising & Branding', text: 'Brand identity and campaigns that make a lasting impression.', icon: <><path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6l-4 4H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a4 4 0 0 1 0 7"/><path d="M18.5 5.5a8 8 0 0 1 0 13"/></> },
              { num: '06', title: 'Mobile Apps', text: 'Native and cross-platform apps designed for performance and scale.', icon: <><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></> },
            ].map((s) => (
              <Reveal as="div" className="service-card" key={s.num}>
                <div className="service-num">{s.num}</div>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg></div>
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
            {[
              { cat: 'Web Development', title: 'Magic Mirror Art', link: 'https://magic-mirror-art.lovable.app' },
              { cat: 'Branding', title: 'Pettah Mall', link: 'https://pettahmall.com/' },
              { cat: 'Social Media', title: 'Russel\'s Catering', link: 'https://www.facebook.com/russelscatering' },
            ].map((w) => {
              const Tag = w.link ? "a" : "div";
              return (
                <Reveal 
                  as={Tag} 
                  href={w.link}
                  target={w.link ? "_blank" : undefined}
                  rel={w.link ? "noopener noreferrer" : undefined}
                  className="work-card" 
                  key={w.title}
                  style={{ textDecoration: 'none' }}
                >
                  <div className="work-thumb" style={{ overflow: 'hidden' }}>
                    {w.link && (w.cat === 'Web Development' || w.cat === 'Branding') && (
                      <iframe 
                        src={w.link} 
                        title={w.title}
                        scrolling="no" 
                        style={{ position: 'absolute', top: 0, left: 0, width: '400%', height: '400%', transform: 'scale(0.25)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }} 
                      />
                    )}
                  </div>
                  <div className="work-glyph">↗</div>
                  <div className="work-info"><div className="cat">{w.cat}</div><h3>{w.title}</h3></div>
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
            {[
              { initial: 'A', quote: 'Gloma International transformed our online presence. Their creativity and professionalism are unmatched.', name: 'Amina Yusuf', role: 'Founder, Velosea' },
              { initial: 'D', quote: 'The team delivered a stunning app experience. Communication was smooth from start to finish.', name: 'David Okoro', role: 'CEO, Groceria' },
              { initial: 'S', quote: 'Highly recommended. They understand branding and how it connects with an audience.', name: 'Sara Bello', role: 'Marketing Lead, Zenara' },
            ].map((r) => (
              <Reveal as="div" className="review-card" key={r.name}>
                <div className="stars">★★★★★</div>
                <p className="quote">"{r.quote}"</p>
                <div className="reviewer"><div className="avatar">{r.initial}</div><div><div className="name">{r.name}</div><div className="role">{r.role}</div></div></div>
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
