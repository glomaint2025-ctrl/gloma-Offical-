import KineticCanvas from './KineticCanvas.jsx';
import TransitionLink from './TransitionLink.jsx';
import SplitReveal from './SplitReveal.jsx';

export default function PageHeader({ eyebrow, title, description, crumb, bgVideoSrc }) {
  return (
    <section className="page-header">
      {bgVideoSrc ? (
        <>
          <video className="page-header-bg-video" autoPlay muted loop playsInline aria-hidden="true">
            <source src={bgVideoSrc} type="video/mp4" />
          </video>
          <div className="page-header-bg-overlay" aria-hidden="true" />
        </>
      ) : null}
      <KineticCanvas />
      <div className="container">
        <div className="eyebrow anim-fade-up" style={{ justifyContent: 'center' }}>{eyebrow}</div>
        <SplitReveal as="h1" className="anim-d1">{title}</SplitReveal>
        <p className="anim-fade-up anim-d2">{description}</p>
        <div className="breadcrumb anim-fade-up anim-d3">
          <TransitionLink to="/">Home</TransitionLink>
          <span>/</span>
          <span>{crumb}</span>
        </div>
      </div>
    </section>
  );
}
