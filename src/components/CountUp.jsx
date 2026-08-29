import { useEffect, useRef, useState } from 'react';

// Animated stat counter — mirrors the .count-num behavior from main.js.
export default function CountUp({ target, decimals = 0, suffix = '' }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const animate = () => {
      const duration = 1400;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(target * eased);
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(target);
      };
      requestAnimationFrame(tick);
    };

    if (!('IntersectionObserver' in window)) {
      animate();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  const display = decimals ? value.toFixed(decimals) : Math.round(value);

  return (
    <div className="num">
      <span ref={ref} className="count-num">{display}</span>
      {suffix ? <span className="suffix">{suffix}</span> : null}
    </div>
  );
}
