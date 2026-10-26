import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import TransitionLink from '../components/TransitionLink.jsx';
import usePageTitle from '../usePageTitle.js';

const FEATURES = [
  { title: 'WhatsApp & Telegram', text: 'Connect your official WhatsApp Business number or a Telegram bot. Customers chat in the app they already use.', icon: <><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12Z" /></> },
  { title: 'Answers From Your Own Information', text: 'Upload product lists, prices, policies and FAQs (PDF, Word, Excel or your website). The assistant answers only from what you provide.', icon: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></> },
  { title: 'English, Sinhala & Singlish', text: 'Understands questions in English, Sinhala and Singlish, and replies in the customer\'s language.', icon: <><circle cx="12" cy="12" r="10" /><path d="M2 12h20" /><path d="M12 2a15.3 15.3 0 0 1 0 20 15.3 15.3 0 0 1 0-20" /></> },
  { title: 'Human Takeover', text: 'A shared inbox for your team. When the assistant is unsure it hands over, and any staff member can take over a chat in one click.', icon: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></> },
  { title: 'Analytics', text: 'See message volumes, response times, the questions customers ask most, and the gaps in your information.', icon: <><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></> },
  { title: 'Private & Secure', text: 'Each business has its own isolated workspace, encrypted channel credentials, staff roles and full control over data deletion.', icon: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></> },
];

const STEPS = [
  { title: 'Create your workspace', text: 'Sign up and tell GlomaMind about your business.' },
  { title: 'Add your knowledge', text: 'Upload documents, add FAQs or import your website.' },
  { title: 'Test the answers', text: 'Ask questions in the playground and see the sources behind every answer.' },
  { title: 'Connect WhatsApp', text: 'Link your WhatsApp Business number through Meta\'s secure signup, or connect Telegram.' },
];

const USE_CASES = ['Online stores', 'Hotels', 'Clinics', 'Education institutes', 'Service companies'];

export default function GlomaMind() {
  usePageTitle('GlomaMind — AI Customer Support for WhatsApp | Gloma International');
  return (
    <>
      <PageHeader
        eyebrow="Product by Gloma International"
        title="GlomaMind: AI Customer Support"
        description="Answer customer questions on WhatsApp and Telegram 24/7, using your own business information."
        crumb="GlomaMind"
      />

      <section>
        <div className="container">
          <div className="about-split">
            <div>
              <div className="eyebrow">What It Is</div>
              <SplitReveal>Your Business Knowledge, Answering Customers Instantly</SplitReveal>
              <p style={{ marginTop: 16 }}>
                GlomaMind is a customer-support platform built by Gloma International Private Limited. Businesses connect their
                WhatsApp Business number or Telegram bot, upload their own information, and an AI assistant answers common
                questions about products, prices, delivery, opening hours and policies, in seconds, at any time of day.
              </p>
              <p style={{ marginTop: 14 }}>
                It only answers from the information the business provides. When it can't find a reliable answer it says so and
                passes the conversation to the business's team, who can reply from a shared inbox.
              </p>
              <div className="tag-row">
                {USE_CASES.map((u) => <span className="tag-pill" key={u}>{u}</span>)}
              </div>
            </div>
            <div className="feature-grid">
              {STEPS.map((s, i) => (
                <Reveal as="div" className="feature-card" key={s.title}>
                  <div className="icon-box" style={{ fontWeight: 700 }}>{i + 1}</div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container">
          <Reveal className="section-head">
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Features</div>
            <SplitReveal>Everything a Support Team Needs</SplitReveal>
          </Reveal>
          <div className="services-grid">
            {FEATURES.map((f) => (
              <Reveal as="div" className="service-card" key={f.title}>
                <div className="icon-box"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{f.icon}</svg></div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal className="section-head" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <div className="eyebrow" style={{ justifyContent: 'center' }}>Responsible Messaging</div>
            <SplitReveal>Designed for the Official WhatsApp Business Platform</SplitReveal>
            <p style={{ marginTop: 16 }}>
              GlomaMind connects to WhatsApp through the WhatsApp Business Platform by Meta. Businesses only reply to customers who contact them or who
              have agreed to receive messages, and every customer can ask to speak to a person. Read our{' '}
              <TransitionLink to="/privacy-policy">Privacy Policy</TransitionLink>, <TransitionLink to="/terms">Terms & Conditions</TransitionLink> and how to request{' '}
              <TransitionLink to="/data-deletion">data deletion</TransitionLink>.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Want GlomaMind for Your Business?"
        text="Book a demo and see your own customer questions answered in minutes."
        buttonLabel="Book a Demo"
      />
    </>
  );
}
