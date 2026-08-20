import { useEffect, useState } from 'react';
import styled from 'styled-components';

// PLACEHOLDER — the original was a custom multi-piece animated SVG "spinning
// top" loader (styled-components, several gradient-filled <path> layers).
// Only part of that file's code survived in this session's context, so this
// is a simple stand-in until the full animation is redone.
export default function PageLoader() {
  const [shouldShow] = useState(() => window.location.pathname === '/');
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!shouldShow) return;
    const hide = () => setHidden(true);
    const t = setTimeout(hide, 1800);
    return () => clearTimeout(t);
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <StyledWrapper id="page-loader" className={`page-loader${hidden ? ' hidden' : ''}`} aria-hidden="true">
      <div className="spinner" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .spinner {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.15);
    border-top-color: #ffc629;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
