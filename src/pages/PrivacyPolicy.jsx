import LegalPage, { COMPANY } from '../components/LegalPage.jsx';
import TransitionLink from '../components/TransitionLink.jsx';

export default function PrivacyPolicy() {
  return (
    <LegalPage
      title="Privacy Policy"
      eyebrow="Legal"
      description="How Gloma International collects, uses and protects personal information."
      crumb="Privacy Policy"
      updated="27 October 2026"
    >
      <p>
        This Privacy Policy explains how <strong>{COMPANY.legalName}</strong> ("Gloma International", "we", "us") collects,
        uses, shares and protects personal information when you use our website <a href={COMPANY.website}>glomaint.com</a>,
        our digital agency services, and <strong>GlomaMind</strong>, our AI customer-support platform for WhatsApp and Telegram.
        We process personal data in line with the Personal Data Protection Act, No. 9 of 2022 of Sri Lanka and, where
        applicable, the WhatsApp Business and Meta platform terms.
      </p>

      <h2>1. Who is responsible for your data</h2>
      <p>
        For our website, agency services and GlomaMind business accounts, Gloma International is the data controller.
        When a business uses GlomaMind to talk to its own customers, that <strong>business</strong> is the controller of its
        customers' messages and contact details, and Gloma International processes them only on the business's behalf and
        according to its instructions.
      </p>

      <h2>2. Information we collect</h2>
      <h3>Website and agency services</h3>
      <ul>
        <li>Details you send through our contact form or newsletter: name, email, phone number, project type and message.</li>
        <li>Basic technical data such as browser type, pages visited and IP address, used for security and performance.</li>
      </ul>
      <h3>GlomaMind business users</h3>
      <ul>
        <li>Account details: name, email address, password (stored only as a secure hash) and company details.</li>
        <li>Content a business uploads to its knowledge base, such as product lists, FAQs, policies and website pages.</li>
        <li>Channel connection details, such as a WhatsApp Business phone number ID or Telegram bot, stored encrypted.</li>
        <li>Usage and billing records, such as message counts and plan information.</li>
      </ul>
      <h3>Customers who message a business through GlomaMind</h3>
      <ul>
        <li>Messages you send to the business on WhatsApp or Telegram, and the replies you receive.</li>
        <li>Your WhatsApp phone number or Telegram user ID, display name and profile name as provided by WhatsApp or Telegram.</li>
        <li>Message timestamps and delivery status.</li>
      </ul>
      <p>We do not ask for, and ask businesses not to collect through GlomaMind, payment card numbers, passwords or sensitive personal data such as health information.</p>

      <h2>3. How we use information</h2>
      <ul>
        <li>To provide our services, including answering customer questions automatically from the business's own knowledge base and showing conversations to the business's staff.</li>
        <li>To respond to enquiries, deliver projects and provide support.</li>
        <li>To keep accounts and systems secure, prevent abuse and spam, and meet legal obligations.</li>
        <li>To measure and improve service quality, using aggregated statistics such as response times.</li>
      </ul>
      <p>We do not sell personal data, and we do not use customers' WhatsApp or Telegram messages for advertising.</p>

      <h2>4. WhatsApp, Meta and automated replies</h2>
      <p>
        GlomaMind connects to WhatsApp through the WhatsApp Business Platform provided by Meta Platforms, Inc. Messages sent
        to a business are delivered to us by WhatsApp so that GlomaMind can reply. Replies may be generated automatically by
        AI using only the information that business provided, and a human from the business can take over the conversation
        at any time. You can ask to talk to a person in the chat. Meta's own processing of WhatsApp data is described in the{' '}
        <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">WhatsApp Privacy Policy</a>.
      </p>
      <p>Businesses using GlomaMind must have their customers' permission to contact them on WhatsApp and must follow the WhatsApp Business Messaging Policy.</p>

      <h2>5. Who we share information with</h2>
      <p>We share personal data only with service providers that help us run our services, under contracts that protect it:</p>
      <ul>
        <li><strong>Meta Platforms (WhatsApp)</strong> and <strong>Telegram</strong>: to send and receive messages.</li>
        <li><strong>Google (Gemini AI)</strong>: message text and relevant knowledge-base extracts are sent to generate replies; they are not used by us to train AI models.</li>
        <li><strong>Hosting and infrastructure providers</strong>: to store data securely and run our servers.</li>
        <li><strong>Authorities</strong>: only when required by law.</li>
      </ul>
      <p>Some providers may process data outside Sri Lanka. Where this happens, we use providers with appropriate safeguards.</p>

      <h2>6. How long we keep information</h2>
      <ul>
        <li>Conversation messages: for as long as the business keeps its GlomaMind account, or a shorter period the business sets; then deleted.</li>
        <li>Business account data: while the account is active and up to 90 days after it is closed.</li>
        <li>Website enquiries: up to 2 years after our last contact, unless you become a client.</li>
        <li>Security and billing records: as long as required by law.</li>
      </ul>

      <h2>7. How we protect information</h2>
      <p>
        We use encrypted connections (HTTPS), encryption of channel credentials, hashed passwords, role-based access for
        business staff, separation of each business's data, access logs and regular backups. No system is completely secure,
        but we work to protect your data and will notify affected parties of serious breaches as required by law.
      </p>

      <h2>8. Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal data, to stop processing it, or to object to how it is used.
        To delete your data, follow the steps on our <TransitionLink to="/data-deletion">Data Deletion</TransitionLink> page. If you
        messaged a business through GlomaMind, you can also contact that business directly. We respond within 30 days.
      </p>

      <h2>9. Children</h2>
      <p>Our services are not directed to children under 16, and we do not knowingly collect their personal data.</p>

      <h2>10. Changes to this policy</h2>
      <p>We may update this policy. The date at the top shows the latest version; significant changes will be announced on this page.</p>
    </LegalPage>
  );
}
