import LegalPage, { COMPANY } from '../components/LegalPage.jsx';
import TransitionLink from '../components/TransitionLink.jsx';

export default function DataDeletion() {
  const subject = encodeURIComponent('Data Deletion Request');
  return (
    <LegalPage
      title="Data Deletion"
      eyebrow="Your data"
      description="How to ask Gloma International to delete your personal data."
      crumb="Data Deletion"
      updated="27 October 2026"
    >
      <p>
        You can ask us to delete the personal data we hold about you at any time. This includes data from our website,
        from GlomaMind accounts, and from WhatsApp or Telegram conversations with businesses that use GlomaMind.
      </p>

      <h2>How to request deletion</h2>
      <ol>
        <li>
          Email <a href={`mailto:${COMPANY.email}?subject=${subject}`}>{COMPANY.email}</a> with the subject
          <strong> "Data Deletion Request"</strong>.
        </li>
        <li>
          Include what we need to find your data:
          <ul>
            <li>WhatsApp: the phone number you messaged from, and the business you messaged.</li>
            <li>Telegram: your Telegram username, and the business or bot you messaged.</li>
            <li>GlomaMind account or website enquiry: the email address you used.</li>
          </ul>
        </li>
        <li>We may ask you to confirm the request from the same number or email, so that no one else can delete your data.</li>
      </ol>

      <h2>What happens next</h2>
      <ul>
        <li>We confirm receipt within 3 working days and give you a reference number.</li>
        <li>We delete your contact details, messages and related records within <strong>30 days</strong>, including from the business's GlomaMind inbox.</li>
        <li>Backups are overwritten on their normal cycle, within 30 further days.</li>
        <li>We may keep a minimal record that the request was completed, and data we must keep by law (such as billing records).</li>
      </ul>

      <div className="legal-note">
        If you messaged a business through GlomaMind, that business can also delete your conversation for you directly. Data
        held by WhatsApp or Meta themselves is deleted through your WhatsApp settings (Settings → Account → Delete account).
      </div>

      <h2>Facebook / Meta login data</h2>
      <p>
        If you connected a business to GlomaMind using Facebook (Meta Embedded Signup), you can remove GlomaMind's access at any
        time in Facebook: <strong>Settings & privacy → Settings → Business integrations</strong>, then remove GlomaMind. To delete
        the data we stored from that connection, send a deletion request as described above.
      </p>

      <p>
        More detail on how we handle your data is in our <TransitionLink to="/privacy-policy">Privacy Policy</TransitionLink>.
      </p>
    </LegalPage>
  );
}
