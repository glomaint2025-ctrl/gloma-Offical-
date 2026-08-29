import { useTransitionNavigate } from './PageTransitionOverlay.jsx';

// Same-tab link that plays the page-transition overlay before navigating.
// Modified clicks (ctrl/cmd/shift, middle-click) fall through to the
// browser's normal anchor behavior, same as the original main.js intercept.
export default function TransitionLink({ to, className, children, onClick, ...props }) {
  const navigateWithTransition = useTransitionNavigate();

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    if (onClick) onClick(e);
    navigateWithTransition(to);
  };

  return (
    <a href={to} className={className} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
