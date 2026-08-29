import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';
import { SERVICE_ICONS } from '../serviceIcons.jsx';

const PROCESS = [
  { id: '01', title: 'Strategize & Subscribe', text: 'Choose the right service package tailored to your specific business goals.', icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></> },
  { id: '02', title: 'Expert Execution', text: 'Our specialists build and polish your project with meticulous attention to detail.', icon: <><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></> },
  { id: '03', title: 'Refine & Scale', text: 'We make revisions simple and focus on scaling your results for maximum ROI.', icon: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></> },
];

export default function Services() {
  usePageTitle('Services — Gloma International');
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/services')
      .then((r) => r.json())
      .then((data) => setServices(data.services || []))
      .catch((err) => console.error('Failed to load services:', err));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="What We Do"
        title="Services That Move Your Business Forward"
        description="Everything you need to build, launch and grow your brand — under one roof."
        crumb="Services"
      />

      <section>
        <div className="container">
          <div className="service-detail-list">
            {services.map((s) => (
              <Reveal as="div" className="service-row" key={s.id}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{SERVICE_ICONS[s.icon_key]}</svg></div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <ul>
                  {(s.items || []).map((item) => <li key={item}>{item}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Our Process</div>
            <SplitReveal>How We Deliver Every Project</SplitReveal>
          </Reveal>
          <div className="process-grid process-3-col">
            {PROCESS.map((s) => (
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

      <CtaBand
        title="Not Sure Which Service You Need?"
        text="Tell us about your project and we'll recommend the right approach."
        buttonLabel="Talk To Us"
      />
    </>
  );
}
