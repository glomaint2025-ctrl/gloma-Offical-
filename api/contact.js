// Vercel serverless function — keeps the Telegram bot token server-side only.
// The client (src/pages/Contact.jsx) posts the form fields here instead of
// calling the Telegram API directly, so the token never reaches the browser bundle.
import { db } from './_lib/db.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, service, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    await db.ref('leads').push({
      name,
      email,
      phone: phone || null,
      service: service || null,
      message,
      status: 'new',
      created_at: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Failed to save lead:', err);
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn('Telegram credentials are not set on the server');
    return res.status(200).json({ ok: true, notified: false });
  }

  const text = `📬 *New Website Lead*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone || 'N/A'}\n*Project Type:* ${service || 'N/A'}\n\n*Message:*\n${message}`;

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    });

    if (!telegramRes.ok) {
      const errBody = await telegramRes.text();
      console.error('Telegram API error:', errBody);
      return res.status(200).json({ ok: true, notified: false });
    }

    return res.status(200).json({ ok: true, notified: true });
  } catch (err) {
    console.error('Failed to reach Telegram:', err);
    return res.status(200).json({ ok: true, notified: false });
  }
}
