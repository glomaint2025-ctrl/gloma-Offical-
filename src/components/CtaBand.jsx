import Reveal from './Reveal.jsx';
import SplitReveal from './SplitReveal.jsx';
import TransitionLink from './TransitionLink.jsx';
import ArrowIcon from './ArrowIcon.jsx';

export default function CtaBand({ title, text, buttonLabel, to = '/contact' }) {
  return (
    <section>
      <div className="container">
        <Reveal className="cta-band">
          <div className="cta-left">
            <div className="icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <div>
              <SplitReveal>{title}</SplitReveal>
              <p>{text}</p>
            </div>
          </div>
          <TransitionLink to={to} className="btn btn-primary">
            {buttonLabel} <ArrowIcon />
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
