import React, { useEffect, useRef, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import SplitReveal from '../components/SplitReveal.jsx';
import CountUp from '../components/CountUp.jsx';
import TransitionLink from '../components/TransitionLink.jsx';
import ArrowIcon from '../components/ArrowIcon.jsx';
import usePageTitle from '../usePageTitle.js';

function pickRandom(pool, n) {
  const copy = [...pool];
  const out = [];
  while (out.length < n && copy.length) {
    out.push(copy.splice(Math.floor(Math.random() * copy.length), 1)[0]);
  }
  return out;
}

function AnimatedReviewCard({ initialReview, getNextReviewRef }) {
  const cardRef = useRef(null);

  useEffect(() => {
    let unmounted = false;
    let timeoutId;
    
    const rotate = async () => {
      if (unmounted) return;
      const nextR = getNextReviewRef.current(); 
      
      const el = cardRef.current;
      if (!el) return;
      
      const quoteEl = el.querySelector('.quote');
      const personEl = el.querySelector('.reviewer');
      if (!quoteEl || !personEl) return;
      
      const text = quoteEl.textContent.replace(/"/g, '').trim();
      const words = text.split(/\s+/);
      quoteEl.innerHTML = `"${words.map(w => `<span class="w">${w}</span>`).join(' ')}"`;
      const spans = [...quoteEl.querySelectorAll('.w')];
      
      personEl.classList.add('hide');
      
      spans.reverse().forEach((sp, i) => {
        setTimeout(() => { if (!unmounted) sp.classList.add('gone'); }, i * 36);
      });
      
      const fadeDuration = spans.length * 36 + 260;
      await new Promise(r => setTimeout(r, fadeDuration));
      if (unmounted) return;
      
      quoteEl.innerHTML = `"<span class="typed"></span><span class="caret"></span>"`;
      personEl.querySelector('.avatar').textContent = nextR.name.charAt(0);
      personEl.querySelector('.name').textContent = nextR.name;
      personEl.querySelector('.role').textContent = nextR.role;
      
      const typed = quoteEl.querySelector('.typed');
      const caret = quoteEl.querySelector('.caret');
      const newText = nextR.q;
      let i = 0;
      
      return new Promise(resolve => {
        const tick = () => {
          if (unmounted) return;
          if (i <= newText.length) {
            typed.textContent = newText.slice(0, i);
            i++;
            timeoutId = setTimeout(tick, 14 + Math.random() * 22);
          } else {
            caret.classList.add('done');
            personEl.classList.remove('hide');
            resolve();
          }
        };
        tick();
      });
    };

    const interval = setInterval(() => {
      setTimeout(() => rotate(), Math.random() * 1000);
    }, 30000);

    return () => {
      unmounted = true;
      clearInterval(interval);
      clearTimeout(timeoutId);
    };
  }, [getNextReviewRef]);

  return (
    <Reveal as="div" className="review-card" ref={cardRef}>
      <div className="stars">★★★★★</div>
      <p className="quote">"{initialReview.q}"</p>
      <div className="reviewer">
        <div className="avatar">{initialReview.name.charAt(0)}</div>
        <div>
          <div className="name">{initialReview.name}</div>
          <div className="role">{initialReview.role}</div>
        </div>
      </div>
    </Reveal>
  );
}

function ReviewsCta() {
  return (
    <Reveal className="cta-band">
      <div className="cta-left">
        <div className="icon-circle">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </div>
        <div>
          <SplitReveal>Become Our Next Success Story</SplitReveal>
          <p>Join the businesses already growing with Gloma International.</p>
        </div>
      </div>
      <TransitionLink to="/contact" className="btn btn-primary">Get Started <ArrowIcon /></TransitionLink>
    </Reveal>
  );
}

export default function Reviews() {
  usePageTitle('Client Reviews — Gloma International');
  const poolRef = useRef([]);
  const [initialReviews, setInitialReviews] = useState([]);
  const getNextReviewRef = useRef(() => pickRandom(poolRef.current, 1)[0]);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then((data) => {
        const pool = (data.reviews || []).map((r) => ({ q: r.quote, name: r.name, role: r.role }));
        poolRef.current = pool;
        setInitialReviews(pickRandom(pool, Math.min(6, pool.length)));
      })
      .catch((err) => console.error('Failed to load reviews:', err));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Testimonials"
        title="What Our Clients Say"
        description="Real feedback from the businesses we've helped grow."
        crumb="Reviews"
      />

      <section>
        <div className="container">
          <div className="reviews-grid">
            {initialReviews.map((r, i) => (
              <AnimatedReviewCard key={i} initialReview={r} getNextReviewRef={getNextReviewRef} />
            ))}
          </div>

          <div className="review-stats">
            <Reveal><CountUp target={4.9} decimals={1} suffix="/5" /><div className="label">Average Rating</div></Reveal>
            <Reveal><CountUp target={120} suffix="+" /><div className="label">Client Reviews</div></Reveal>
            <Reveal><CountUp target={96} suffix="%" /><div className="label">Client Retention</div></Reveal>
            <Reveal><CountUp target={15} suffix="+" /><div className="label">Countries Served</div></Reveal>
          </div>
        </div>
      </section>

      <section className="bg-soft">
        <div className="container">
          <ReviewsCta />
        </div>
      </section>
    </>
  );
}
