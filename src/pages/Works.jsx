import { useState } from 'react';
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

const PROJECTS = [
  { category: 'web', cat: 'Web Development', title: 'Magic Mirror Art', link: 'https://magic-mirror-art.lovable.app' },
  { category: 'web', cat: 'Web Development', title: 'Renua Medspa', link: 'https://renuamedspa.com/' },
  { category: 'web', cat: 'Web Development', title: 'Novalys Capital', link: 'https://novalyscapital.ca/' },

  { category: 'branding', cat: 'Branding', title: 'Pettah Mall', link: 'https://pettahmall.com/' },
  { category: 'branding', cat: 'Branding', title: 'Biz Online', link: 'https://www.bizonline.lk/' },
  { category: 'branding', cat: 'Branding', title: 'Smart Time', link: 'https://smarttime.lk/' },

  { category: 'social', cat: 'Social Media', title: 'Russel\'s Tea Services and Catering', link: 'https://www.facebook.com/russelscatering', img: '/assets/russels-catering.png' },
  { category: 'social', cat: 'Social Media', title: 'Russel\'s Dimbula Tea', link: 'https://www.facebook.com/profile.php?id=61589278528562', img: '/assets/russels-dimbula-tea.jpg' },
  { category: 'social', cat: 'Social Media', title: 'Russel Francis Perera', link: 'https://www.facebook.com/profile.php?id=61586921127253', img: '/assets/russel-perera.jpg' },
  { category: 'social', cat: 'Social Media', title: 'Premasiri Gamage Consultant', link: 'https://www.facebook.com/profile.php?id=61577673075763', img: '/assets/premasiri-gamage.png' },
];

export default function Works() {
  usePageTitle('Our Works — Gloma International');
  const [filter, setFilter] = useState('all');

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
            {PROJECTS.map((p) => {
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
