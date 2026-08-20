import { createContext, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const TransitionContext = createContext(null);

export function useTransitionNavigate() {
  return useContext(TransitionContext);
}

export default function PageTransitionOverlay({ children }) {
  const navigate = useNavigate();

  const navigateWithTransition = useCallback(
    (to) => {
      // Normal page change
      window.scrollTo(0, 0);
      navigate(to);
    },
    [navigate]
  );

  return (
    <TransitionContext.Provider value={navigateWithTransition}>
      {children}
    </TransitionContext.Provider>
  );
}
