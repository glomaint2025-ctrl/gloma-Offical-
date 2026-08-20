import { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Draggable, momentum-scrolling testimonial marquee — recovered/ported from
// testimonials-marquee.html (an HTML reference/prototype page). Auto-scrolls
// right-to-left, pauses on hover, and supports drag-to-scroll with release
// momentum. The card set is duplicated once for a seamless infinite loop.
const REVIEWS = [
  { name: 'Hyman Brady', role: 'Store Owner', text: '10 out of 10! I recently ordered a print but inputted my delivery address incorrectly. Contacted the team and they quickly arranged a reprint. The communication was excellent — quick replies, polite and very kind. Will be ordering again soon!', likes: 125, stars: 5 },
  { name: 'Amina Yusuf', role: 'Founder, Velosea', text: 'Gloma International transformed our online presence. Their creativity and professionalism are unmatched from the very first call.', likes: 98, stars: 5 },
  { name: 'David Okoro', role: 'CEO, Groceria', text: 'The team delivered a stunning app experience. Communication was smooth from start to finish and every deadline was met.', likes: 76, stars: 5 },
  { name: 'Sara Bello', role: 'Marketing Lead, Zenara', text: 'Highly recommended. They understand branding and how it genuinely connects with an audience — not just how it looks.', likes: 64, stars: 5 },
  { name: 'Michael Chen', role: 'Founder, Fitverse', text: 'Our social channels finally feel consistent and on-brand. Engagement has nearly doubled since we started working together.', likes: 112, stars: 5 },
  { name: 'Lara Mensah', role: 'Ops Manager, Summit Logistics', text: 'Their IT support has been rock solid. Fast response times and they actually explain things clearly instead of using jargon.', likes: 57, stars: 5 },
  { name: 'Ryan Castillo', role: "Co-Founder, Revise", text: "From packaging to launch campaign, Gloma nailed the whole brand rollout. Couldn't be happier with the final result.", likes: 83, stars: 5 },
  { name: 'Priya Nandan', role: 'Founder, Loomwork', text: 'Responsive, detail-oriented and genuinely invested in our growth. It feels like having an in-house team, not an agency.', likes: 70, stars: 5 },
];

function initials(name) {
  return name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
}

function Card({ r, index }) {
  return (
    <div className="tm-card" style={{ animationDelay: `${0.04 + index * 0.06}s` }}>
      <div className="tm-badge">
        <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        <span className="like-count">{r.likes}</span>
      </div>
      <div className="tm-quote-icon">
        <svg viewBox="0 0 32 24"><path d="M0 24V14.4C0 6.4 5.2 0.8 13.2 0L14.8 3.6C10.4 4.8 8 7.6 8 11.2H14V24H0ZM18 24V14.4C18 6.4 23.2 0.8 31.2 0L32.8 3.6C28.4 4.8 26 7.6 26 11.2H32V24H18Z" /></svg>
      </div>
      <div className="tm-header">
        <div className="tm-avatar">{initials(r.name)}</div>
        <div className="tm-meta">
          <div className="tm-name">{r.name}</div>
          <div className="tm-stars">{'★★★★★'.slice(0, r.stars)}</div>
        </div>
      </div>
      <p className="tm-text">{r.text}</p>
      <div className="tm-footer">
        <button className="tm-icon-btn like" aria-label="Like" aria-pressed="false">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" /></svg>
        </button>
        <button className="tm-icon-btn" aria-label="Comment">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5H3l3.2-3.2A8.38 8.38 0 1 1 21 11.5z" /></svg>
        </button>
        <button className="tm-icon-btn" aria-label="Share">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function TestimonialsMarquee() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = Array.from(track.querySelectorAll('.tm-card'));

    let pos = 0;
    let singleSetWidth = 0;
    const speed = 0.045;
    let velocity = 0;
    let isDragging = false;
    let isHover = false;
    let dragStartX = 0;
    let dragStartPos = 0;
    let lastMoveX = 0;
    let lastMoveTime = 0;
    let lastTs = null;
    let rafId;

    const measure = () => {
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      singleSetWidth = track.scrollWidth / 2 + gap / 2;
    };

    const wrap = (p) => {
      if (singleSetWidth <= 0) return p;
      while (p <= -singleSetWidth) p += singleSetWidth;
      while (p > 0) p -= singleSetWidth;
      return p;
    };

    const applyTransform = () => { track.style.transform = `translateX(${pos}px)`; };

    const updateFocus = () => {
      const centerX = window.innerWidth / 2;
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const dist = Math.abs(cardCenter - centerX);
        card.classList.toggle('is-focus', dist < rect.width * 0.55);
      });
    };

    const frame = (ts) => {
      if (lastTs == null) lastTs = ts;
      const dt = Math.min(ts - lastTs, 48);
      lastTs = ts;

      if (!isDragging) {
        if (Math.abs(velocity) > 0.01) {
          pos += velocity * dt;
          velocity *= 0.945;
        } else if (!isHover) {
          pos -= speed * dt;
        }
        pos = wrap(pos);
        applyTransform();
      }
      updateFocus();
      rafId = requestAnimationFrame(frame);
    };

    measure();
    window.addEventListener('resize', measure);
    rafId = requestAnimationFrame(frame);

    const onPointerDown = (e) => {
      isDragging = true;
      velocity = 0;
      viewport.classList.add('dragging');
      dragStartX = e.clientX;
      dragStartPos = pos;
      lastMoveX = e.clientX;
      lastMoveTime = performance.now();
      try { viewport.setPointerCapture(e.pointerId); } catch (err) {}
    };
    const onPointerMove = (e) => {
      if (!isDragging) return;
      const x = e.clientX;
      pos = wrap(dragStartPos + (x - dragStartX));
      applyTransform();
      const now = performance.now();
      const dt = now - lastMoveTime;
      if (dt > 8) {
        velocity = (x - lastMoveX) / dt;
        lastMoveX = x;
        lastMoveTime = now;
      }
    };
    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      viewport.classList.remove('dragging');
    };
    const onMouseEnter = () => { isHover = true; };
    const onMouseLeave = () => { isHover = false; };

    const onLikeClick = (e) => {
      const btn = e.target.closest('.tm-icon-btn.like');
      if (!btn) return;
      const card = btn.closest('.tm-card');
      const countEl = card.querySelector('.like-count');
      const liked = btn.classList.toggle('liked');
      btn.setAttribute('aria-pressed', liked ? 'true' : 'false');
      if (countEl) countEl.textContent = parseInt(countEl.textContent, 10) + (liked ? 1 : -1);
      btn.classList.remove('pop');
      void btn.offsetWidth;
      btn.classList.add('pop');
    };

    viewport.addEventListener('pointerdown', onPointerDown);
    viewport.addEventListener('pointermove', onPointerMove);
    viewport.addEventListener('pointerup', onPointerUp);
    viewport.addEventListener('pointercancel', onPointerUp);
    viewport.addEventListener('mouseenter', onMouseEnter);
    viewport.addEventListener('mouseleave', onMouseLeave);
    track.addEventListener('click', onLikeClick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', measure);
      viewport.removeEventListener('pointerdown', onPointerDown);
      viewport.removeEventListener('pointermove', onPointerMove);
      viewport.removeEventListener('pointerup', onPointerUp);
      viewport.removeEventListener('pointercancel', onPointerUp);
      viewport.removeEventListener('mouseenter', onMouseEnter);
      viewport.removeEventListener('mouseleave', onMouseLeave);
      track.removeEventListener('click', onLikeClick);
    };
  }, []);

  return (
    <StyledWrapper>
      <div className="tm-viewport" ref={viewportRef}>
        <div className="tm-edge left" aria-hidden="true" />
        <div className="tm-edge right" aria-hidden="true" />
        <div className="tm-track" ref={trackRef}>
          {REVIEWS.map((r, i) => <Card r={r} index={i} key={`${r.name}-a`} />)}
          {REVIEWS.map((r, i) => <Card r={r} index={i} key={`${r.name}-b`} aria-hidden="true" />)}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  --blue-a: #1747c9;
  --blue-b: #1e8fff;
  --card-w: 360px;
  --gap: 26px;

  .tm-viewport {
    position: relative;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
    padding: 24px 0 40px;
    cursor: grab;
    touch-action: pan-y;
  }
  .tm-viewport.dragging { cursor: grabbing; }

  .tm-track {
    display: flex;
    gap: var(--gap);
    width: max-content;
    will-change: transform;
    user-select: none;
    -webkit-user-select: none;
  }

  .tm-edge {
    position: absolute;
    top: 0;
    bottom: 0;
    width: min(22vw, 260px);
    z-index: 5;
    pointer-events: none;
  }
  .tm-edge.left {
    left: 0;
    background: linear-gradient(to right, var(--surface) 0%, transparent 100%);
  }
  .tm-edge.right {
    right: 0;
    background: linear-gradient(to left, var(--surface) 0%, transparent 100%);
  }

  .tm-card {
    position: relative;
    flex: 0 0 auto;
    width: var(--card-w);
    background: linear-gradient(150deg, var(--blue-a), var(--blue-b) 80%);
    border-radius: 22px;
    padding: 30px 28px 24px;
    color: #fff;
    box-shadow: 0 18px 40px -14px rgba(5, 12, 43, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.12);
    border: 1px solid rgba(255, 255, 255, 0.14);
    transform: scale(0.94);
    opacity: 0.6;
    filter: saturate(0.85);
    transition: transform .5s cubic-bezier(.22,.61,.36,1), opacity .5s ease, filter .5s ease, box-shadow .5s ease;
    animation: tm-fade-up .7s cubic-bezier(.22,.61,.36,1) both;
  }
  .tm-card.is-focus {
    transform: scale(1.05);
    opacity: 1;
    filter: saturate(1.05);
    box-shadow: 0 26px 60px -16px rgba(23, 71, 201, 0.55), inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }

  @keyframes tm-fade-up {
    from { opacity: 0; transform: translateY(26px) scale(0.9); }
    to { opacity: 0.6; transform: translateY(0) scale(0.94); }
  }

  .tm-quote-icon {
    width: 38px;
    height: 38px;
    opacity: 0.9;
    margin-bottom: 14px;
    animation: tm-float 4.5s ease-in-out infinite;
  }
  .tm-quote-icon svg { width: 100%; height: 100%; fill: rgba(255, 255, 255, 0.85); }

  @keyframes tm-float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }

  .tm-badge {
    position: absolute;
    top: -14px;
    right: 22px;
    display: flex;
    align-items: center;
    gap: 6px;
    background: #fff;
    color: var(--navy);
    font-size: 13px;
    font-weight: 700;
    padding: 7px 13px 7px 10px;
    border-radius: 999px;
    box-shadow: 0 8px 18px -6px rgba(5, 12, 43, 0.4);
    animation: tm-badge-pulse 2.6s ease-in-out infinite;
  }
  .tm-badge svg { width: 14px; height: 14px; fill: #ff4d6d; }

  @keyframes tm-badge-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.08); }
  }

  .tm-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
  .tm-avatar {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--yellow), var(--yellow-deep));
    color: var(--navy-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 15px;
    flex: 0 0 auto;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.18);
  }
  .tm-name { font-weight: 700; font-size: 15px; line-height: 1.3; }
  .tm-stars { color: var(--yellow); font-size: 13px; letter-spacing: 2px; margin-top: 2px; }

  .tm-text {
    font-size: 14.5px;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.92);
    margin-bottom: 22px;
    min-height: 118px;
  }

  .tm-footer {
    display: flex;
    align-items: center;
    gap: 18px;
    padding-top: 14px;
    border-top: 1px solid rgba(255, 255, 255, 0.16);
  }
  .tm-icon-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    transition: color .2s ease, transform .2s ease;
  }
  .tm-icon-btn svg { width: 19px; height: 19px; }
  .tm-icon-btn:hover { color: var(--yellow); transform: translateY(-2px); }
  .tm-icon-btn.liked { color: #ff4d6d; }
  .tm-icon-btn.liked svg { fill: #ff4d6d; }
  .tm-icon-btn.pop svg { animation: tm-heart-pop .45s ease; }

  @keyframes tm-heart-pop {
    0% { transform: scale(1); }
    35% { transform: scale(1.5); }
    60% { transform: scale(0.85); }
    100% { transform: scale(1); }
  }

  @media (max-width: 640px) {
    --card-w: 300px;
    --gap: 18px;
    .tm-text { min-height: 150px; }
  }
`;
