import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const devApiPlugin = () => ({
  name: 'dev-api-mock',
  configureServer(server) {
    server.middlewares.use((req, res, next) => {
      if (!req.url || !req.url.startsWith('/api/')) return next();

      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');

      if (req.url === '/api/services') {
        res.end(JSON.stringify({
          services: [
            { id: '1', title: 'Web Development', text: 'Custom, responsive websites and web apps engineered for speed, SEO, and conversions — from landing pages to full platforms.', items: ['Business & e-commerce websites', 'Custom web applications', 'Website maintenance & support', 'Speed & SEO optimization'], icon_key: 'web', sort_order: 0 },
            { id: '2', title: 'Social Media Handling', text: 'End-to-end management of your social channels — strategy, content calendars, posting, and community engagement.', items: ['Platform strategy & growth', 'Content scheduling & posting', 'Community management', 'Performance reporting'], icon_key: 'social', sort_order: 1 },
            { id: '3', title: 'Content Creation', text: 'Scroll-stopping graphics, video, photography and copywriting tailored to every platform and audience.', items: ['Graphic design & video editing', 'Copywriting & captions', 'Photography direction', 'Campaign content kits'], icon_key: 'content', sort_order: 2 },
            { id: '4', title: 'IT Solutions', text: 'Dependable technical infrastructure, systems setup, and support to keep your business running smoothly.', items: ['Network & systems setup', 'Cloud & infrastructure support', 'Technical consulting', 'Ongoing IT support'], icon_key: 'it', sort_order: 3 },
            { id: '5', title: 'Advertising & Branding', text: 'Brand identities and ad campaigns built to make a lasting impression and drive measurable results.', items: ['Brand identity & guidelines', 'Logo & visual systems', 'Paid ad campaigns', 'Market positioning'], icon_key: 'branding', sort_order: 4 },
            { id: '6', title: 'Mobile Apps', text: 'Native and cross-platform mobile applications designed for performance, usability, and scale.', items: ['iOS & Android development', 'Cross-platform apps', 'UI/UX for mobile', 'App maintenance & updates'], icon_key: 'mobile', sort_order: 5 },
          ]
        }));
        return;
      }

      if (req.url === '/api/works') {
        res.end(JSON.stringify({
          works: [
            { id: '1', category: 'web', cat_label: 'Web Development', title: 'Magic Mirror Art', link: 'https://magic-mirror-art.lovable.app', sort_order: 0 },
            { id: '2', category: 'web', cat_label: 'Web Development', title: 'Renua Medspa', link: 'https://renuamedspa.com/', sort_order: 1 },
            { id: '3', category: 'web', cat_label: 'Web Development', title: 'Novalys Capital', link: 'https://novalyscapital.ca/', sort_order: 2 },
            { id: '4', category: 'branding', cat_label: 'Branding', title: 'Pettah Mall', link: 'https://pettahmall.com/', sort_order: 3 },
            { id: '5', category: 'branding', cat_label: 'Branding', title: 'Biz Online', link: 'https://www.bizonline.lk/', sort_order: 4 },
            { id: '6', category: 'branding', cat_label: 'Branding', title: 'Smart Time', link: 'https://smarttime.lk/', sort_order: 5 },
            { id: '7', category: 'social', cat_label: 'Social Media', title: "Russel's Tea Services and Catering", link: 'https://www.facebook.com/russelscatering', img: '/assets/russels-catering.png', sort_order: 6 },
          ]
        }));
        return;
      }

      if (req.url === '/api/reviews') {
        res.end(JSON.stringify({
          reviews: [
            { id: '1', quote: 'Gloma International transformed our online presence. Their creativity and professionalism are unmatched.', name: 'Amina Yusuf', role: 'Founder, Velosea', sort_order: 0 },
            { id: '2', quote: 'The team delivered a stunning app experience. Communication was smooth from start to finish.', name: 'David Okoro', role: 'CEO, Groceria', sort_order: 1 },
            { id: '3', quote: 'Highly recommended. They understand branding and how it connects with an audience.', name: 'Sara Bello', role: 'Marketing Lead, Zenara', sort_order: 2 },
          ]
        }));
        return;
      }

      if (req.url === '/api/contact') {
        res.end(JSON.stringify({ ok: true, notified: false }));
        return;
      }

      if (req.url.startsWith('/api/admin/leads')) {
        res.end(JSON.stringify({ leads: [] }));
        return;
      }

      if (req.url === '/api/admin/login') {
        res.end(JSON.stringify({ ok: true, token: 'local-dev-token', user: { username: 'Glomaint' } }));
        return;
      }

      if (req.url === '/api/admin/verify') {
        res.end(JSON.stringify({ authenticated: true, user: { username: 'Glomaint' } }));
        return;
      }

      if (req.url === '/api/admin/logout') {
        res.end(JSON.stringify({ ok: true }));
        return;
      }

      next();
    });
  },
});

export default defineConfig({
  plugins: [react(), devApiPlugin()],
  server: {
    port: 8880,
  },
});

