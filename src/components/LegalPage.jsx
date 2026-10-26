import PageHeader from './PageHeader.jsx';
import usePageTitle from '../usePageTitle.js';

// Company identity shown on every legal page. Keep identical to the Business Registration (BR)
// certificate and the Meta business portfolio: Meta compares them during verification.
export const COMPANY = {
  legalName: 'Gloma International Private Limited',
  brand: 'Gloma International',
  address: 'No 15/1/8, Mathagoda Junction, Pannipitiya, Kottawa, Sri Lanka',
  phone: '011 711 0174',
  email: 'info@glomaint.com',
  website: 'https://glomaint.com',
};

export default function LegalPage({ title, eyebrow, description, crumb, updated, children }) {
  usePageTitle(`${title} — Gloma International`);
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} crumb={crumb} />
      <section>
        <div className="container">
          <article className="legal-content">
            <p className="legal-updated">Last updated: {updated}</p>
            {children}
            <div className="legal-contact">
              <h2>Contact us</h2>
              <p>
                <strong>{COMPANY.legalName}</strong><br />
                {COMPANY.address}<br />
                Phone: <a href="tel:+94117110174">{COMPANY.phone}</a><br />
                Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
