import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';

const MISSION_VISION = [
  { title: 'Vision', text: 'To become a global leader in digital empowerment, utilizing AI and advanced web technologies to create a new generation of self-reliant entrepreneurs and globally competitive digital brands.', icon: <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></> },
  { title: 'Mission', text: 'To simplify entrepreneurship through global technology standards, strategic guidance, and operational support—enabling anyone, anywhere in the world, to build a sustainable digital business.', icon: <><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/></> },
];

const CORE_VALUES = [
  { title: 'Creativity', text: 'Gloma International thrives on fresh ideas and imaginative solutions, turning every project into a unique and impactful digital experience.', icon: <><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></> },
  { title: 'Affordability', text: 'We provide high-quality digital solutions at prices that empower businesses of all sizes to grow without compromise.', icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></> },
  { title: 'Trust', text: 'We build lasting relationships with our clients through transparency, reliability, and a commitment to delivering on our promises.', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></> },
  { title: 'Innovation', text: 'We embrace cutting-edge strategies and technologies, constantly evolving to deliver creative solutions that set our clients apart.', icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></> },
  { title: 'Results', text: 'We focus on measurable outcomes, ensuring every project drives real growth and meaningful impact for our clients.', icon: <><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></> }
];

export default function About() {
  usePageTitle('About Us — Gloma International');
  return (
    <>
      <PageHeader
        eyebrow="About Gloma International"
        title="The Team Behind Your Growth"
        description="A full-service digital agency built on strategy, design, and technology."
        crumb="About"
      />

      <section>
        <div className="container">
          <div className="about-split">
            <div>
              <div className="eyebrow">Who We Are</div>
              <SplitReveal>A Digital Business Ecosystem For Modern Entrepreneurs</SplitReveal>
              <p style={{ marginTop: 16 }}>Gloma International Private Limited is a Sri Lanka-based technology and business transformation company. Our objective is to build scalable, future-ready digital enterprises. We have developed a fully integrated Digital Business Ecosystem that enables individuals and Small and Medium Enterprises (SMEs) to launch, operate, and scale online businesses with minimal capital and operational risk.</p>
              <p style={{ marginTop: 14 }}>By combining technology, digital marketing, supply chain integration, and business education, we are committed to acting as a growth catalyst for entrepreneurs navigating the modern digital economy.</p>
              <div className="tag-row">
                <span className="tag-pill">Web Development</span>
                <span className="tag-pill">Mobile Apps</span>
                <span className="tag-pill">IT Solutions</span>
                <span className="tag-pill">Content Creation</span>
                <span className="tag-pill">Social Media</span>
                <span className="tag-pill">Branding</span>
              </div>
            </div>
            <div className="feature-grid">
              {MISSION_VISION.map((c) => (
                <Reveal as="div" className="feature-card" key={c.title}>
                  <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg></div>
                  <h4>{c.title}</h4>
                  <p>{c.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Core Values</div>
            <SplitReveal>What Drives Us Forward</SplitReveal>
          </Reveal>
          <div className="services-grid">
            {CORE_VALUES.map((c) => (
              <Reveal as="div" className="service-card" key={c.title}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-head" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Leadership</div>
            <SplitReveal>Founder & Managing Director</SplitReveal>
          </Reveal>
          <div className="about-split" style={{ alignItems: 'center', marginTop: 40 }}>
            <Reveal>
              <img src="/assets/founder.png" alt="Mr. Chathura Laknath Pallewatte" style={{ width: '100%', borderRadius: '16px', display: 'block', boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }} />
            </Reveal>
            <Reveal>
              <h3 style={{ fontSize: '2rem', marginBottom: '10px' }}>Mr. Chathura Laknath Pallewatte</h3>
              <p style={{ color: 'var(--yellow-deep)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Founder & CEO</p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--text-body)' }}>
                A creative entrepreneur and digital strategist specializing in transforming innovative ideas into high-impact commercial ventures.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Work With Us?"
        text="Let's talk about where you want your brand to go."
        buttonLabel="Start Your Project"
      />
    </>
  );
}
