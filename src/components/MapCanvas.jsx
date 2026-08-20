import { useEffect, useRef } from 'react';
import styled from 'styled-components';

// Dotted world map with pulsing location markers — recovered/ported from
// contact-assistia.html (an HTML reference/prototype page). That page's
// extract.cjs script only pulled out the empty <svg class="map-canvas">
// shell; this component ports the full dot-generation + marker + tooltip
// logic behind it too, restyled to the Gloma navy/yellow palette.
const VBW = 1000;
const VBH = 460;

// Rough continent silhouettes built from overlapping ellipses (percent of the viewBox).
const CONTINENTS = [
  { cx: 17, cy: 26, rx: 12, ry: 13 }, { cx: 23, cy: 14, rx: 4.5, ry: 6 }, { cx: 19, cy: 38, rx: 3.5, ry: 6 },
  { cx: 27, cy: 64, rx: 6.5, ry: 17 },
  { cx: 49, cy: 23, rx: 6, ry: 8 },
  { cx: 50, cy: 54, rx: 9, ry: 19 },
  { cx: 62, cy: 16, rx: 15, ry: 8 }, { cx: 66, cy: 30, rx: 17, ry: 14 }, { cx: 58, cy: 42, rx: 8, ry: 10 }, { cx: 53, cy: 34, rx: 5, ry: 6 },
  { cx: 73, cy: 40, rx: 2.4, ry: 3 }, { cx: 69, cy: 48, rx: 3, ry: 2.2 },
  { cx: 78, cy: 66, rx: 7, ry: 6 },
];

function inLand(xPct, yPct) {
  return CONTINENTS.some((c) => {
    const dx = (xPct - c.cx) / c.rx;
    const dy = (yPct - c.cy) / c.ry;
    return dx * dx + dy * dy <= 1;
  });
}

const MARKERS = [
  { x: 16, y: 38 }, { x: 15, y: 56 }, { x: 26, y: 68 },
  { x: 48, y: 34 }, { x: 52, y: 52 },
  { x: 63, y: 33 }, { x: 69, y: 47 },
  { x: 61, y: 52, big: true, tooltip: true }, // Kottawa, Sri Lanka
  { x: 78, y: 66 },
  { x: 75, y: 74 },
];

export default function MapCanvas() {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    if (svg.childNodes.length > 0) return; // already populated (e.g. StrictMode double-run)

    const cols = 90;
    const rows = 42;
    const svgns = 'http://www.w3.org/2000/svg';
    const frag = document.createDocumentFragment();

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const xPct = (c / (cols - 1)) * 100;
        const yPct = (r / (rows - 1)) * 100;
        if (!inLand(xPct, yPct)) continue;
        if (Math.random() < 0.12) continue;
        const jx = (Math.random() - 0.5) * (100 / cols) * 0.5;
        const jy = (Math.random() - 0.5) * (100 / rows) * 0.5;
        const el = document.createElementNS(svgns, 'circle');
        el.setAttribute('cx', (((xPct + jx) / 100) * VBW).toFixed(1));
        el.setAttribute('cy', (((yPct + jy) / 100) * VBH).toFixed(1));
        el.setAttribute('r', (1.1 + Math.random() * 0.7).toFixed(2));
        el.setAttribute('opacity', (0.35 + Math.random() * 0.45).toFixed(2));
        frag.appendChild(el);
      }
    }
    svg.appendChild(frag);
  }, []);

  return (
    <StyledWrapper>
      <div className="map-stage">
        <svg ref={svgRef} className="map-canvas" viewBox={`0 0 ${VBW} ${VBH}`} preserveAspectRatio="xMidYMid meet" />
        {MARKERS.map((m, i) => (
          <div key={i} className={`map-marker${m.big ? ' big' : ''}`} style={{ left: `${m.x}%`, top: `${m.y}%` }}>
            <span className="ring" />
            <span className="dot" />
          </div>
        ))}
        <div className="map-tooltip" style={{ left: 'calc(61% + 16px)', top: '38%' }}>
          <div className="flag">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.6 4 6 4 9s-1.5 6.4-4 9c-2.5-2.6-4-6-4-9s1.5-6.4 4-9Z" /></svg>
          </div>
          <div className="city">Kottawa, Sri Lanka</div>
          <div className="addr">No 15/1/8, Mathagoda Junction,<br />Pannipitiya, Kottawa</div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .map-stage {
    position: relative;
    width: 100%;
    height: 420px;
  }

  .map-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  .map-canvas circle { fill: var(--border-soft); }

  .map-marker {
    position: absolute;
    width: 12px;
    height: 12px;
    transform: translate(-50%, -50%);
  }
  .map-marker .dot {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: var(--navy);
    box-shadow: 0 0 0 5px rgba(10, 23, 72, 0.15);
    position: relative;
    z-index: 2;
    display: block;
  }
  .map-marker .ring {
    position: absolute;
    inset: -9px;
    border-radius: 50%;
    border: 2px solid rgba(10, 23, 72, 0.35);
    animation: map-pulse 2.6s ease-out infinite;
    display: block;
  }
  .map-marker.big { width: 16px; height: 16px; }
  .map-marker.big .dot { background: var(--yellow-deep); box-shadow: 0 0 0 6px rgba(230, 171, 0, 0.2); }
  .map-marker.big .ring { border-color: rgba(230, 171, 0, 0.45); }

  @keyframes map-pulse {
    0% { transform: scale(0.6); opacity: 0.9; }
    100% { transform: scale(2.4); opacity: 0; }
  }

  .map-tooltip {
    position: absolute;
    width: 190px;
    background: var(--surface);
    border: 1px solid var(--border-soft);
    border-radius: 14px;
    box-shadow: 0 20px 36px -14px rgba(20, 22, 31, 0.18);
    padding: 14px 16px;
    z-index: 3;
  }
  .map-tooltip .flag {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: rgba(230, 171, 0, 0.14);
    color: var(--yellow-deep);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .map-tooltip .flag svg { width: 14px; height: 14px; }
  .map-tooltip .city { font-size: 14px; font-weight: 700; margin-bottom: 3px; color: var(--text-heading); }
  .map-tooltip .addr { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; }

  @media (max-width: 900px) {
    .map-stage { height: 340px; }
  }
  @media (max-width: 640px) {
    .map-tooltip { display: none; }
  }
`;
