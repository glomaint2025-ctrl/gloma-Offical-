import LegalPage, { COMPANY } from '../components/LegalPage.jsx';
import TransitionLink from '../components/TransitionLink.jsx';

export default function Terms() {
  return (
    <LegalPage
      title="Terms & Conditions"
      eyebrow="Legal"
      description="The terms for using the Gloma International website, services and GlomaMind."
      crumb="Terms & Conditions"
      updated="27 October 2026"
    >
      <p>
        These Terms & Conditions ("Terms") govern your use of <a href={COMPANY.website}>glomaint.com</a>, the digital agency
        services of <strong>{COMPANY.legalName}</strong> ("Gloma International", "we", "us"), and <strong>GlomaMind</strong>,
        our AI customer-support platform. By using them you agree to these Terms. If you use GlomaMind for a company, you
        confirm you are authorised to accept these Terms for it.
      </p>

      <h2>1. Our services</h2>
      <ul>
        <li><strong>Agency services</strong>: web and mobile development, IT solutions, content, social media and branding, as agreed in a written quotation or contract. That agreement prevails where it differs from these Terms.</li>
        <li><strong>GlomaMind</strong>: a subscription platform that lets businesses connect messaging channels such as WhatsApp and Telegram, upload their own business information, and answer customer questions automatically with AI, with a shared inbox for their staff.</li>
      </ul>

      <h2>2. Accounts</h2>
      <p>
        You must give accurate information, keep your login details secure and tell us immediately about unauthorised use.
        Business owners are responsible for the actions of the team members they invite.
      </p>

      <h2>3. Acceptable use</h2>
      <p>You must not use our services to:</p>
      <ul>
        <li>Send spam, unsolicited bulk messages or messages to people who have not agreed to hear from you.</li>
        <li>Break the law, infringe others' rights, or share harmful, fraudulent, hateful or adult content.</li>
        <li>Collect payment card numbers, passwords or sensitive personal data through chat.</li>
        <li>Attempt to access other customers' data, disrupt our systems or reverse-engineer the platform.</li>
      </ul>

      <h2>4. WhatsApp and other messaging channels</h2>
      <p>
        When you connect WhatsApp, you must also comply with the{' '}
        <a href="https://www.whatsapp.com/legal/business-policy" target="_blank" rel="noopener noreferrer">WhatsApp Business Messaging Policy</a>,
        the WhatsApp Business Terms of Service and Meta's Commerce Policy. You are responsible for obtaining your customers'
        permission to message them, for your message templates, and for message fees Meta charges to your WhatsApp
        Business Account. We may suspend a channel that puts the platform or other customers at risk.
      </p>

      <h2>5. AI-generated replies</h2>
      <p>
        GlomaMind generates replies from the information you provide. You are responsible for keeping that information
        accurate and up to date and for reviewing how the assistant answers. AI can make mistakes; GlomaMind is designed to
        hand a conversation to your staff when it cannot find a reliable answer, and your staff can take over at any time.
      </p>

      <h2>6. Your content and data</h2>
      <p>
        You keep ownership of the content you upload and the conversations with your customers. You give us permission to
        store and process it only to provide the service. You confirm you have the right to use that content. Personal data is
        handled as described in our <TransitionLink to="/privacy-policy">Privacy Policy</TransitionLink>.
      </p>

      <h2>7. Fees and payment</h2>
      <p>
        Subscription plans, prices and limits are shown before you subscribe or in your quotation. Fees are payable in
        advance and are non-refundable except where required by law or agreed in writing. Messaging fees charged by Meta or
        other providers are separate. We may change prices with at least 30 days' notice.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The GlomaMind software, our website and our brand belong to Gloma International. Ownership of deliverables from agency
        projects passes to the client on full payment unless the contract says otherwise.
      </p>

      <h2>9. Availability and changes</h2>
      <p>
        We aim to keep our services available and secure but do not guarantee uninterrupted operation. Third-party services
        such as WhatsApp, Telegram or AI providers may change or become unavailable, which can affect features.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        To the extent allowed by law, we are not liable for indirect or consequential losses, lost profits or data loss
        caused by third-party services. Our total liability is limited to the fees you paid us in the 3 months before the
        claim.
      </p>

      <h2>11. Suspension and termination</h2>
      <p>
        You can cancel at any time. We may suspend or close accounts that breach these Terms. After closure you can request
        an export of your data within 30 days; it is then deleted as described in the Privacy Policy.
      </p>

      <h2>12. Governing law</h2>
      <p>These Terms are governed by the laws of Sri Lanka, and the courts of Colombo have jurisdiction.</p>

      <h2>13. Changes to these Terms</h2>
      <p>We may update these Terms. The date at the top shows the latest version; continued use after changes means you accept them.</p>
    </LegalPage>
  );
}
