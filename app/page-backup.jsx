"use client";
// HouseOfBakers.jsx
// Premium Artisan Bakery — React + Tailwind CSS
// Admin Password: 2026
// Features: Premium animations, glassmorphism, masonry gallery, animated counters,
// lightbox, sticky checkout, particle background, lazy-loaded images, accessibility

import { useState, useEffect, useRef, useMemo, useCallback } from "react";

const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Outfit:wght@200;300;400;500;600;700&display=swap";

// ─── Branch Data (House Of Bakers Only) ─────────────────────────────────────
const BRANCHES = [
  { id: 1, name: "Jubilee Hills", addr: "Road No. 36, Opp. KBR Park Gate, Jubilee Hills, Hyderabad", ph: "+91 98765 43210", wa: "919876543210", maps: "https://maps.google.com/?q=Jubilee+Hills+Hyderabad", timing: "8:00 AM – 11:30 PM", badge: "Flagship" },
  { id: 2, name: "Banjara Hills", addr: "Road No. 12, Near L V Prasad Eye Hospital, Banjara Hills", ph: "+91 98765 43211", wa: "919876543211", maps: "https://maps.google.com/?q=Banjara+Hills+Hyderabad", timing: "8:00 AM – 12:00 AM", badge: "Premium" },
  { id: 3, name: "Gachibowli", addr: "DLF Cyber City, Opp. Microsoft Campus, Gachibowli", ph: "+91 98765 43212", wa: "919876543212", maps: "https://maps.google.com/?q=Gachibowli+Hyderabad", timing: "7:00 AM – 12:00 AM", badge: "IT Hub" },
  { id: 4, name: "Kondapur", addr: "Botanical Garden Road, Near Hitech City MMTS, Kondapur", ph: "+91 98765 43213", wa: "919876543213", maps: "https://maps.google.com/?q=Kondapur+Hyderabad", timing: "8:00 AM – 11:00 PM", badge: "Express" },
];

// ─── Product Data (House Of Bakers Only) ────────────────────────────────────
const INIT_PRODUCTS = [
  { id: 1, name: "Signature Chocolate Truffle", cat: "Signature Cakes", price: 899, discount: 15, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", tag: "Bestseller", desc: "Triple-layer Belgian chocolate ganache with hand-tempered shards", tc: "#C8A876" },
  { id: 2, name: "Royal Red Velvet", cat: "Signature Cakes", price: 949, discount: 0, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80", tag: "Chef Special", desc: "Buttermilk velvet sponge with mascarpone cream cheese frosting", tc: "#C94B4B" },
  { id: 3, name: "Saffron Pistachio", cat: "Signature Cakes", price: 1199, discount: 0, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", tag: "Chef Special", desc: "Persian saffron sponge, Persian pistachio cream, gold leaf finish", tc: "#D4AF6E" },
  { id: 4, name: "Classic Black Forest", cat: "Signature Cakes", price: 699, discount: 10, img: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&q=80", tag: "Bestseller", desc: "Dark chocolate sponge, kirsch-soaked cherries, vanilla chantilly", tc: "#8B4513" },
  { id: 5, name: "Butter Croissant", cat: "Fresh Pastries", price: 120, discount: 0, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80", tag: "Fresh Today", desc: "72-layer French butter croissant, baked every morning at 6 AM", tc: "#D4AF6E" },
  { id: 6, name: "Pain au Chocolat", cat: "Fresh Pastries", price: 140, discount: 0, img: "https://images.unsplash.com/photo-1623334044303-241021148842?w=600&q=80", tag: "Fresh Today", desc: "Dark chocolate batons wrapped in laminated brioche dough", tc: "#8B4513" },
  { id: 7, name: "Almond Danish", cat: "Fresh Pastries", price: 160, discount: 0, img: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&q=80", tag: "Chef Special", desc: "Flaky pastry filled with frangipane and topped with toasted almonds", tc: "#D4AF6E" },
  { id: 8, name: "Cinnamon Kouign-Amann", cat: "Fresh Pastries", price: 180, discount: 0, img: "https://images.unsplash.com/photo-1568827999250-3f6afff96e66?w=600&q=80", tag: "New", desc: "Caramelized Breton pastry with Vietnamese cinnamon sugar crust", tc: "#B8943A" },
  { id: 9, name: "Sourdough Country Loaf", cat: "Bakery Specials", price: 280, discount: 0, img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80", tag: "Fresh Today", desc: "48-hour fermented sourdough with a crackling crust and open crumb", tc: "#B8943A" },
  { id: 10, name: "Olive & Rosemary Focaccia", cat: "Bakery Specials", price: 320, discount: 0, img: "https://images.unsplash.com/photo-1568471173242-461f0a730452?w=600&q=80", tag: "Chef Special", desc: "Ligurian-style focaccia with Kalamata olives and fresh rosemary", tc: "#7A8C6E" },
  { id: 11, name: "Multigrain Seeded Loaf", cat: "Bakery Specials", price: 240, discount: 0, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&q=80", tag: "Bestseller", desc: "12-grain loaf topped with flax, sunflower, pumpkin and sesame seeds", tc: "#B8943A" },
  { id: 12, name: "Garlic Pull-Apart Bread", cat: "Bakery Specials", price: 220, discount: 0, img: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=600&q=80", tag: "Fresh Today", desc: "Soft dinner rolls layered with roasted garlic butter and parsley", tc: "#D4AF6E" },
  { id: 13, name: "Margherita D.O.P", cat: "Artisan Pizza", price: 449, discount: 0, img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80", tag: "Chef Special", desc: "San Marzano tomato, Fior di Latte mozzarella, fresh basil, EVOO", tc: "#C94B4B" },
  { id: 14, name: "Truffle Funghi", cat: "Artisan Pizza", price: 599, discount: 0, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", tag: "Bestseller", desc: "Wild mushroom medley, mozzarella, truffle oil, fresh thyme", tc: "#8B4513" },
  { id: 15, name: "Prosciutto e Rucola", cat: "Artisan Pizza", price: 649, discount: 0, img: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=600&q=80", tag: "New", desc: "Parma prosciutto, fresh arugula, shaved Parmigiano, aged balsamic", tc: "#C94B4B" },
  { id: 16, name: "Quattro Formaggi", cat: "Artisan Pizza", price: 549, discount: 0, img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&q=80", tag: "Chef Special", desc: "Mozzarella, gorgonzola, taleggio, Parmigiano-Reggiano blend", tc: "#D4AF6E" },
  { id: 17, name: "Crème Brûlée", cat: "Premium Desserts", price: 220, discount: 0, img: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=600&q=80", tag: "Chef Special", desc: "Madagascar vanilla custard with caramelized demerara sugar crust", tc: "#D4AF6E" },
  { id: 18, name: "Tiramisu al Caffè", cat: "Premium Desserts", price: 280, discount: 0, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80", tag: "Bestseller", desc: "Espresso-soaked savoiardi, mascarpone cream, raw cocoa dusting", tc: "#8B4513" },
  { id: 19, name: "Panna Cotta & Berries", cat: "Premium Desserts", price: 240, discount: 0, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", tag: "Fresh Today", desc: "Vanilla bean panna cotta with macerated forest berries", tc: "#C94B4B" },
  { id: 20, name: "Dark Chocolate Fondant", cat: "Premium Desserts", price: 320, discount: 0, img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80", tag: "Chef Special", desc: "70% Valrhona chocolate fondant with molten center, vanilla gelato", tc: "#C8A876" },
  { id: 21, name: "Paris-Brest", cat: "Premium Desserts", price: 260, discount: 0, img: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&q=80", tag: "New", desc: "Choux pastry ring filled with praline mousseline cream", tc: "#D4AF6E" },
  { id: 22, name: "Lemon Tart", cat: "Premium Desserts", price: 230, discount: 0, img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=600&q=80", tag: "Fresh Today", desc: "Sicilian lemon curd in a sablé breton crust, torched Italian meringue", tc: "#D4AF6E" },
];

const CATEGORIES = ["All", "Signature Cakes", "Fresh Pastries", "Bakery Specials", "Artisan Pizza", "Premium Desserts"];
const BESTSELLER_IDS = [1, 4, 5, 11, 14, 18];

const GALLERY_IMGS = [
  { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&q=80", h: 2 },
  { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80", h: 1 },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", h: 2 },
  { src: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&q=80", h: 1 },
  { src: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=800&q=80", h: 1 },
  { src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", h: 2 },
  { src: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80", h: 1 },
  { src: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=800&q=80", h: 2 },
  { src: "https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=800&q=80", h: 1 },
  { src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&q=80", h: 1 },
];

const FAQS = [
  { q: "Are your items baked fresh to order?", a: "Yes — every cake, pastry and pizza is handcrafted within minutes of receiving your order. We never sell pre-made stock, which guarantees peak freshness and quality with every bite." },
  { q: "How does ordering work?", a: "Browse the menu, add your selections to the cart, then complete checkout. Your full order with delivery details is sent directly to us on WhatsApp — our team confirms within minutes and your items begin preparation." },
  { q: "Do you offer custom celebration cakes?", a: "Absolutely. We accept any theme, design, or message. For elaborate custom creations, please contact us on WhatsApp at least 48 hours in advance so our pastry chefs can plan your cake perfectly." },
  { q: "What is the delivery policy?", a: "Orders above ₹500 qualify for complimentary delivery across all our branches. For orders below ₹500, a flat ₹50 delivery charge applies within a 5 km radius of each branch." },
  { q: "Which areas do you serve?", a: "We operate from four premium Hyderabad locations — Jubilee Hills, Banjara Hills, Gachibowli and Kondapur — and deliver across the city from each branch for maximum freshness." },
  { q: "Can I modify or cancel an order?", a: "Once confirmed, please reach out via WhatsApp immediately. We accommodate changes up until preparation begins, which typically happens within minutes of order confirmation." },
];

const safeGet = (key, fallback) => {
  try { if (typeof window === "undefined") return fallback; const v = window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const safeSave = (key, val) => {
  try { if (typeof window !== "undefined") window.localStorage.setItem(key, JSON.stringify(val)); } catch {}
};
const effectivePrice = (p) => p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
const deliveryCharge = (sub) => (sub >= 500 ? 0 : 50);

const WA = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CloseIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width={size} height={size} aria-hidden="true">
    <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" />
  </svg>
);

const GLOBAL_CSS = `
  @import url('${FONT_LINK}');
  :root { --gold: #D4AF6E; --gold-light: #E8C895; --gold-dark: #B8943A; --ink: #0D0D0B; --cream: #FAF7F2; }
  .hob-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
  .hob-sans { font-family: 'Outfit', system-ui, sans-serif; }
  .hob-root { font-family: 'Outfit', system-ui, sans-serif; }
  @keyframes hob-float-a { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(2deg)} }
  @keyframes hob-float-b { 0%,100%{transform:translateY(-8px) rotate(-1deg)} 50%{transform:translateY(12px) rotate(2deg)} }
  @keyframes hob-float-c { 0%,100%{transform:translateY(6px) rotate(1deg)} 50%{transform:translateY(-14px) rotate(-2deg)} }
  @keyframes hob-float-d { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-22px) rotate(-3deg)} }
  @keyframes hob-fade-up { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hob-fade-in { from{opacity:0} to{opacity:1} }
  @keyframes hob-slide-right { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes hob-toast-in { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hob-load-line { from{width:0} to{width:200px} }
  @keyframes hob-pulse { 0%,100%{opacity:.6;transform:scale(1)} 50%{opacity:1;transform:scale(1.05)} }
  @keyframes hob-glow { 0%,100%{box-shadow:0 0 20px rgba(212,175,110,.3),0 0 40px rgba(212,175,110,.15)} 50%{box-shadow:0 0 30px rgba(212,175,110,.5),0 0 60px rgba(212,175,110,.25)} }
  @keyframes hob-particle { 0%{transform:translate(0,0) rotate(0);opacity:0} 10%{opacity:.7} 90%{opacity:.7} 100%{transform:translate(var(--tx),var(--ty)) rotate(720deg);opacity:0} }
  .hob-float-a { animation: hob-float-a 7s ease-in-out infinite; }
  .hob-float-b { animation: hob-float-b 8s ease-in-out infinite 1.2s; }
  .hob-float-c { animation: hob-float-c 6s ease-in-out infinite .4s; }
  .hob-float-d { animation: hob-float-d 9s ease-in-out infinite 2s; }
  .hob-fade-up { animation: hob-fade-up .9s cubic-bezier(.16,1,.3,1) both; }
  .hob-fade-in { animation: hob-fade-in .6s ease both; }
  .hob-slide-right { animation: hob-slide-right .45s cubic-bezier(.16,1,.3,1) both; }
  .hob-load-line { animation: hob-load-line 2s ease forwards .4s; }
  .hob-toast { animation: hob-toast-in .35s ease both; }
  .hob-glow { animation: hob-glow 3s ease-in-out infinite; }
  .hob-pulse { animation: hob-pulse 2.5s ease-in-out infinite; }
  .hob-reveal { opacity:0; transform:translateY(28px); transition: opacity .9s ease, transform .9s ease; }
  .hob-reveal.visible { opacity:1; transform:translateY(0); }
  .hob-card:hover .hob-zoom { transform: scale(1.08); }
  .hob-zoom { transition: transform .8s cubic-bezier(.16,1,.3,1); }
  .hob-lift { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease; }
  .hob-lift:hover { transform: translateY(-6px); }
  .hob-glass { background: rgba(250,247,242,.04); backdrop-filter: blur(20px) saturate(180%); -webkit-backdrop-filter: blur(20px) saturate(180%); border: 1px solid rgba(212,175,110,.12); }
  .hob-glass-dark { background: rgba(13,13,11,.55); backdrop-filter: blur(24px) saturate(180%); -webkit-backdrop-filter: blur(24px) saturate(180%); border: 1px solid rgba(212,175,110,.08); }
  .hob-btn-transition { transition: all .3s cubic-bezier(.16,1,.3,1); }
  button:focus-visible, input:focus-visible, textarea:focus-visible, select:focus-visible, a:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
  .hob-cart-item:not(:last-child) { border-bottom: 1px solid rgba(212,175,110,.08); }
  .hob-gallery-img { transition: transform .6s cubic-bezier(.16,1,.3,1), filter .4s ease; }
  .hob-gallery-item:hover .hob-gallery-img { transform: scale(1.07); filter: brightness(1); }
  .hob-qty-btn { transition: all .2s ease; }
  .hob-qty-btn:hover { background: var(--gold); color: var(--ink); transform: scale(1.1); }
  .hob-qty-btn:active { transform: scale(.95); }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: #0D0D0B; }
  ::-webkit-scrollbar-thumb { background: linear-gradient(var(--gold-dark), var(--gold)); border-radius: 99px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--gold); }
  .hob-particle { position: absolute; border-radius: 50%; pointer-events: none; animation: hob-particle linear infinite; }
  .hob-gradient-text { background: linear-gradient(135deg, #E8C895 0%, #D4AF6E 50%, #B8943A 100%); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; color: transparent; }
  ::selection { background: rgba(212,175,110,.3); color: var(--cream); }
  @media (max-width: 768px) {
    .hob-hero-grid { grid-template-columns: 1fr !important; }
    .hob-coll-grid { grid-template-columns: 1fr !important; }
    .hob-why-grid { grid-template-columns: 1fr !important; }
    .hob-branch-grid { grid-template-columns: 1fr !important; }
    .hob-stats-grid { grid-template-columns: repeat(2,1fr) !important; }
    .hob-steps-grid { grid-template-columns: repeat(2,1fr) !important; }
    .hob-gallery-grid { grid-template-columns: repeat(2,1fr) !important; }
    .hob-footer-grid { grid-template-columns: 1fr 1fr !important; }
    .hob-hero-floating { display: none !important; }
  }
  @media (max-width: 480px) {
    .hob-section { padding: 60px 20px !important; }
    .hob-nav { padding: 0 20px !important; }
    .hob-nav-links { display: none !important; }
    .hob-stats-grid { grid-template-columns: 1fr !important; }
    .hob-steps-grid { grid-template-columns: 1fr !important; }
    .hob-footer-grid { grid-template-columns: 1fr !important; }
    .hob-gallery-grid { grid-template-columns: 1fr !important; }
    .hob-products-grid { grid-template-columns: repeat(auto-fill,minmax(160px,1fr)) !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
  }
`;

const Counter = ({ end, duration = 1800, suffix = "", prefix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) {
        setStarted(true);
        const startTime = performance.now();
        const tick = (now) => {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * end));
          if (progress < 1) requestAnimationFrame(tick);
          else setCount(end);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, started]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const Particles = ({ count = 20 }) => {
  const particles = useMemo(() => Array.from({ length: count }).map((_, i) => ({
    id: i, left: Math.random() * 100, top: Math.random() * 100,
    size: Math.random() * 4 + 2, duration: Math.random() * 12 + 14,
    delay: Math.random() * 8, tx: (Math.random() - 0.5) * 200,
    ty: -Math.random() * 400 - 200, opacity: Math.random() * 0.5 + 0.2,
  })), [count]);
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 1 }}>
      {particles.map((p) => (
        <span key={p.id} className="hob-particle" style={{
          left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size,
          background: "radial-gradient(circle, #D4AF6E 0%, transparent 70%)",
          animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s`,
          opacity: p.opacity, "--tx": `${p.tx}px`, "--ty": `${p.ty}px`,
        }} />
      ))}
    </div>
  );
};

const Lightbox = ({ src, onClose }) => {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handler); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} role="dialog" aria-modal="true" style={{ position: "fixed", inset: 0, background: "rgba(13,13,11,.95)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, cursor: "zoom-out", animation: "hob-fade-in .3s ease both" }}>
      <button onClick={onClose} aria-label="Close" style={{ position: "absolute", top: 24, right: 24, background: "rgba(212,175,110,.1)", border: "1px solid rgba(212,175,110,.2)", color: "#FAF7F2", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <CloseIcon size={20} />
      </button>
      <img src={src} alt="Gallery preview" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", boxShadow: "0 40px 120px rgba(0,0,0,.6)" }} />
    </div>
  );
};

export default function HouseOfBakers() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuCat, setMenuCat] = useState("All");
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", branch: "" });
  const [toast, setToast] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [lightboxSrc, setLightboxSrc] = useState(null);
  const [adminState, setAdminState] = useState({ loginOpen: false, panelOpen: false, pwd: "", editing: null, ef: {} });

  useEffect(() => {
    setMounted(true);
    const savedProds = safeGet("hob_products_v3", []);
    const savedCart = safeGet("hob_cart_v3", []);
    if (savedProds.length) setProducts(savedProds);
    if (savedCart.length) setCart(savedCart);
    const t = setTimeout(() => setLoading(false), 2400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => { if (mounted) safeSave("hob_products_v3", products); }, [products, mounted]);
  useEffect(() => { if (mounted) safeSave("hob_cart_v3", cart); }, [cart, mounted]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      document.querySelectorAll(".hob-reveal").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight - 60) el.classList.add("visible");
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    setTimeout(onScroll, 300);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  const toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2800);
  }, []);

  const { cartSub, cartDel, cartTot, cartCount } = useMemo(() => {
    let sub = 0, count = 0;
    cart.forEach((i) => { const p = products.find((x) => x.id === i.id); if (p) { sub += effectivePrice(p) * i.qty; count += i.qty; } });
    const del = deliveryCharge(sub);
    return { cartSub: sub, cartDel: del, cartTot: sub + del, cartCount: count };
  }, [cart, products]);

  const addToCart = (id) => {
    setCart((prev) => { const ex = prev.find((i) => i.id === id); return ex ? prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)) : [...prev, { id, qty: 1 }]; });
    const p = products.find((x) => x.id === id);
    if (p) showToast(`${p.name} added to cart`);
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i.id !== id));
  const changeQty = (id, d) => setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i)).filter((i) => i.qty > 0));

  const sendWAOrder = () => {
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim() || !customer.branch) { showToast("Please fill all required fields"); return; }
    const orderLines = cart.map((it, i) => { const p = products.find((x) => x.id === it.id); return p ? `${i + 1}. *${p.name}* × ${it.qty} — ₹${effectivePrice(p) * it.qty}` : ""; }).filter(Boolean).join("\n");
    const msg = `*HOUSE OF BAKERS — New Order*\n\n*Customer:* ${customer.name}\n*Phone:* ${customer.phone}\n*Branch:* House of Bakers — ${customer.branch}\n*Address:* ${customer.address}\n\n*Order Details:*\n${orderLines}\n\n━━━━━━━━━━━━━━━\n*Subtotal:* ₹${cartSub}\n*Delivery:* ${cartDel === 0 ? "FREE ✅" : "₹" + cartDel}\n*Total:* ₹${cartTot}\n━━━━━━━━━━━━━━━\n\nPlease confirm my order at your earliest convenience. Thank you!`;
    window.open(`https://wa.me/${BRANCHES[0].wa}?text=${encodeURIComponent(msg)}`, "_blank");
    showToast("Order sent to WhatsApp");
    setCart([]); setCheckoutOpen(false); setCustomer({ name: "", phone: "", address: "", branch: "" });
  };

  const tryAdminLogin = () => {
    if (adminState.pwd === "2026") {
      setAdminState((a) => ({ ...a, loginOpen: false, panelOpen: true, pwd: "" }));
      showToast("Welcome, owner");
    } else { showToast("Incorrect password"); setAdminState((a) => ({ ...a, pwd: "" })); }
  };

  const saveAdminEdit = (id) => {
    const ef = adminState.ef;
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, ...ef, price: Number(ef.price ?? p.price), discount: Number(ef.discount ?? 0) } : p));
    setAdminState((a) => ({ ...a, editing: null, ef: {} }));
    showToast("Product updated");
  };

  const adminDelete = (id) => { if (!window.confirm("Delete this product permanently?")) return; setProducts((prev) => prev.filter((p) => p.id !== id)); setCart((prev) => prev.filter((i) => i.id !== id)); showToast("Product deleted"); };

  const adminAddProduct = () => {
    const n = { id: Date.now(), name: "New Artisan Item", cat: "Signature Cakes", price: 399, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", tag: "New", desc: "Freshly added — update the description to showcase this item.", tc: "#D4AF6E" };
    setProducts((prev) => [...prev, n]);
    setAdminState((a) => ({ ...a, editing: n.id, ef: { ...n } }));
  };

  const filteredProducts = menuCat === "All" ? products : products.filter((p) => p.cat === menuCat);
  const bestSellers = BESTSELLER_IDS.map((id) => products.find((p) => p.id === id)).filter(Boolean);

  if (!mounted) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div className="hob-root" style={{ background: "#0D0D0B", color: "#FAF7F2", minHeight: "100vh", overflowX: "hidden", fontWeight: 300 }}>
        {loading && (
          <div style={{ position: "fixed", inset: 0, background: "#0D0D0B", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 24 }}>
            <div className="hob-serif hob-fade-up" style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 400, letterSpacing: "0.32em", textTransform: "uppercase", color: "#FAF7F2" }}>House of Bakers</div>
            <div className="hob-load-line" style={{ height: 1, background: "linear-gradient(90deg, transparent, #D4AF6E, transparent)", width: 0 }} />
            <div className="hob-fade-up" style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF6E", animationDelay: "1.4s", opacity: 0 }}>Artisan Bakery · Hyderabad</div>
          </div>
        )}

        <nav className="hob-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 40px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all .4s", background: scrolled ? "rgba(13,13,11,.88)" : "transparent", backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none", WebkitBackdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none", borderBottom: scrolled ? "1px solid rgba(212,175,110,.08)" : "1px solid transparent" }}>
          <div className="hob-serif" style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FAF7F2", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            House <span className="hob-gradient-text">of</span> Bakers
          </div>
          <div className="hob-nav-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {["Collections", "Menu", "Gallery", "Branches", "About", "FAQ"].map((item) => (
              <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} className="hob-btn-transition" style={{ background: "none", border: "none", color: "rgba(250,247,242,.55)", fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 400, padding: "8px 0" }} onMouseEnter={(e) => e.currentTarget.style.color = "#D4AF6E"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(250,247,242,.55)"}>
                {item}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={() => setCartOpen(true)} className="hob-btn-transition" aria-label="Open cart" style={{ background: "rgba(212,175,110,.1)", border: "1px solid rgba(212,175,110,.3)", color: "#D4AF6E", padding: "0.45rem 1.1rem", borderRadius: 99, fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "Outfit, sans-serif", fontWeight: 500, backdropFilter: "blur(10px)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.18)"; e.currentTarget.style.borderColor = "rgba(212,175,110,.5)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.1)"; e.currentTarget.style.borderColor = "rgba(212,175,110,.3)"; }}>
              <span>Cart</span>
              <span style={{ background: "#D4AF6E", color: "#0D0D0B", borderRadius: 99, padding: "1px 7px", fontSize: "0.62rem", fontWeight: 700, minWidth: 18, textAlign: "center" }}>{cartCount}</span>
            </button>
            <button onClick={() => setAdminState((a) => ({ ...a, loginOpen: true }))} aria-label="Owner login" style={{ background: "transparent", border: "1px solid rgba(212,175,110,.15)", color: "rgba(250,247,242,.3)", width: 38, height: 38, borderRadius: "50%", fontSize: "0.85rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .25s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.4)"; e.currentTarget.style.color = "#D4AF6E"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.15)"; e.currentTarget.style.color = "rgba(250,247,242,.3)"; }}>🔑</button>
          </div>
        </nav>

        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse at 70% 30%, rgba(212,175,110,.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(184,148,58,.05) 0%, transparent 60%)" }}>
          <Particles count={28} />
          <div className="hob-hero-grid" style={{ maxWidth: 1280, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center", position: "relative", zIndex: 2 }}>
            <div>
              <div className="hob-fade-up" style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 28, display: "flex", alignItems: "center", gap: 14, fontWeight: 500 }}>
                <span style={{ display: "block", width: 32, height: 1, background: "#D4AF6E" }} />
                Artisan Bakery · Est. Hyderabad
              </div>
              <h1 className="hob-serif hob-fade-up" style={{ fontSize: "clamp(3rem,7.5vw,5.8rem)", fontWeight: 300, lineHeight: 1.0, color: "#FAF7F2", marginBottom: 8, animationDelay: "0.15s", letterSpacing: "-0.01em" }}>
                HOUSE
                <br />
                <span className="hob-gradient-text" style={{ fontStyle: "italic", fontWeight: 400 }}>of Bakers</span>
              </h1>
              <div className="hob-fade-up" style={{ fontSize: "clamp(1.05rem,2vw,1.35rem)", fontWeight: 300, color: "#D4AF6E", letterSpacing: "0.04em", marginBottom: 32, animationDelay: "0.25s", fontStyle: "italic" }}>
                Freshly Crafted. Beautifully Baked.
              </div>
              <p className="hob-fade-up" style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(250,247,242,.5)", maxWidth: 460, marginBottom: 48, animationDelay: "0.4s" }}>
                A premium collection of artisan cakes, pastries, breads and desserts — handcrafted to order daily across our four Hyderabad branches. Every bite tells a story.
              </p>
              <div className="hob-fade-up" style={{ display: "flex", gap: 16, flexWrap: "wrap", animationDelay: "0.55s" }}>
                <button onClick={() => { const p = products.find((p) => p.tag === "Bestseller"); if (p) addToCart(p.id); setCartOpen(true); }} className="hob-btn-transition" style={{ background: "linear-gradient(135deg, #E8C895 0%, #D4AF6E 50%, #B8943A 100%)", color: "#0D0D0B", border: "none", padding: "1rem 2rem", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", borderRadius: 99, boxShadow: "0 8px 32px rgba(212,175,110,.3), inset 0 1px 0 rgba(255,255,255,.25)" }} onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(212,175,110,.45), inset 0 1px 0 rgba(255,255,255,.3)"; }} onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(212,175,110,.3), inset 0 1px 0 rgba(255,255,255,.25)"; }}>
                  Order Now
                </button>
                <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })} className="hob-btn-transition" style={{ background: "rgba(212,175,110,.04)", border: "1px solid rgba(212,175,110,.4)", color: "#D4AF6E", padding: "1rem 2rem", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", borderRadius: 99, backdropFilter: "blur(10px)" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.1)"; e.currentTarget.style.borderColor = "#D4AF6E"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.04)"; e.currentTarget.style.borderColor = "rgba(212,175,110,.4)"; }}>
                  Explore Menu
                </button>
                <button onClick={() => document.getElementById("branches")?.scrollIntoView({ behavior: "smooth" })} className="hob-btn-transition" style={{ background: "transparent", border: "1px solid rgba(250,247,242,.15)", color: "rgba(250,247,242,.7)", padding: "1rem 2rem", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", borderRadius: 99 }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(250,247,242,.05)"; e.currentTarget.style.color = "#FAF7F2"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(250,247,242,.7)"; }}>
                  Visit Branches
                </button>
              </div>
            </div>
            <div className="hob-hero-floating" style={{ position: "relative", height: 580 }}>
              {[
                { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80", label: "Signature Truffle", cls: "hob-float-a", style: { width: 290, height: 360, top: 20, right: 40 } },
                { src: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&q=80", label: "Butter Croissant", cls: "hob-float-b", style: { width: 180, height: 220, top: 200, right: 290 } },
                { src: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&q=80", label: "Chocolate Fondant", cls: "hob-float-c", style: { width: 150, height: 180, bottom: 30, right: 110 } },
                { src: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=400&q=80", label: "Artisan Pizza", cls: "hob-float-d", style: { width: 140, height: 170, bottom: 180, right: 320 } },
              ].map((fc) => (
                <div key={fc.label} className={fc.cls} style={{ position: "absolute", overflow: "hidden", boxShadow: "0 30px 80px rgba(0,0,0,.7)", borderRadius: 4, ...fc.style }}>
                  <img src={fc.src} alt={fc.label} loading="eager" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(13,13,11,.95), transparent)", padding: "24px 16px 14px", fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#FAF7F2", fontStyle: "italic" }}>
                    {fc.label}
                  </div>
                </div>
              ))}
              <div aria-hidden="true" style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 420, height: 420, border: "1px solid rgba(212,175,110,.08)", borderRadius: "50%", pointerEvents: "none" }} />
            </div>
          </div>
          <div aria-hidden="true" style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: "rgba(212,175,110,.5)", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3 }}>
            <span>Scroll</span>
            <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #D4AF6E, transparent)", animation: "hob-pulse 2.5s ease-in-out infinite" }} />
          </div>
        </section>

        <div style={{ background: "rgba(212,175,110,.04)", borderTop: "1px solid rgba(212,175,110,.08)", borderBottom: "1px solid rgba(212,175,110,.08)", backdropFilter: "blur(20px)" }}>
          <div className="hob-stats-grid" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[["12000+", "Happy Guests"], ["60+", "Artisan Creations"], ["4", "Premium Branches"], ["15", "Min Avg Prep"]].map(([n, l], i) => (
              <div key={i} style={{ padding: "44px 24px", borderRight: i < 3 ? "1px solid rgba(212,175,110,.08)" : "none", textAlign: "center" }}>
                <div className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 300, lineHeight: 1, marginBottom: 10 }}>
                  <span className="hob-gradient-text"><Counter end={parseInt(n)} suffix={n.includes("+") ? "+" : ""} /></span>
                </div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", fontWeight: 400 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <section id="collections" className="hob-section" style={{ padding: "110px 40px", background: "#0D0D0B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />Curated Offerings</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 18, lineHeight: 1.1 }}>Featured Collections</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4AF6E, transparent)", marginBottom: 64 }} />
            </div>
            <div className="hob-coll-grid hob-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12 }}>
              {[
                { label: "Signature Cakes", sub: "Collection 01", cat: "Signature Cakes", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80" },
                { label: "Fresh Pastries", sub: "Collection 02", cat: "Fresh Pastries", img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80" },
                { label: "Bakery Specials", sub: "Collection 03", cat: "Bakery Specials", img: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&q=80" },
                { label: "Artisan Pizza", sub: "Collection 04", cat: "Artisan Pizza", img: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&q=80" },
                { label: "Premium Desserts", sub: "Collection 05", cat: "Premium Desserts", img: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80" },
              ].map((c) => (
                <div key={c.label} className="hob-card hob-lift" style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "0.78", borderRadius: 4 }} onClick={() => { setMenuCat(c.cat); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>
                  <img className="hob-zoom" src={c.img} alt={c.label} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.55)" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                  <div style={{ position: "absolute", inset: 10, border: "1px solid rgba(212,175,110,.15)", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "28px 22px", background: "linear-gradient(to top, rgba(13,13,11,.95) 0%, transparent 60%)" }}>
                    <div style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 8, fontWeight: 500 }}>{c.sub}</div>
                    <div className="hob-serif" style={{ fontSize: "1.45rem", fontWeight: 400, color: "#FAF7F2", marginBottom: 14, lineHeight: 1.15 }}>{c.label}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#D4AF6E", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500 }}>Explore <span style={{ fontSize: "0.9rem" }}>→</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="hob-section" style={{ padding: "110px 40px", background: "linear-gradient(180deg, #0D0D0B 0%, #14130F 100%)", position: "relative", overflow: "hidden" }}>
          <div aria-hidden="true" style={{ position: "absolute", top: "20%", right: "-10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(212,175,110,.06) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", position: "relative" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />Our Story</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 28, lineHeight: 1.1 }}>Where craft meets<br /><em className="hob-gradient-text" style={{ fontStyle: "italic" }}>quiet luxury.</em></h2>
              <p style={{ fontSize: "0.95rem", color: "rgba(250,247,242,.55)", lineHeight: 1.9, marginBottom: 22, fontWeight: 300 }}>House of Bakers began with a simple belief: every celebration deserves a creation made with intention. Our pastry chefs train in European traditions, blending classical technique with the warmth of Indian hospitality.</p>
              <p style={{ fontSize: "0.95rem", color: "rgba(250,247,242,.55)", lineHeight: 1.9, marginBottom: 32, fontWeight: 300 }}>No pre-made stock. No shortcuts. Just honest, slow craft — and ingredients we'd be proud to share.</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                {[["Belgian Chocolate", "Single-origin Valrhona"], ["French Butter", "AOP Isigny & Bordier"], ["Madagascar Vanilla", "Whole bean infusion"], ["Stone-Milled Flour", "Heritage Italian mills"]].map(([t, s]) => (
                  <div key={t} className="hob-glass" style={{ padding: "20px 18px", borderRadius: 4 }}>
                    <div className="hob-serif" style={{ fontSize: "1rem", color: "#FAF7F2", fontWeight: 500, marginBottom: 4 }}>{t}</div>
                    <div style={{ fontSize: "0.72rem", color: "rgba(250,247,242,.4)", letterSpacing: "0.04em" }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="hob-reveal" style={{ position: "relative", height: 560, borderRadius: 4, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,.5)" }}>
              <img src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=900&q=85" alt="House of Bakers craftsmanship" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.src = "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=900&q=80"; }} />
              <div style={{ position: "absolute", bottom: 24, left: 24, right: 24, padding: 20, background: "rgba(13,13,11,.75)", backdropFilter: "blur(20px)", border: "1px solid rgba(212,175,110,.15)", borderRadius: 4 }}>
                <div className="hob-serif" style={{ fontSize: "1.05rem", color: "#FAF7F2", fontStyle: "italic", marginBottom: 4 }}>"Crafted slowly, served beautifully."</div>
                <div style={{ fontSize: "0.7rem", color: "#D4AF6E", letterSpacing: "0.15em", textTransform: "uppercase" }}>— House of Bakers, since day one</div>
              </div>
            </div>
          </div>
        </section>

        <section className="hob-section" style={{ padding: "110px 40px", background: "#14130F" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />Most Loved</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 18, lineHeight: 1.1 }}>Bestselling Creations</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4AF6E, transparent)", marginBottom: 64 }} />
            </div>
            <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 12, scrollbarWidth: "thin" }}>
              {bestSellers.map((p) => (
                <div key={p.id} className="hob-lift" style={{ minWidth: 280, maxWidth: 280, background: "#1A1916", border: "1px solid rgba(212,175,110,.06)", borderRadius: 4, flexShrink: 0, overflow: "hidden", transition: "all .35s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.25)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(212,175,110,.1)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.06)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                    <img src={p.img} alt={p.name} loading="lazy" className="hob-zoom" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                    <div style={{ position: "absolute", top: 14, left: 14, background: "linear-gradient(135deg, #E8C895 0%, #D4AF6E 100%)", color: "#0D0D0B", fontSize: "0.6rem", fontWeight: 700, padding: "4px 10px", letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 99 }}>★ Bestseller</div>
                  </div>
                  <div style={{ padding: 22 }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 6, fontWeight: 500 }}>{p.cat}</div>
                    <div className="hob-serif" style={{ fontSize: "1.15rem", fontWeight: 500, color: "#FAF7F2", marginBottom: 8, lineHeight: 1.2 }}>{p.name}</div>
                    <div style={{ fontSize: "0.74rem", color: "rgba(250,247,242,.4)", lineHeight: 1.65, marginBottom: 18, minHeight: 36 }}>{p.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="hob-serif" style={{ fontSize: "1.3rem", fontWeight: 400, color: "#D4AF6E" }}>₹{effectivePrice(p)}</div>
                      <button onClick={() => addToCart(p.id)} className="hob-btn-transition" style={{ background: "rgba(212,175,110,.08)", border: "1px solid rgba(212,175,110,.35)", color: "#D4AF6E", padding: "0.42rem 0.95rem", fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 500, borderRadius: 99 }} onMouseEnter={(e) => { e.currentTarget.style.background = "#D4AF6E"; e.currentTarget.style.color = "#0D0D0B"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.08)"; e.currentTarget.style.color = "#D4AF6E"; }}>Add +</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="menu" className="hob-section" style={{ padding: "110px 40px", background: "#FAF7F2", color: "#0D0D0B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8943A", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#B8943A", display: "block" }} />Full Menu</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#0D0D0B", marginBottom: 18, lineHeight: 1.1 }}>Every Creation, Crafted Daily</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #B8943A, transparent)", marginBottom: 0 }} />
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "40px 0 36px" }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} onClick={() => setMenuCat(cat)} className="hob-btn-transition" style={{ background: menuCat === cat ? "#0D0D0B" : "transparent", border: `1px solid ${menuCat === cat ? "#0D0D0B" : "rgba(13,13,11,.12)"}`, color: menuCat === cat ? "#FAF7F2" : "rgba(13,13,11,.55)", padding: "0.5rem 1.2rem", borderRadius: 99, fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 500 }}>{cat}</button>
              ))}
            </div>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(13,13,11,.35)", fontSize: "0.9rem" }}>No items in this category yet — please check back soon.</div>
            ) : (
              <div className="hob-products-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(245px,1fr))", gap: 22 }}>
                {filteredProducts.map((p) => {
                  const fp = effectivePrice(p);
                  return (
                    <div key={p.id} className="hob-card hob-lift" style={{ background: "#fff", border: "1px solid rgba(13,13,11,.06)", borderRadius: 4, overflow: "hidden", transition: "all .4s" }} onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 24px 60px rgba(13,13,11,.15)"; e.currentTarget.style.borderColor = "rgba(184,148,58,.2)"; }} onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = "rgba(13,13,11,.06)"; }}>
                      <div style={{ height: 220, overflow: "hidden", position: "relative" }}>
                        <img className="hob-zoom" src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                        {p.tag && <div style={{ position: "absolute", top: 12, left: 12, background: p.tc || "#B8943A", color: "#fff", padding: "4px 10px", fontSize: "0.58rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", borderRadius: 99, boxShadow: "0 4px 12px rgba(0,0,0,.25)" }}>{p.tag}</div>}
                        {p.discount > 0 && <div style={{ position: "absolute", top: 12, right: 12, background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#fff", padding: "4px 10px", fontSize: "0.62rem", fontWeight: 700, borderRadius: 99, boxShadow: "0 4px 12px rgba(34,197,94,.35)" }}>{p.discount}% OFF</div>}
                      </div>
                      <div style={{ padding: "20px 20px 22px" }}>
                        <div style={{ fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#B8943A", marginBottom: 6, fontWeight: 600 }}>{p.cat}</div>
                        <div className="hob-serif" style={{ fontSize: "1.1rem", fontWeight: 500, color: "#0D0D0B", marginBottom: 6, lineHeight: 1.2 }}>{p.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(13,13,11,.5)", lineHeight: 1.65, marginBottom: 16, minHeight: 36 }}>{p.desc}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div><span className="hob-serif" style={{ fontSize: "1.25rem", fontWeight: 500, color: "#0D0D0B" }}>₹{fp}</span>{p.discount > 0 && <span style={{ fontSize: "0.7rem", color: "rgba(13,13,11,.3)", textDecoration: "line-through", marginLeft: 6 }}>₹{p.price}</span>}</div>
                          <button onClick={() => addToCart(p.id)} className="hob-btn-transition" style={{ background: "#0D0D0B", color: "#FAF7F2", border: "none", padding: "0.5rem 1rem", fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 500, borderRadius: 99 }} onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(135deg, #D4AF6E, #B8943A)"} onMouseLeave={(e) => e.currentTarget.style.background = "#0D0D0B"}>Add +</button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        <section className="hob-section" style={{ padding: "110px 40px", background: "#0D0D0B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />The Difference</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 18, lineHeight: 1.1 }}>Why House of Bakers</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4AF6E, transparent)", marginBottom: 64 }} />
            </div>
            <div className="hob-why-grid hob-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
              {[["01", "Crafted to Order", "No pre-made stock. Every creation is hand-finished within minutes of your order — peak freshness, every time."], ["02", "Premium Ingredients", "We source only the finest — single-origin chocolate, AOP French butter, Madagascar vanilla. Quality you can taste."], ["03", "Custom Creations", "Any theme. Any message. Any occasion. Our pastry chefs bring your vision to life with meticulous artistry."], ["04", "Four Premium Branches", "Jubilee Hills, Banjara Hills, Gachibowli, Kondapur. Always close, always consistent."], ["05", "Complimentary Delivery", "Orders above ₹500 receive free delivery across all our branches. Below ₹500 — just ₹50 within 5 km."], ["06", "Effortless Ordering", "A few clicks and your order arrives on WhatsApp. No apps, no friction — just beautiful cake."]].map(([num, title, body]) => (
                <div key={num} className="hob-glass hob-lift" style={{ padding: "44px 32px", borderRadius: 4, position: "relative", overflow: "hidden" }} onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.06)"; e.currentTarget.style.borderColor = "rgba(212,175,110,.25)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(250,247,242,.04)"; e.currentTarget.style.borderColor = "rgba(212,175,110,.12)"; }}>
                  <div className="hob-serif" style={{ fontSize: "3.8rem", fontWeight: 300, color: "rgba(212,175,110,.15)", lineHeight: 1, marginBottom: 18 }}>{num}</div>
                  <div className="hob-serif" style={{ fontSize: "1.25rem", fontWeight: 500, color: "#FAF7F2", marginBottom: 12 }}>{title}</div>
                  <div style={{ fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.85, color: "rgba(250,247,242,.5)" }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="gallery" className="hob-section" style={{ padding: "110px 40px", background: "#14130F" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />Our Craft</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 18, lineHeight: 1.1 }}>Bakery Gallery</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4AF6E, transparent)", marginBottom: 56 }} />
            </div>
            <div className="hob-gallery-grid hob-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gridAutoRows: "160px", gap: 8 }}>
              {GALLERY_IMGS.map((img, i) => (
                <div key={i} className="hob-gallery-item" onClick={() => setLightboxSrc(img.src)} style={{ position: "relative", overflow: "hidden", cursor: "zoom-in", gridRow: `span ${img.h}`, borderRadius: 4 }}>
                  <img src={img.src} alt={`Gallery ${i + 1}`} loading="lazy" className="hob-gallery-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(.78)" }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hob-section" style={{ padding: "110px 40px", background: "#F0EBE0", color: "#0D0D0B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#B8943A", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#B8943A", display: "block" }} />How It Works</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#0D0D0B", marginBottom: 18, lineHeight: 1.1 }}>Order in Four Simple Steps</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #B8943A, transparent)", marginBottom: 64 }} />
            </div>
            <div className="hob-steps-grid hob-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }}>
              {[["01", "Browse", "Explore our full collection of artisan creations"], ["02", "Add to Cart", "Select items and quantities easily"], ["03", "Your Details", "Name, phone, address and nearest branch"], ["04", "WhatsApp Confirm", "Full order sent — ready within minutes"]].map(([num, title, body]) => (
                <div key={num} style={{ textAlign: "center", padding: "0 24px" }}>
                  <div className="hob-serif" style={{ width: 68, height: 68, border: "1px solid #B8943A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px", fontSize: "1.4rem", fontWeight: 300, color: "#B8943A", background: "#F0EBE0", borderRadius: "50%" }}>{num}</div>
                  <div className="hob-serif" style={{ fontSize: "1.15rem", fontWeight: 500, color: "#0D0D0B", marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(13,13,11,.55)", lineHeight: 1.7 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="branches" className="hob-section" style={{ padding: "110px 40px", background: "#0D0D0B" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />Find Us</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 18, lineHeight: 1.1 }}>Our Four Branches</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4AF6E, transparent)", marginBottom: 64 }} />
            </div>
            <div className="hob-branch-grid hob-reveal" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 18 }}>
              {BRANCHES.map((b) => (
                <div key={b.id} className="hob-glass-dark hob-lift" style={{ padding: "34px 30px", borderRadius: 4, transition: "all .35s" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.25)"; e.currentTarget.style.boxShadow = "0 24px 64px rgba(212,175,110,.08)"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.08)"; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div>
                      <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 6, fontWeight: 500 }}>Branch {b.id.toString().padStart(2, "0")}</div>
                      <div className="hob-serif" style={{ fontSize: "1.4rem", fontWeight: 500, color: "#FAF7F2", lineHeight: 1.2 }}>House of Bakers — {b.name}</div>
                    </div>
                    {b.badge && <div style={{ background: "rgba(212,175,110,.1)", border: "1px solid rgba(212,175,110,.25)", color: "#D4AF6E", padding: "4px 12px", fontSize: "0.6rem", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 600, borderRadius: 99 }}>{b.badge}</div>}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "rgba(250,247,242,.5)", lineHeight: 1.75, marginBottom: 8 }}>📍 {b.addr}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(250,247,242,.4)", marginBottom: 18 }}>🕐 {b.timing}</div>
                  <a href={`tel:${b.ph.replace(/\s/g, "")}`} style={{ display: "block", fontSize: "0.85rem", color: "#FAF7F2", fontWeight: 400, marginBottom: 20, textDecoration: "none", letterSpacing: "0.04em" }}>📞 {b.ph}</a>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href={`https://wa.me/${b.wa}?text=${encodeURIComponent(`Hello House of Bakers — ${b.name} branch!`)}`} target="_blank" rel="noreferrer" className="hob-btn-transition" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff", padding: "0.5rem 1.1rem", fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 600, borderRadius: 99 }}><WA size={14} /> WhatsApp</a>
                    <a href={`tel:${b.ph.replace(/\s/g, "")}`} className="hob-btn-transition" style={{ background: "rgba(212,175,110,.08)", border: "1px solid rgba(212,175,110,.25)", color: "#D4AF6E", padding: "0.5rem 1.1rem", fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 500, borderRadius: 99 }}>📞 Call</a>
                    <a href={b.maps} target="_blank" rel="noreferrer" className="hob-btn-transition" style={{ background: "rgba(212,175,110,.08)", border: "1px solid rgba(212,175,110,.25)", color: "#D4AF6E", padding: "0.5rem 1.1rem", fontSize: "0.66rem", letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 500, borderRadius: 99 }}>📍 Maps</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="hob-section" style={{ padding: "110px 40px", background: "#14130F" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 18, display: "flex", alignItems: "center", gap: 12, fontWeight: 500 }}><span style={{ width: 32, height: 1, background: "#D4AF6E", display: "block" }} />Questions</div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2.2rem,4.5vw,3.5rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 18, lineHeight: 1.1 }}>Frequently Asked</h2>
              <div style={{ width: 64, height: 1, background: "linear-gradient(90deg, #D4AF6E, transparent)", marginBottom: 56 }} />
            </div>
            <div style={{ maxWidth: 800 }} className="hob-reveal">
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: "1px solid rgba(212,175,110,.08)" }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} className="hob-btn-transition" style={{ width: "100%", background: "none", border: "none", color: openFaq === i ? "#D4AF6E" : "#FAF7F2", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", fontWeight: 400, textAlign: "left", padding: "24px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}>
                    {f.q}
                    <span style={{ color: "#D4AF6E", transition: "transform .35s cubic-bezier(.16,1,.3,1)", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)", fontSize: "0.85rem", marginLeft: 16 }}>▾</span>
                  </button>
                  <div style={{ maxHeight: openFaq === i ? 400 : 0, overflow: "hidden", transition: "max-height .45s cubic-bezier(.16,1,.3,1)" }}>
                    <p style={{ fontSize: "0.88rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(250,247,242,.55)", paddingBottom: 24 }}>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ background: "linear-gradient(135deg, #1A1916 0%, #0D0D0B 100%)", padding: "100px 40px", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(212,175,110,.1)" }}>
          <Particles count={14} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
            <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4.5vw,3.4rem)", fontWeight: 300, marginBottom: 18, lineHeight: 1.15 }}>Ready to experience<br /><em className="hob-gradient-text" style={{ fontStyle: "italic" }}>quiet luxury?</em></h2>
            <p style={{ fontSize: "0.95rem", color: "rgba(250,247,242,.5)", marginBottom: 40, fontWeight: 300, lineHeight: 1.8 }}>Open the cart, choose your branch, and we'll confirm your order on WhatsApp in minutes.</p>
            <button onClick={() => setCartOpen(true)} className="hob-btn-transition hob-glow" style={{ background: "linear-gradient(135deg, #E8C895 0%, #D4AF6E 50%, #B8943A 100%)", color: "#0D0D0B", border: "none", padding: "1.1rem 2.6rem", fontSize: "0.74rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 12, fontFamily: "Outfit, sans-serif", borderRadius: 99 }}><WA size={16} /> Begin Your Order</button>
          </div>
        </section>

        <footer style={{ background: "#08080A", borderTop: "1px solid rgba(212,175,110,.08)", padding: "72px 40px 32px" }}>
          <div style={{ maxWidth: 1280, margin: "0 auto", marginBottom: 56 }}>
            <div className="hob-footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.4fr", gap: 48 }}>
              <div>
                <div className="hob-serif" style={{ fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.18em", textTransform: "uppercase", color: "#FAF7F2", marginBottom: 18 }}>House <span className="hob-gradient-text">of</span> Bakers</div>
                <p style={{ fontSize: "0.82rem", color: "rgba(250,247,242,.4)", lineHeight: 1.85, maxWidth: 280, marginBottom: 24 }}>Premium artisan bakery crafting cakes, pastries and bread fresh to order across four Hyderabad locations.</p>
                <div style={{ display: "flex", gap: 10 }}>
                  {[["IG", "https://instagram.com"], ["FB", "https://facebook.com"], ["YT", "https://youtube.com"], ["TW", "https://twitter.com"]].map(([label, href]) => (
                    <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="hob-btn-transition" style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(212,175,110,.06)", border: "1px solid rgba(212,175,110,.15)", color: "rgba(250,247,242,.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.05em", textDecoration: "none" }} onMouseEnter={(e) => { e.currentTarget.style.background = "linear-gradient(135deg, #D4AF6E, #B8943A)"; e.currentTarget.style.color = "#0D0D0B"; e.currentTarget.style.transform = "translateY(-3px)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(212,175,110,.06)"; e.currentTarget.style.color = "rgba(250,247,242,.5)"; e.currentTarget.style.transform = "translateY(0)"; }}>{label}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.62rem", color: "#D4AF6E", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 22, fontWeight: 600 }}>Navigate</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {["Collections", "Menu", "Gallery", "About", "Branches", "FAQ"].map((l) => (
                    <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })} className="hob-btn-transition" style={{ background: "none", border: "none", color: "rgba(250,247,242,.4)", fontSize: "0.8rem", textAlign: "left", cursor: "pointer", padding: 0, fontFamily: "Outfit, sans-serif" }} onMouseEnter={(e) => { e.currentTarget.style.color = "#D4AF6E"; e.currentTarget.style.transform = "translateX(4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250,247,242,.4)"; e.currentTarget.style.transform = "translateX(0)"; }}>{l}</button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.62rem", color: "#D4AF6E", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 22, fontWeight: 600 }}>Branches</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {BRANCHES.map((b) => (
                    <a key={b.id} href={b.maps} target="_blank" rel="noreferrer" className="hob-btn-transition" style={{ color: "rgba(250,247,242,.4)", fontSize: "0.8rem", textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }} onMouseEnter={(e) => { e.currentTarget.style.color = "#D4AF6E"; e.currentTarget.style.transform = "translateX(4px)"; }} onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(250,247,242,.4)"; e.currentTarget.style.transform = "translateX(0)"; }}>📍 {b.name}</a>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.62rem", color: "#D4AF6E", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 22, fontWeight: 600 }}>Contact</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <a href="tel:+919876543210" style={{ color: "rgba(250,247,242,.4)", fontSize: "0.82rem", textDecoration: "none" }}>📞 +91 98765 43210</a>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" style={{ color: "rgba(250,247,242,.4)", fontSize: "0.82rem", textDecoration: "none" }}>💬 WhatsApp Us</a>
                  <span style={{ color: "rgba(250,247,242,.4)", fontSize: "0.82rem" }}>✉️ hello@houseofbakers.in</span>
                  <span style={{ color: "rgba(250,247,242,.4)", fontSize: "0.82rem" }}>🕐 7:00 AM – 12:00 AM Daily</span>
                </div>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 1280, margin: "0 auto", paddingTop: 28, borderTop: "1px solid rgba(212,175,140,.05)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div style={{ fontSize: "0.7rem", color: "rgba(250,247,242,.25)" }}>© 2026 House of Bakers. Crafted with care in Hyderabad.</div>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(212,175,110,.45)", fontWeight: 500 }}>Hyderabad · India</div>
          </div>
        </footer>

        <a href={`https://wa.me/${BRANCHES[0].wa}?text=${encodeURIComponent("Hello House of Bakers!")}`} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="hob-btn-transition hob-pulse" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 400, width: 58, height: 58, background: "linear-gradient(135deg, #25D366, #128C7E)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 28px rgba(37,211,102,.45)", color: "#fff", textDecoration: "none" }} onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1) rotate(8deg)"} onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1) rotate(0)"}><WA size={28} /></a>

        {toast && <div className="hob-toast hob-glass-dark" style={{ position: "fixed", top: 88, left: "50%", transform: "translateX(-50%)", color: "#FAF7F2", padding: "0.7rem 1.5rem", fontSize: "0.78rem", letterSpacing: "0.06em", zIndex: 800, boxShadow: "0 12px 40px rgba(0,0,0,.5)", whiteSpace: "nowrap", borderRadius: 99, fontWeight: 500 }} role="status" aria-live="polite">{toast}</div>}

        {cartOpen && (
          <>
            <div onClick={() => setCartOpen(false)} aria-hidden="true" style={{ position: "fixed", inset: 0, background: "rgba(13,13,11,.75)", zIndex: 500, backdropFilter: "blur(8px)", animation: "hob-fade-in .3s ease both" }} />
            <div className="hob-slide-right" role="dialog" aria-label="Shopping cart" style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "min(460px,100vw)", background: "#14130F", zIndex: 501, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(212,175,110,.12)", boxShadow: "-30px 0 80px rgba(0,0,0,.5)" }}>
              <div style={{ padding: "28px 28px 22px", borderBottom: "1px solid rgba(212,175,110,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(13,13,11,.4)" }}>
                <div>
                  <div className="hob-serif" style={{ fontSize: "1.35rem", fontWeight: 400, color: "#FAF7F2" }}>Your Cart</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(250,247,242,.4)", marginTop: 2, letterSpacing: "0.06em" }}>{cartCount} {cartCount === 1 ? "item" : "items"}</div>
                </div>
                <button onClick={() => setCartOpen(false)} aria-label="Close cart" className="hob-btn-transition" style={{ background: "rgba(212,175,110,.08)", border: "1px solid rgba(212,175,110,.2)", color: "rgba(250,247,242,.5)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#D4AF6E"; e.currentTarget.style.color = "#D4AF6E"; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.2)"; e.currentTarget.style.color = "rgba(250,247,242,.5)"; }}><CloseIcon size={16} /></button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px" }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "60px 20px", color: "rgba(250,247,242,.3)" }}>
                    <div style={{ fontSize: "3rem", marginBottom: 18 }}>🥐</div>
                    <p className="hob-serif" style={{ fontSize: "1.05rem", color: "rgba(250,247,242,.5)", fontStyle: "italic" }}>Your cart awaits</p>
                    <p style={{ fontSize: "0.8rem", lineHeight: 1.7, marginTop: 8 }}>Add some artisan creations<br />from our menu.</p>
                  </div>
                ) : cart.map((item) => {
                  const p = products.find((x) => x.id === item.id);
                  if (!p) return null;
                  return (
                    <div key={item.id} className="hob-cart-item" style={{ display: "flex", gap: 14, padding: "18px 0" }}>
                      <img src={p.img} alt={p.name} loading="lazy" style={{ width: 64, height: 64, objectFit: "cover", flexShrink: 0, borderRadius: 4 }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="hob-serif" style={{ fontSize: "0.98rem", color: "#FAF7F2", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#D4AF6E" }}>₹{effectivePrice(p)} each</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
                          <button onClick={() => changeQty(p.id, -1)} aria-label="Decrease quantity" className="hob-qty-btn" style={{ background: "rgba(212,175,110,.1)", border: "1px solid rgba(212,175,110,.2)", color: "#D4AF6E", width: 28, height: 28, cursor: "pointer", fontSize: "0.9rem", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                          <span style={{ fontSize: "0.85rem", color: "#FAF7F2", minWidth: 22, textAlign: "center", fontWeight: 500 }}>{item.qty}</span>
                          <button onClick={() => changeQty(p.id, 1)} aria-label="Increase quantity" className="hob-qty-btn" style={{ background: "rgba(212,175,110,.1)", border: "1px solid rgba(212,175,110,.2)", color: "#D4AF6E", width: 28, height: 28, cursor: "pointer", fontSize: "0.9rem", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                          <button onClick={() => removeFromCart(p.id)} className="hob-btn-transition" style={{ background: "none", border: "none", color: "rgba(250,247,242,.3)", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", marginLeft: "auto", padding: 4 }} onMouseEnter={(e) => e.currentTarget.style.color = "#C94B4B"} onMouseLeave={(e) => e.currentTarget.style.color = "rgba(250,247,242,.3)"}>Remove</button>
                        </div>
                      </div>
                      <div className="hob-serif" style={{ fontSize: "1rem", color: "#D4AF6E", flexShrink: 0, fontWeight: 500 }}>₹{effectivePrice(p) * item.qty}</div>
                    </div>
                  );
                })}
              </div>
              {cart.length > 0 && (
                <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(212,175,110,.1)", background: "rgba(13,13,11,.5)", backdropFilter: "blur(10px)" }}>
                  {cartDel === 0 ? <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.25)", padding: "0.5rem 0.9rem", fontSize: "0.72rem", color: "#22C55E", marginBottom: 14, textAlign: "center", borderRadius: 4, fontWeight: 500, letterSpacing: "0.04em" }}>✨ Complimentary delivery unlocked</div> : <div style={{ background: "rgba(212,175,110,.06)", border: "1px solid rgba(212,175,110,.15)", padding: "0.5rem 0.9rem", fontSize: "0.72rem", color: "rgba(212,175,110,.7)", marginBottom: 14, textAlign: "center", borderRadius: 4 }}>Add ₹{500 - cartSub} more for free delivery</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "rgba(250,247,242,.5)", marginBottom: 10 }}><span>Subtotal</span><span style={{ color: "#D4AF6E" }}>₹{cartSub}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "rgba(250,247,242,.5)", marginBottom: 14 }}><span>Delivery</span><span style={{ color: cartDel === 0 ? "#22C55E" : "#D4AF6E", fontWeight: 500 }}>{cartDel === 0 ? "FREE" : `₹${cartDel}`}</span></div>
                  <div className="hob-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", color: "#FAF7F2", paddingTop: 14, borderTop: "1px solid rgba(212,175,110,.12)", marginBottom: 22, fontWeight: 500 }}><span>Total</span><span className="hob-gradient-text">₹{cartTot}</span></div>
                  <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }} className="hob-btn-transition" style={{ width: "100%", background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff", border: "none", padding: "1rem", fontSize: "0.74rem", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, fontFamily: "Outfit, sans-serif", fontWeight: 600, borderRadius: 99, boxShadow: "0 8px 24px rgba(37,211,102,.3)" }}><WA /> Checkout via WhatsApp</button>
                </div>
              )}
            </div>
          </>
        )}

        {checkoutOpen && (
          <div style={{ position: "fixed", inset: 0, background: "#0D0D0B", zIndex: 600, overflowY: "auto" }}>
            <div style={{ position: "sticky", top: 0, background: "rgba(13,13,11,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(212,175,110,.1)", padding: "20px 32px", display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}>
              <button onClick={() => { setCheckoutOpen(false); setCartOpen(true); }} className="hob-btn-transition" style={{ background: "none", border: "1px solid rgba(212,175,110,.25)", color: "#D4AF6E", padding: "0.45rem 0.95rem", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 500, borderRadius: 99 }}>← Back to Cart</button>
              <h2 className="hob-serif" style={{ fontSize: "1.5rem", fontWeight: 400, color: "#FAF7F2" }}>Checkout</h2>
            </div>
            <div style={{ maxWidth: 680, margin: "0 auto", padding: "48px 32px 80px" }}>
              <div className="hob-glass-dark" style={{ padding: 24, marginBottom: 32, borderRadius: 4 }}>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 18, fontWeight: 600 }}>Order Summary</div>
                {cart.map((it) => { const p = products.find((x) => x.id === it.id); return p ? <div key={it.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "rgba(250,247,242,.55)", marginBottom: 10, gap: 12 }}><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name} × {it.qty}</span><span style={{ color: "#D4AF6E", flexShrink: 0 }}>₹{effectivePrice(p) * it.qty}</span></div> : null; })}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "rgba(250,247,242,.55)", marginBottom: 10 }}><span>Delivery</span><span style={{ color: cartDel === 0 ? "#22C55E" : "#D4AF6E" }}>{cartDel === 0 ? "FREE" : `₹${cartDel}`}</span></div>
                <div className="hob-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: "1.2rem", color: "#FAF7F2", paddingTop: 14, borderTop: "1px solid rgba(212,175,110,.12)", marginTop: 6, fontWeight: 500 }}><span>Total</span><span className="hob-gradient-text">₹{cartTot}</span></div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 10, fontWeight: 600 }}>Your Name *</label>
                <input type="text" placeholder="Full name" value={customer.name} onChange={(e) => setCustomer((c) => ({ ...c, name: e.target.value }))} style={{ width: "100%", background: "rgba(212,175,110,.04)", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.95rem 1.1rem", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif", fontWeight: 300, outline: "none", borderRadius: 4 }} onFocus={(e) => { e.currentTarget.style.borderColor = "#D4AF6E"; e.currentTarget.style.background = "rgba(212,175,110,.06)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.15)"; e.currentTarget.style.background = "rgba(212,175,110,.04)"; }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 10, fontWeight: 600 }}>Phone Number *</label>
                <input type="tel" placeholder="+91 XXXXX XXXXX" value={customer.phone} onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))} style={{ width: "100%", background: "rgba(212,175,110,.04)", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.95rem 1.1rem", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif", fontWeight: 300, outline: "none", borderRadius: 4 }} onFocus={(e) => { e.currentTarget.style.borderColor = "#D4AF6E"; e.currentTarget.style.background = "rgba(212,175,110,.06)"; }} onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(212,175,110,.15)"; e.currentTarget.style.background = "rgba(212,175,110,.04)"; }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 10, fontWeight: 600 }}>Delivery Address *</label>
                <textarea rows={3} placeholder="Door no, street, area, landmark..." value={customer.address} onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))} style={{ width: "100%", background: "rgba(212,175,110,.04)", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.95rem 1.1rem", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif", fontWeight: 300, outline: "none", resize: "none", borderRadius: 4 }} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 12, fontWeight: 600 }}>Select Nearest Branch *</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {BRANCHES.map((b) => (
                    <div key={b.id} onClick={() => setCustomer((c) => ({ ...c, branch: b.name }))} className="hob-btn-transition" style={{ border: `1px solid ${customer.branch === b.name ? "#D4AF6E" : "rgba(212,175,110,.12)"}`, background: customer.branch === b.name ? "rgba(212,175,110,.08)" : "transparent", padding: "16px 18px", cursor: "pointer", borderRadius: 4 }}>
                      <div className="hob-serif" style={{ fontSize: "0.98rem", color: "#FAF7F2", marginBottom: 4, fontWeight: 500 }}>📍 {b.name}</div>
                      <div style={{ fontSize: "0.72rem", color: "rgba(250,247,242,.4)" }}>{b.ph}</div>
                    </div>
                  ))}
                </div>
              </div>
              {cartDel === 0 ? <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.25)", padding: "0.6rem 1rem", fontSize: "0.75rem", color: "#22C55E", marginBottom: 20, textAlign: "center", borderRadius: 4, fontWeight: 500 }}>✨ Complimentary delivery on this order</div> : <div style={{ background: "rgba(212,175,110,.04)", border: "1px solid rgba(212,175,110,.12)", padding: "0.6rem 1rem", fontSize: "0.75rem", color: "rgba(212,175,110,.7)", marginBottom: 20, textAlign: "center", borderRadius: 4 }}>Add ₹{500 - cartSub} more for free delivery</div>}
              <button onClick={sendWAOrder} className="hob-btn-transition" style={{ width: "100%", background: "linear-gradient(135deg, #25D366, #128C7E)", color: "#fff", border: "none", padding: "1.1rem", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: "Outfit, sans-serif", fontWeight: 600, borderRadius: 99, boxShadow: "0 10px 32px rgba(37,211,102,.35)" }}><WA /> Confirm Order on WhatsApp</button>
              <p style={{ textAlign: "center", fontSize: "0.75rem", color: "rgba(250,247,242,.3)", marginTop: 14 }}>WhatsApp will open with your complete order details</p>
            </div>
          </div>
        )}

        {adminState.loginOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(13,13,11,.94)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(12px)" }}>
            <div className="hob-glass-dark" style={{ padding: 48, width: "min(360px,90vw)", textAlign: "center", borderRadius: 4, boxShadow: "0 40px 120px rgba(0,0,0,.8)", animation: "hob-fade-up .4s ease both" }}>
              <div className="hob-serif" style={{ fontSize: "1.4rem", fontWeight: 400, color: "#FAF7F2", letterSpacing: "0.14em", marginBottom: 8 }}>House of Bakers</div>
              <div style={{ fontSize: "0.65rem", letterSpacing: "0.24em", color: "#D4AF6E", textTransform: "uppercase", marginBottom: 32, fontWeight: 600 }}>Owner Access</div>
              <input type="password" placeholder="Enter password" value={adminState.pwd} onChange={(e) => setAdminState((a) => ({ ...a, pwd: e.target.value }))} onKeyDown={(e) => e.key === "Enter" && tryAdminLogin()} style={{ width: "100%", background: "rgba(212,175,110,.05)", border: "1px solid rgba(212,175,110,.18)", color: "#FAF7F2", padding: "0.95rem 1rem", fontSize: "0.92rem", fontFamily: "Outfit, sans-serif", textAlign: "center", letterSpacing: "0.2em", outline: "none", marginBottom: 14, borderRadius: 4 }} autoFocus />
              <button onClick={tryAdminLogin} className="hob-btn-transition" style={{ width: "100%", background: "linear-gradient(135deg, #E8C895 0%, #D4AF6E 100%)", color: "#0D0D0B", border: "none", padding: "0.95rem", fontSize: "0.72rem", letterSpacing: "0.18em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 600, marginBottom: 12, borderRadius: 99 }}>Sign In</button>
              <button onClick={() => setAdminState((a) => ({ ...a, loginOpen: false, pwd: "" }))} style={{ background: "none", border: "none", color: "rgba(250,247,242,.35)", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", padding: 8 }}>Cancel</button>
            </div>
          </div>
        )}

        {adminState.panelOpen && (
          <div onClick={(e) => e.target === e.currentTarget && setAdminState((a) => ({ ...a, panelOpen: false, editing: null, ef: {} }))} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(8px)" }}>
            <div className="hob-glass-dark" style={{ background: "#0F0E0C", border: "1px solid rgba(212,175,110,.18)", width: "100%", maxWidth: 760, maxHeight: "90vh", overflow: "hidden", boxShadow: "0 40px 120px rgba(0,0,0,.8)", borderRadius: 4, display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "20px 26px", borderBottom: "1px solid rgba(212,175,110,.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div className="hob-serif" style={{ fontSize: "1.2rem", fontWeight: 400, color: "#FAF7F2" }}>Owner Dashboard</div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(250,247,242,.4)", marginTop: 3, letterSpacing: "0.06em" }}>House of Bakers — Manage Products</div>
                </div>
                <button onClick={() => setAdminState((a) => ({ ...a, panelOpen: false, editing: null, ef: {} }))} aria-label="Close dashboard" style={{ background: "rgba(212,175,110,.08)", border: "1px solid rgba(212,175,110,.2)", color: "rgba(250,247,242,.5)", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><CloseIcon size={16} /></button>
              </div>
              <div style={{ padding: "20px 26px", overflowY: "auto", flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
                  <span style={{ fontSize: "0.78rem", color: "rgba(250,247,242,.5)", letterSpacing: "0.06em" }}>{products.length} products · saved to localStorage</span>
                  <button onClick={adminAddProduct} className="hob-btn-transition" style={{ background: "linear-gradient(135deg, #22C55E, #16A34A)", color: "#fff", padding: "0.5rem 1.1rem", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 600, border: "none", borderRadius: 99, boxShadow: "0 4px 16px rgba(34,197,94,.3)" }}>+ Add Product</button>
                </div>
                <div>
                  {products.map((p) => (
                    <div key={p.id} style={{ background: "rgba(255,255,255,.025)", border: "1px solid rgba(212,175,110,.06)", padding: "14px 16px", marginBottom: 10, borderRadius: 4 }}>
                      {adminState.editing === p.id ? (
                        <div>
                          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                            {[["Name", "name", "text"], ["Price (₹)", "price", "number"], ["Discount (%)", "discount", "number"], ["Tag", "tag", "text"]].map(([label, key, type]) => (
                              <div key={key}>
                                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 5, fontWeight: 600 }}>{label}</label>
                                <input type={type} value={String(adminState.ef[key] ?? "")} onChange={(e) => setAdminState((a) => ({ ...a, ef: { ...a.ef, [key]: e.target.value } }))} style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.5rem 0.75rem", fontSize: "0.85rem", outline: "none", fontFamily: "Outfit, sans-serif", borderRadius: 4 }} />
                              </div>
                            ))}
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 5, fontWeight: 600 }}>Category</label>
                            <select value={String(adminState.ef.cat ?? "")} onChange={(e) => setAdminState((a) => ({ ...a, ef: { ...a.ef, cat: e.target.value } }))} style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.5rem 0.75rem", fontSize: "0.85rem", outline: "none", fontFamily: "Outfit, sans-serif", cursor: "pointer", borderRadius: 4 }}>
                              {CATEGORIES.filter((c) => c !== "All").map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                          </div>
                          <div style={{ marginBottom: 10 }}>
                            <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 5, fontWeight: 600 }}>Image URL</label>
                            <input type="text" value={String(adminState.ef.img ?? "")} placeholder="https://images.unsplash.com/..." onChange={(e) => setAdminState((a) => ({ ...a, ef: { ...a.ef, img: e.target.value } }))} style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.5rem 0.75rem", fontSize: "0.85rem", outline: "none", fontFamily: "Outfit, sans-serif", borderRadius: 4 }} />
                          </div>
                          <div style={{ marginBottom: 12 }}>
                            <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 5, fontWeight: 600 }}>Description</label>
                            <input type="text" value={String(adminState.ef.desc ?? "")} onChange={(e) => setAdminState((a) => ({ ...a, ef: { ...a.ef, desc: e.target.value } }))} style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.5rem 0.75rem", fontSize: "0.85rem", outline: "none", fontFamily: "Outfit, sans-serif", borderRadius: 4 }} />
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button onClick={() => saveAdminEdit(p.id)} className="hob-btn-transition" style={{ flex: 1, background: "linear-gradient(135deg, #D4AF6E, #B8943A)", color: "#0D0D0B", border: "none", padding: "0.6rem 1.2rem", fontSize: "0.72rem", letterSpacing: "0.14em", textTransform: "uppercase", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 600, borderRadius: 4 }}>✓ Save Changes</button>
                            <button onClick={() => setAdminState((a) => ({ ...a, editing: null, ef: {} }))} className="hob-btn-transition" style={{ background: "rgba(255,255,255,.05)", border: "none", color: "rgba(250,247,242,.45)", padding: "0.6rem 1rem", fontSize: "0.72rem", cursor: "pointer", fontFamily: "Outfit, sans-serif", borderRadius: 4 }}>Cancel</button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <img src={p.img} alt={p.name} loading="lazy" style={{ width: 56, height: 56, objectFit: "cover", flexShrink: 0, borderRadius: 4 }} onError={(e) => { e.currentTarget.style.display = "none"; }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ color: "#FAF7F2", fontWeight: 500, fontSize: "0.9rem", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                            <div style={{ color: "rgba(250,247,242,.45)", fontSize: "0.74rem" }}>₹{p.price}{p.discount > 0 ? ` → ₹${effectivePrice(p)} (${p.discount}% off)` : ""} · {p.cat}</div>
                          </div>
                          <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                            <button onClick={() => setAdminState((a) => ({ ...a, editing: p.id, ef: { ...p } }))} className="hob-btn-transition" style={{ background: "rgba(212,175,110,.1)", border: "1px solid rgba(212,175,110,.25)", color: "#D4AF6E", padding: "0.4rem 0.8rem", fontSize: "0.72rem", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 500, borderRadius: 4 }}>✏️ Edit</button>
                            <button onClick={() => adminDelete(p.id)} className="hob-btn-transition" style={{ background: "rgba(201,75,75,.1)", border: "1px solid rgba(201,75,75,.25)", color: "#C94B4B", padding: "0.4rem 0.8rem", fontSize: "0.72rem", cursor: "pointer", fontFamily: "Outfit, sans-serif", fontWeight: 500, borderRadius: 4 }}>🗑</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {lightboxSrc && <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />}
      </div>
    </>
  );
}
