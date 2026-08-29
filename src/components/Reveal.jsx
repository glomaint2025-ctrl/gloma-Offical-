import { forwardRef, useEffect, useRef, useState } from 'react';

// Scroll-reveal wrapper — mirrors the original .reveal / in-view IntersectionObserver
// behavior from main.js, scoped to a single mounted element via a ref.
const Reveal = forwardRef(function Reveal({ as: Tag = 'div', className = '', children, ...props }, forwardedRef) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `reveal${inView ? ' in-view' : ''}${className ? ` ${className}` : ''}`;

  const setRefs = (node) => {
    ref.current = node;
    if (typeof forwardedRef === 'function') forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Tag ref={setRefs} className={cls} {...props}>
      {children}
    </Tag>
  );
});

export default Reveal;
