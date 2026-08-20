import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';

const SERVICES = [
  {
    title: 'Web Development',
    text: 'Custom, responsive websites and web apps engineered for speed, SEO, and conversions — from landing pages to full platforms.',
    items: ['Business & e-commerce websites', 'Custom web applications', 'Website maintenance & support', 'Speed & SEO optimization'],
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  },
  {
    title: 'Social Media Handling',
    text: 'End-to-end management of your social channels — strategy, content calendars, posting, and community engagement.',
    items: ['Platform strategy & growth', 'Content scheduling & posting', 'Community management', 'Performance reporting'],
    icon: <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
  },
  {
    title: 'Content Creation',
    text: 'Scroll-stopping graphics, video, photography and copywriting tailored to every platform and audience.',
    items: ['Graphic design & video editing', 'Copywriting & captions', 'Photography direction', 'Campaign content kits'],
    icon: <><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></>,
  },
  {
    title: 'IT Solutions',
    text: 'Dependable technical infrastructure, systems setup, and support to keep your business running smoothly.',
    items: ['Network & systems setup', 'Cloud & infrastructure support', 'Technical consulting', 'Ongoing IT support'],
    icon: <><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>,
  },
  {
    title: 'Advertising & Branding',
    text: 'Brand identities and ad campaigns built to make a lasting impression and drive measurable results.',
    items: ['Brand identity & guidelines', 'Logo & visual systems', 'Paid ad campaigns', 'Market positioning'],
    icon: <><path d="M3 11v3a1 1 0 0 0 1 1h2l4 4V6l-4 4H4a1 1 0 0 0-1 1z"/><path d="M15.5 8.5a4 4 0 0 1 0 7"/><path d="M18.5 5.5a8 8 0 0 1 0 13"/></>,
  },
  {
    title: 'Mobile Apps',
    text: 'Native and cross-platform mobile applications designed for performance, usability, and scale.',
    items: ['iOS & Android development', 'Cross-platform apps', 'UI/UX for mobile', 'App maintenance & updates'],
    icon: <><rect x="7" y="2" width="10" height="20" rx="2"/><line x1="11" y1="18" x2="13" y2="18"/></>,
  },
];

const PROCESS = [
  { id: '01', title: 'Strategize & Subscribe', text: 'Choose the right service package tailored to your specific business goals.', icon: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></> },
  { id: '02', title: 'Expert Execution', text: 'Our specialists build and polish your project with meticulous attention to detail.', icon: <><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/></> },
  { id: '03', title: 'Refine & Scale', text: 'We make revisions simple and focus on scaling your results for maximum ROI.', icon: <><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></> },
];

export default function Services() {
  usePageTitle('Services — Gloma International');
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
            {SERVICES.map((s) => (
              <Reveal as="div" className="service-row" key={s.title}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{s.icon}</svg></div>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <ul>
                  {s.items.map((item) => <li key={item}>{item}</li>)}
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
