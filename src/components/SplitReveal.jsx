import { useEffect, useRef, useState } from 'react';

// Letter-by-letter heading reveal — mirrors the .split-reveal behavior from
// main.js, splitting text into per-word/per-char spans and staggering them
// in via transition-delay as the heading scrolls into view.
export default function SplitReveal({ as: Tag = 'h2', className = '', children }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const text = typeof children === 'string' ? children : '';

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setInView(true);
      return;
    }
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  let index = 0;
  const elements = [];
  text.split(' ').forEach((word, wi, arr) => {
    const chars = [...word].map((ch) => {
      const charIndex = index++;
      return (
        <span
          key={charIndex}
          className={`split-char${inView ? ' in-view' : ''}`}
          style={{ transitionDelay: `${charIndex * 16}ms` }}
        >
          {ch}
        </span>
      );
    });
    
    elements.push(
      <span className="split-word" key={`word-${wi}`}>
        {chars}
      </span>
    );
    
    if (wi < arr.length - 1) {
      elements.push(' ');
    }
  });

  return (
    <Tag ref={ref} className={`split-reveal${className ? ` ${className}` : ''}`}>
      {elements}
    </Tag>
  );
}
