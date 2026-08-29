import { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader.jsx';
import Reveal from '../components/Reveal.jsx';
import CtaBand from '../components/CtaBand.jsx';
import usePageTitle from '../usePageTitle.js';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'web', label: 'Web Development' },
  { key: 'branding', label: 'Branding' },
  { key: 'social', label: 'Social Media' },
];

export default function Works() {
  usePageTitle('Our Works — Gloma International');
  const [filter, setFilter] = useState('all');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/works')
      .then((r) => r.json())
      .then((data) => {
        const mapped = (data.works || []).map((w) => ({
          category: w.category,
          cat: w.cat_label,
          title: w.title,
          link: w.link,
          img: w.img,
        }));
        setProjects(mapped);
      })
      .catch((err) => console.error('Failed to load works:', err));
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Our Portfolio"
        title="Work We're Proud Of"
        description="A selection of web, mobile, branding and marketing projects delivered for clients across the globe."
        crumb="Works"
      />

      <section>
        <div className="container">
          <div className="filter-row">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`filter-btn${filter === f.key ? ' active' : ''}`}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="works-grid">
            {projects.map((p) => {
              const Tag = p.link ? "a" : "div";
              return (
                <Reveal
                  as={Tag}
                  href={p.link}
                  target={p.link ? "_blank" : undefined}
                  rel={p.link ? "noopener noreferrer" : undefined}
                  className="work-card"
                  key={p.title}
                  style={{ display: filter === 'all' || filter === p.category ? '' : 'none', textDecoration: 'none' }}
                >
                  <div className="work-thumb" style={{ overflow: 'hidden' }}>
                    {p.link && (p.category === 'web' || p.category === 'branding') ? (
                      <iframe 
                        src={p.link} 
                        title={p.title}
                        scrolling="no" 
                        style={{ position: 'absolute', top: 0, left: 0, width: '400%', height: '400%', transform: 'scale(0.25)', transformOrigin: 'top left', border: 'none', pointerEvents: 'none' }} 
                      />
                    ) : p.img ? (
                      <img 
                        src={p.img} 
                        alt={p.title} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} 
                      />
                    ) : null}
                  </div>
                  <div className="work-glyph">↗</div>
                  <div className="work-info"><div className="cat">{p.cat}</div><h3>{p.title}</h3></div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand
        title="Have a Project In Mind?"
        text="Let's create your next success story together."
        buttonLabel="Start Your Project"
      />
    </>
  );
}
