import { useRef, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import usePageTitle from '../usePageTitle.js';

const MARQUEE_TEXT = {
  a: 'DIGITAL MARKETING • BRANDING • WEB DEVELOPMENT • CREATIVE STRATEGY • UI/UX • SOCIAL MEDIA • CONTENT CREATION • ADVERTISING • DESIGN • GROWTH • INNOVATION • PERFORMANCE • TECHNOLOGY • STRATEGY • ',
  b: 'BRANDING • CREATIVE STRATEGY • SOCIAL MEDIA • DESIGN • TECHNOLOGY • DIGITAL MARKETING • WEB DEVELOPMENT • UI/UX • CONTENT CREATION • ADVERTISING • GROWTH • INNOVATION • PERFORMANCE • STRATEGY • ',
  c: 'WEB DEVELOPMENT • UI/UX • GROWTH • DIGITAL MARKETING • ADVERTISING • BRANDING • INNOVATION • CONTENT CREATION • STRATEGY • CREATIVE STRATEGY • DESIGN • SOCIAL MEDIA • PERFORMANCE • TECHNOLOGY • ',
  d: 'CONTENT CREATION • PERFORMANCE • DESIGN • STRATEGY • UI/UX • GROWTH • WEB DEVELOPMENT • TECHNOLOGY • BRANDING • DIGITAL MARKETING • CREATIVE STRATEGY • ADVERTISING • SOCIAL MEDIA • INNOVATION • ',
  e: 'INNOVATION • ADVERTISING • TECHNOLOGY • CREATIVE STRATEGY • DESIGN • CONTENT CREATION • SOCIAL MEDIA • DIGITAL MARKETING • PERFORMANCE • BRANDING • UI/UX • STRATEGY • GROWTH • WEB DEVELOPMENT • ',
  f: 'STRATEGY • DESIGN • GROWTH • BRANDING • PERFORMANCE • UI/UX • DIGITAL MARKETING • INNOVATION • WEB DEVELOPMENT • CONTENT CREATION • TECHNOLOGY • CREATIVE STRATEGY • SOCIAL MEDIA • ADVERTISING • ',
  g: 'TECHNOLOGY • SOCIAL MEDIA • ADVERTISING • GROWTH • CONTENT CREATION • STRATEGY • DESIGN • UI/UX • INNOVATION • WEB DEVELOPMENT • BRANDING • PERFORMANCE • DIGITAL MARKETING • CREATIVE STRATEGY • ',
};

const MARQUEE_ROWS = [
  { rotate: -2, direction: 'left', duration: 35, text: MARQUEE_TEXT.a, mobileHide: false },
  { rotate: 1.5, direction: 'right', duration: 45, text: MARQUEE_TEXT.b, mobileHide: false },
  { rotate: -1, direction: 'left', duration: 38, text: MARQUEE_TEXT.c, mobileHide: false },
  { rotate: 2, direction: 'right', duration: 50, text: MARQUEE_TEXT.d, mobileHide: true },
  { rotate: -2.5, direction: 'left', duration: 40, text: MARQUEE_TEXT.e, mobileHide: true },
  { rotate: 1, direction: 'right', duration: 42, text: MARQUEE_TEXT.f, mobileHide: true },
  { rotate: -1.5, direction: 'left', duration: 48, text: MARQUEE_TEXT.g, mobileHide: true },
];

function PremiumCta() {
  return (
    <section className="premium-cta">
      <div className="pcta-box">
        <div className="pcta-marquee" aria-hidden="true">
          {MARQUEE_ROWS.map((row, i) => (
            <div
              key={i}
              className={`pcta-row-wrap${row.mobileHide ? ' pcta-row-wrap--mobile-hide' : ''}`}
              style={{ transform: `rotate(${row.rotate}deg)` }}
            >
              <div className={`pcta-row pcta-row-${row.direction}`} style={{ animationDuration: `${row.duration}s` }}>
                <span className="pcta-track">{row.text}</span>
                <span className="pcta-track">{row.text}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="pcta-fade" aria-hidden="true" />
        <div className="pcta-edge-fade pcta-edge-fade--left" aria-hidden="true" />
        <div className="pcta-edge-fade pcta-edge-fade--right" aria-hidden="true" />

        <div className="pcta-content">
          <Reveal className="pcta-logo">
            <img src="/assets/logo-mark.png" alt="Gloma International" />
          </Reveal>
          <Reveal as="h2" className="pcta-headline">Ready to Create Something Remarkable?</Reveal>
          <Reveal as="p" className="pcta-sub">Let's transform your ideas into digital experiences that move your business forward.</Reveal>
          <Reveal as="a" href="#contact-form-section" className="pcta-btn">
            Start a Project <span className="pcta-btn-arrow">→</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const formRef = useRef(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const token = '8992492896:AAFIHJ0-admDKU2JugNrD9_qoD2KMafJgEE';
      const chatId = '8536533661';
      const text = `New Contact Request 📩\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\n\nMessage:\n${data.message}`;

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
        }),
      });
    } catch (err) {
      console.error('Failed to submit contact form:', err);
    }

    setSent(true);
    formRef.current?.reset();
    setTimeout(() => setSent(false), 2500);
  };

  return (
    <Reveal className="form-card">
      <form id="contact-form" ref={formRef} onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="field">
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" placeholder="John Doe" required />
          </div>
          <div className="field">
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" placeholder="john@example.com" required />
          </div>
        </div>
        <div className="form-row">
          <div className="field">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" name="phone" placeholder="+1 234 567 8900" />
          </div>
          <div className="field">
            <label htmlFor="service">Project Type</label>
            <select id="service" name="service">
              <option>Web Development</option>
              <option>Mobile App</option>
              <option>Social Media Handling</option>
              <option>Content Creation</option>
              <option>IT Solutions</option>
              <option>Advertising &amp; Branding</option>
              <option>Other</option>
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" placeholder="Tell us about your project..." required />
        </div>
        <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
          {sent ? 'Message Sent' : 'Send Message'} <span className="btn-arrow">
            <svg viewBox="0 0 66 43">
              <polygon points="39.58,4.46 44.11,0 66,21.5 44.11,43 39.58,38.54 56.94,21.5" />
              <polygon points="19.79,4.46 24.32,0 46.21,21.5 24.32,43 19.79,38.54 37.15,21.5" />
              <polygon points="0,4.46 4.53,0 26.42,21.5 4.53,43 0,38.54 17.36,21.5" />
            </svg>
          </span>
        </button>
      </form>
    </Reveal>
  );
}

const CONTACT_INFO = [
  { title: 'Email Us', text: 'info@glomaint.com', icon: <><path d="M4 4h16v16H4z" opacity="0" /><path d="M22 6 12 13 2 6" /><rect x="2" y="4" width="20" height="16" rx="2" /></> },
  { title: 'Call Us', text: '011 711 0174', icon: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z" /> },
  { title: 'Our Office', text: 'No 15/1/8, Mathagoda Junction, Pannipitiya, Kottawa.', icon: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></> },
  { title: 'Working Hours', text: 'Mon – Fri: 9:00 AM – 6:00 PM', icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
];

export default function Contact() {
  usePageTitle('Contact Us — Gloma International');
  return (
    <>
      <PageHeader
        eyebrow="Get In Touch"
        title="Let's Talk About Your Project"
        description="We'd love to hear your ideas and help you bring them to life."
        crumb="Contact"
        bgVideoSrc="/assets/contact-bg.mp4"
      />
      <section id="contact-form-section">
        <div className="container">
          <div className="contact-grid">
            <div>
              <div className="eyebrow">Contact Info</div>
              <SplitReveal>We're Here to Help</SplitReveal>
              <p style={{ marginTop: 14 }}>Reach out through any channel below, or fill out the form and our team will get back to you within one business day.</p>

              <div style={{ marginTop: 30 }}>
                {CONTACT_INFO.map((c) => (
                  <Reveal as="div" className="contact-info-card" key={c.title}>
                    <div className="icon-box" style={{ marginBottom: 0 }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                    </div>
                    <div><h4>{c.title}</h4><p>{c.text}</p></div>
                  </Reveal>
                ))}
              </div>

              <div className="social-row">
                <a href="https://www.facebook.com/profile.php?id=61552153765925" className="social-btn" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
                <a href="https://www.youtube.com/@glomauniversity" className="social-btn" aria-label="YouTube" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg></a>
                <a href="https://wa.me/94770654639" className="social-btn" aria-label="WhatsApp" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.201.3-.773.966-.946 1.167-.174.201-.347.225-.647.075-.3-.15-1.261-.466-2.404-1.488-.888-.795-1.488-1.777-1.663-2.078-.174-.3-.02-.462.131-.611.135-.133.301-.351.451-.527.151-.176.201-.3.301-.5.101-.2.05-.375-.025-.525-.075-.15-.673-1.62-.922-2.206-.241-.579-.485-.501-.673-.51l-.573-.01c-.201 0-.526.075-.801.401-.275.326-1.052 1.026-1.052 2.502 0 1.477 1.077 2.903 1.227 3.104.15.201 2.115 3.227 5.122 4.526 2.062.894 2.896.969 3.968.814 1.166-.171 3.555-1.452 4.055-2.854.5-1.403.5-2.604.35-2.854-.15-.251-.55-.401-.85-.551z"/><path d="M12 2C6.477 2 2 6.477 2 12c0 1.76.456 3.42 1.258 4.881L2 22l5.253-1.371C8.618 21.464 10.268 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z"/></svg></a>
              </div>
            </div>

            <ContactForm />
          </div>

          <div className="map-frame">
            <iframe
              src="https://www.google.com/maps?q=Mathagoda%20Junction,%20Pannipitiya,%20Kottawa&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gloma International Location"
            />
          </div>
        </div>
      </section>
    </>
  );
}
