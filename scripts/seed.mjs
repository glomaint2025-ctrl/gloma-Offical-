// One-time seed: populates the works/reviews/services Realtime Database refs
// from the site's original hardcoded content, so the public pages don't go
// blank after switching to the database-backed admin panel. Run once after
// Firebase credentials are set:
//   node scripts/seed.mjs
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

const db = getDatabase();

const WORKS = [
  { category: 'web', cat_label: 'Web Development', title: 'Magic Mirror Art', link: 'https://magic-mirror-art.lovable.app' },
  { category: 'web', cat_label: 'Web Development', title: 'Renua Medspa', link: 'https://renuamedspa.com/' },
  { category: 'web', cat_label: 'Web Development', title: 'Novalys Capital', link: 'https://novalyscapital.ca/' },
  { category: 'branding', cat_label: 'Branding', title: 'Pettah Mall', link: 'https://pettahmall.com/' },
  { category: 'branding', cat_label: 'Branding', title: 'Biz Online', link: 'https://www.bizonline.lk/' },
  { category: 'branding', cat_label: 'Branding', title: 'Smart Time', link: 'https://smarttime.lk/' },
  { category: 'social', cat_label: 'Social Media', title: "Russel's Tea Services and Catering", link: 'https://www.facebook.com/russelscatering', img: '/assets/russels-catering.png' },
  { category: 'social', cat_label: 'Social Media', title: "Russel's Dimbula Tea", link: 'https://www.facebook.com/profile.php?id=61589278528562', img: '/assets/russels-dimbula-tea.jpg' },
  { category: 'social', cat_label: 'Social Media', title: 'Russel Francis Perera', link: 'https://www.facebook.com/profile.php?id=61586921127253', img: '/assets/russel-perera.jpg' },
  { category: 'social', cat_label: 'Social Media', title: 'Premasiri Gamage Consultant', link: 'https://www.facebook.com/profile.php?id=61577673075763', img: '/assets/premasiri-gamage.png' },
];

const REVIEWS = [
  { q: 'Gloma International transformed our online presence. Their creativity and professionalism are unmatched.', name: 'Amina Yusuf', role: 'Founder, Velosea' },
  { q: 'The team delivered a stunning app experience. Communication was smooth from start to finish.', name: 'David Okoro', role: 'CEO, Groceria' },
  { q: 'Highly recommended. They understand branding and how it connects with an audience.', name: 'Sara Bello', role: 'Marketing Lead, Zenara' },
  { q: 'Our social channels finally feel consistent and on-brand. Engagement has nearly doubled since we started.', name: 'Michael Chen', role: 'Founder, Fitverse' },
  { q: 'Their IT support has been rock solid. Fast response times and they actually explain things clearly.', name: 'Lara Mensah', role: 'Ops Manager, Summit Logistics' },
  { q: 'From packaging to launch campaign, Gloma nailed the whole brand rollout. Couldn\'t be happier.', name: 'Ryan Castillo', role: 'Co-Founder, Revise' },
  { q: 'They redesigned our website in three weeks and conversions jumped almost immediately. Worth every rupee.', name: 'Nadia Perera', role: 'Director, Ceylon Bloom' },
  { q: 'Professional, punctual and genuinely invested in our growth. It feels like an in-house team.', name: 'Tom Becker', role: 'GM, Harbourline Foods' },
  { q: 'The ad campaigns they run for us consistently outperform anything we tried before. Clear reporting too.', name: 'Ishara Fernando', role: 'Owner, Lumen Interiors' },
  { q: 'Great eye for detail. Our brand finally looks the way we always imagined it.', name: 'Priya Raman', role: 'Founder, Kindred Kids' },
  { q: 'Fast, friendly and full of ideas. Every meeting ends with something actionable.', name: 'Jonas Weber', role: 'CMO, Trailhead Gear' },
  { q: 'They took over our video content and views tripled in two months. The strategy just works.', name: 'Aisha Khan', role: 'Creator, DailyBite' },
];

const SERVICES = [
  { title: 'Web Development', text: 'Custom, responsive websites and web apps engineered for speed, SEO, and conversions — from landing pages to full platforms.', items: ['Business & e-commerce websites', 'Custom web applications', 'Website maintenance & support', 'Speed & SEO optimization'], icon_key: 'web' },
  { title: 'Social Media Handling', text: 'End-to-end management of your social channels — strategy, content calendars, posting, and community engagement.', items: ['Platform strategy & growth', 'Content scheduling & posting', 'Community management', 'Performance reporting'], icon_key: 'social' },
  { title: 'Content Creation', text: 'Scroll-stopping graphics, video, photography and copywriting tailored to every platform and audience.', items: ['Graphic design & video editing', 'Copywriting & captions', 'Photography direction', 'Campaign content kits'], icon_key: 'content' },
  { title: 'IT Solutions', text: 'Dependable technical infrastructure, systems setup, and support to keep your business running smoothly.', items: ['Network & systems setup', 'Cloud & infrastructure support', 'Technical consulting', 'Ongoing IT support'], icon_key: 'it' },
  { title: 'Advertising & Branding', text: 'Brand identities and ad campaigns built to make a lasting impression and drive measurable results.', items: ['Brand identity & guidelines', 'Logo & visual systems', 'Paid ad campaigns', 'Market positioning'], icon_key: 'branding' },
  { title: 'Mobile Apps', text: 'Native and cross-platform mobile applications designed for performance, usability, and scale.', items: ['iOS & Android development', 'Cross-platform apps', 'UI/UX for mobile', 'App maintenance & updates'], icon_key: 'mobile' },
];

async function seed() {
  const worksUpdates = {};
  WORKS.forEach((w, i) => {
    const key = db.ref('works').push().key;
    worksUpdates[key] = {
      category: w.category,
      cat_label: w.cat_label,
      title: w.title,
      link: w.link || null,
      img: w.img || null,
      sort_order: i,
    };
  });
  await db.ref('works').update(worksUpdates);

  const reviewsUpdates = {};
  REVIEWS.forEach((r, i) => {
    const key = db.ref('reviews').push().key;
    reviewsUpdates[key] = { quote: r.q, name: r.name, role: r.role, sort_order: i };
  });
  await db.ref('reviews').update(reviewsUpdates);

  const servicesUpdates = {};
  SERVICES.forEach((s, i) => {
    const key = db.ref('services').push().key;
    servicesUpdates[key] = { title: s.title, text: s.text, items: s.items, icon_key: s.icon_key, sort_order: i };
  });
  await db.ref('services').update(servicesUpdates);

  console.log(`Seeded ${WORKS.length} works, ${REVIEWS.length} reviews, ${SERVICES.length} services.`);
}

seed()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => {
    db.goOffline();
    process.exit(process.exitCode || 0);
  });
