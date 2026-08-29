import { createContext, useContext, useState } from 'react';

const VALID_THEMES = ['newyear', 'christmas', 'vesak', 'poson', 'kites'];

function computeTheme() {
  const forced = new URLSearchParams(window.location.search).get('season');
  if (forced && VALID_THEMES.includes(forced)) return forced;

  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  if (month === 1 && day <= 7) return 'newyear';
  if (month === 12 && day >= 15) return 'christmas';
  if (month === 5) return 'vesak';
  if (month === 6) return 'poson';
  if (month === 8) return 'kites';
  return null;
}

const SeasonContext = createContext(null);

export function SeasonProvider({ children }) {
  const [theme] = useState(computeTheme);
  return <SeasonContext.Provider value={theme}>{children}</SeasonContext.Provider>;
}

export function useSeason() {
  return useContext(SeasonContext);
}
