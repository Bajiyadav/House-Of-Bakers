"use client";
// HouseOfBakers.jsx
// Premium artisan bakery website — React + Tailwind CSS
// Features: Shopping cart, Admin dashboard, WhatsApp checkout, localStorage, Gallery, FAQ
// Usage: Drop into any React/Next.js project with Tailwind configured
// Admin password: HOB2026@Admin#4488

import { useState, useEffect, useRef, useCallback } from "react";

// ─── Google Fonts injection ──────────────────────────────────────────────────
const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garant:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Outfit:wght@300;400;500;600&display=swap";

// ─── Data ────────────────────────────────────────────────────────────────────
const BRANCHES = [
  { id: 1, name: "Madhapur", addr: "In front of Wild Fitness Gym, Madhapur, Hyderabad", ph: "+91 92467 41544", wa: "919246741544", maps: "https://maps.app.goo.gl/3PiKP2Zg6GpMNfWT9", timing: "9 AM – 11 PM" },
  { id: 2, name: "Nizampet", addr: "Shop 3-92/1, Opp. Balaji Park Town, Nizampet, Hyderabad", ph: "+91 92467 41544", wa: "919246741544", maps: "https://maps.google.com", timing: "6 AM – 12 AM" },
  { id: 3, name: "KPHB Colony", addr: "Flat 210, Road No.5, Near Maharashtra Bank, KPHB Colony", ph: "+91 86869 59486", wa: "918686959486", maps: "https://maps.google.com", timing: "9 AM – 12 AM" },
  { id: 4, name: "HITEC City", addr: "Vittal Rao Nagar, HITEC City, Hyderabad", ph: "+91 90739 56262", wa: "919073956262", maps: "https://maps.google.com", timing: "Open until 1 AM" },
];

const INIT_PRODUCTS = [
  { id: 1, name: "Black Forest Cake", cat: "Eggless Cakes", price: 529, discount: 0, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=75", tag: "Classic", desc: "Serves 6 · Dark chocolate sponge, cherries & fresh cream, made to order in 15 mins", tc: "#D4AF6E", available: true },
  { id: 2, name: "Butterscotch Cake", cat: "Eggless Cakes", price: 479, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "Bestseller", desc: "Serves 6 · Caramel butterscotch with praline crunch, made to order", tc: "#D4AF6E", available: true },
  { id: 3, name: "Chocolate Truffle Cake", cat: "Eggless Cakes", price: 609, discount: 0, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=75", tag: "Rich", desc: "Serves 6 · Rich ganache layers on dark chocolate sponge", tc: "#C94B4B", available: true },
  { id: 4, name: "Red Velvet Cake", cat: "Eggless Cakes", price: 609, discount: 0, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=75", tag: "Popular", desc: "Serves 6 · Velvety layers with cream cheese frosting", tc: "#C94B4B", available: true },
  { id: 5, name: "Pineapple Cake", cat: "Eggless Cakes", price: 479, discount: 0, img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=75", tag: "Bestseller", desc: "Serves 6 · Fresh pineapple cream cake, handcrafted to order", tc: "#D4AF6E", available: true },
  { id: 6, name: "Blueberry Cake", cat: "Eggless Cakes", price: 479, discount: 0, img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=75", tag: "Fresh", desc: "Serves 6 · Fresh blueberries & vanilla cream sponge", tc: "#7A8C6E", available: true },
  { id: 7, name: "Rasmalai Cake", cat: "Eggless Cakes", price: 609, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Special", desc: "Serves 6 · Rasmalai-inspired cream cake with saffron notes", tc: "#C94B4B", available: true },
  { id: 8, name: "Vanilla Cake", cat: "Eggless Cakes", price: 459, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Classic", desc: "Serves 6 · Classic vanilla sponge with cream", tc: "#D4AF6E", available: true },
  { id: 9, name: "White Forest Cake", cat: "Eggless Cakes", price: 529, discount: 0, img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=75", tag: "Special", desc: "Serves 6 · White chocolate with cherries & cream", tc: "#D4AF6E", available: true },
  { id: 10, name: "Strawberry Cake", cat: "Eggless Cakes", price: 479, discount: 0, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=75", tag: "Fresh", desc: "Serves 6 · Fresh strawberry cream cake", tc: "#C94B4B", available: true },
  { id: 11, name: "Honey Almond Cake", cat: "Eggless Cakes", price: 609, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "Premium", desc: "Serves 6 · Honey glazed almond cake with cream", tc: "#D4AF6E", available: true },
  { id: 12, name: "Birthday Pineapple Cake", cat: "Birthday Cakes", price: 459, discount: 0, img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=75", tag: "Birthday", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#D4AF6E", available: true },
  { id: 13, name: "Birthday Blueberry Cake", cat: "Birthday Cakes", price: 459, discount: 0, img: "https://images.unsplash.com/photo-1519869325930-281384150729?w=400&q=75", tag: "Bestseller", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#7A8C6E", available: true },
  { id: 14, name: "Birthday Black Forest Cake", cat: "Birthday Cakes", price: 509, discount: 0, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=75", tag: "Birthday", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#D4AF6E", available: true },
  { id: 15, name: "Birthday Red Velvet Cake", cat: "Birthday Cakes", price: 589, discount: 0, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=75", tag: "Bestseller", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#C94B4B", available: true },
  { id: 16, name: "Birthday Chocolate Truffle", cat: "Birthday Cakes", price: 589, discount: 0, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=75", tag: "Birthday", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#C94B4B", available: true },
  { id: 17, name: "Birthday Butterscotch Cake", cat: "Birthday Cakes", price: 459, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "Birthday", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#D4AF6E", available: true },
  { id: 18, name: "Birthday Vanilla Cake", cat: "Birthday Cakes", price: 459, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Birthday", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#D4AF6E", available: true },
  { id: 19, name: "Birthday Rasmalai Cake", cat: "Birthday Cakes", price: 589, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Birthday", desc: "Serves 6 · Handcrafted within 15 minutes of order", tc: "#C94B4B", available: true },
  { id: 20, name: "Paneer Puff", cat: "Tea Time Snacks", price: 40, discount: 0, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=75", tag: "Veg", desc: "Crispy puff with spiced paneer filling", tc: "#7A8C6E", available: true },
  { id: 21, name: "Veg Burger", cat: "Tea Time Snacks", price: 60, discount: 0, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75", tag: "Veg", desc: "Fresh vegetable burger with sauces", tc: "#7A8C6E", available: true },
  { id: 22, name: "Chicken 65 Roll", cat: "Tea Time Snacks", price: 60, discount: 0, img: "https://images.unsplash.com/photo-1621303837174-89787a7d4729?w=400&q=75", tag: "Bestseller", desc: "Spicy Chicken 65 wrapped in a soft roll", tc: "#C94B4B", available: true },
  { id: 23, name: "Full Egg Puff", cat: "Tea Time Snacks", price: 30, discount: 0, img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=75", tag: "Hot", desc: "Crispy puff pastry with whole boiled egg", tc: "#C94B4B", available: true },
  { id: 24, name: "Cream Roll", cat: "Tea Time Snacks", price: 35, discount: 0, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=75", tag: "Sweet", desc: "Light pastry roll with fresh cream", tc: "#D4AF6E", available: true },
  { id: 25, name: "Cream Bun", cat: "Tea Time Snacks", price: 25, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "Sweet", desc: "Soft bun filled with fresh cream", tc: "#D4AF6E", available: true },
  { id: 26, name: "Veg Toast", cat: "Tea Time Snacks", price: 40, discount: 0, img: "https://images.unsplash.com/photo-1587314168485-3236d6710814?w=400&q=75", tag: "Veg", desc: "Toasted bread with seasoned vegetable filling", tc: "#7A8C6E", available: true },
  { id: 27, name: "Chicken Burger", cat: "Tea Time Snacks", price: 70, discount: 0, img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=75", tag: "Non-Veg", desc: "Juicy chicken burger with fresh sauces", tc: "#C94B4B", available: true },
  { id: 28, name: "Pineapple Pastry", cat: "Pastries", price: 75, discount: 0, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=75", tag: "Fresh", desc: "Delightful pastry with tropical pineapple flavor", tc: "#D4AF6E", available: true },
  { id: 29, name: "Butterscotch Pastry", cat: "Pastries", price: 80, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "Sweet", desc: "Rich creamy pastry with caramel butterscotch", tc: "#D4AF6E", available: true },
  { id: 30, name: "Black Forest Pastry", cat: "Pastries", price: 85, discount: 0, img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=400&q=75", tag: "Classic", desc: "Chocolate sponge with cherries and cream", tc: "#D4AF6E", available: true },
  { id: 31, name: "Chocolate Pastry", cat: "Pastries", price: 90, discount: 0, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=75", tag: "Rich", desc: "Decadent chocolate pastry slice", tc: "#C94B4B", available: true },
  { id: 32, name: "Rasmalai Pastry", cat: "Pastries", price: 100, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Special", desc: "Rasmalai flavored cream pastry", tc: "#C94B4B", available: true },
  { id: 33, name: "Red Velvet Pastry", cat: "Pastries", price: 100, discount: 0, img: "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&q=75", tag: "Popular", desc: "Red velvet slice with cream cheese frosting", tc: "#C94B4B", available: true },
  { id: 34, name: "Vanilla Pastry", cat: "Pastries", price: 80, discount: 0, img: "https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&q=75", tag: "Classic", desc: "Light vanilla cream pastry slice", tc: "#D4AF6E", available: true },
  { id: 35, name: "White Forest Pastry", cat: "Pastries", price: 85, discount: 0, img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=75", tag: "Special", desc: "White chocolate pastry with cream", tc: "#D4AF6E", available: true },
  { id: 36, name: "4 Piece Chocolate Muffin", cat: "Cupcakes", price: 150, discount: 0, img: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&q=75", tag: "Pack", desc: "4 rich chocolate muffins, freshly baked", tc: "#C94B4B", available: true },
  { id: 37, name: "4 Piece Vanilla Muffins", cat: "Cupcakes", price: 120, discount: 0, img: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&q=75", tag: "Pack", desc: "4 fluffy vanilla muffins, freshly baked", tc: "#D4AF6E", available: true },
  { id: 38, name: "Choco Chip Cookies", cat: "Cookies", price: 40, discount: 0, img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=75", tag: "Crispy", desc: "Golden cookies with chocolate chips — 6 pcs", tc: "#D4AF6E", available: true },
  { id: 39, name: "Badam Biscuits 250g", cat: "Cookies", price: 200, discount: 0, img: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&q=75", tag: "Premium", desc: "250g premium almond biscuits", tc: "#D4AF6E", available: true },
  { id: 40, name: "Balloon Pack", cat: "Celebration Items", price: 80, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Party", desc: "Colorful balloon pack for celebrations", tc: "#C94B4B", available: true },
  { id: 41, name: "Fancy Candles", cat: "Celebration Items", price: 40, discount: 0, img: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=400&q=75", tag: "Party", desc: "Fancy number or shape birthday candles", tc: "#C94B4B", available: true },
  { id: 42, name: "Birthday Banner", cat: "Celebration Items", price: 99, discount: 0, img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=75", tag: "Decor", desc: "Happy birthday decoration banner", tc: "#D4AF6E", available: true },
  { id: 43, name: "Normal Cake 500g", cat: "Normal Cakes", price: 300, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "500g", desc: "500g freshly baked normal cake", tc: "#D4AF6E", available: true },
  { id: 44, name: "Normal Cake 1kg", cat: "Normal Cakes", price: 550, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "1kg", desc: "1kg freshly baked normal cake", tc: "#D4AF6E", available: true },
  { id: 45, name: "Chocolate Cake 500g", cat: "Normal Cakes", price: 350, discount: 0, img: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=400&q=75", tag: "500g", desc: "500g fresh chocolate sponge cake", tc: "#C94B4B", available: true },
];

const CATEGORIES = ["All", "Eggless Cakes", "Birthday Cakes", "Tea Time Snacks", "Pastries", "Cupcakes", "Cookies", "Normal Cakes", "Celebration Items"];
const BESTSELLER_IDS = [1, 3, 4, 5, 22, 28, 30, 36];
const GALLERY_IMGS = [
  "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80",
  "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&q=80",
  "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?w=600&q=80",
  "https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=600&q=80",
  "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80",
  "https://images.unsplash.com/photo-1519869325930-281384150729?w=600&q=80",
  "https://images.unsplash.com/photo-1535254973040-607b474cb50d?w=600&q=80",
  "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=600&q=80",
  "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=600&q=80",
];
const FAQS = [
  { q: "Are your cakes made to order?", a: "Yes. We never keep cakes in pre-made stock. Every cake is freshly prepared within 15 minutes of receiving your order — guaranteed freshness every time." },
  { q: "How do I place an order?", a: "Add items to your cart, enter your name, phone, address and select your nearest branch at checkout. Your full order will be sent to us on WhatsApp, and we'll confirm within minutes." },
  { q: "Do you accept custom birthday cake orders?", a: "Absolutely. We accept any theme, any design, any message. Contact us on WhatsApp with your requirements — please order at least 24 hours in advance for custom designs." },
  { q: "What is the delivery charge?", a: "Orders above ₹300 qualify for FREE delivery across all our branches. For orders below ₹300, a flat ₹30 delivery charge applies." },
  { q: "Which areas do you deliver to?", a: "We deliver across Hyderabad from 4 branches — Madhapur, Nizampet, KPHB Colony, and HITEC City. Choose your nearest branch at checkout for the fastest delivery." },
  { q: "Can I cancel or modify my order?", a: "Once your order is confirmed on WhatsApp, please contact us immediately. We'll try our best to accommodate changes before preparation begins." },
];

const TESTIMONIALS = [
  { name: "Priya Sharma", loc: "Ayyappa Society", rating: 5, text: "The Black Forest cake was the centrepiece of my daughter's birthday — moist, fresh, and exactly on time. House of Bakers has earned a regular customer.", initials: "PS" },
  { name: "Rahul Mehta", loc: "Hitech City", rating: 5, text: "We ordered a custom cake for our office anniversary. The design matched our brief perfectly and the WhatsApp ordering made the whole process effortless.", initials: "RM" },
  { name: "Ananya Krishnan", loc: "Kondapur", rating: 5, text: "I've ordered the Red Velvet three times now. Every single time it's arrived fresh, moist, and exactly as described. Consistency is rare — they have it.", initials: "AK" },
  { name: "Kiran Patel", loc: "KPHB Colony", rating: 5, text: "Placed an order at 6 PM for a 7 PM delivery and it arrived warm from the oven. The 15-minute-fresh promise is real, not marketing.", initials: "KP" },
  { name: "Sneha Reddy", loc: "Nizampet", rating: 5, text: "Their pastries are the best in the neighbourhood. The Rasmalai pastry in particular — I haven't found anything close to it elsewhere in Hyderabad.", initials: "SR" },
];

// ─── Theme tokens ──────────────────────────────────────────────────────────────
const THEMES = {
  dark: {
    bg: "#0D0D0B", bgAlt: "#1A1916", bgRaised: "#2A2820",
    text: "#FAF7F2", textMuted: "rgba(250,247,242,.5)", textFaint: "rgba(250,247,242,.3)", textGhost: "rgba(250,247,242,.18)",
    gold: "#D4AF6E", goldDark: "#B8943A", goldFaint: "rgba(212,175,110,.1)", goldLine: "rgba(212,175,110,.12)",
    cardBg: "#1A1916", cardBorder: "rgba(212,175,110,.08)",
    inputBg: "rgba(212,175,110,.05)", inputBorder: "rgba(212,175,110,.15)",
    heroOverlay: "radial-gradient(ellipse 80% 70% at 60% 40%, rgba(212,175,110,.05) 0%, transparent 70%)",
  },
  light: {
    bg: "#FAF7F2", bgAlt: "#F0EBE0", bgRaised: "#FFFFFF",
    text: "#0D0D0B", textMuted: "rgba(13,13,11,.55)", textFaint: "rgba(13,13,11,.35)", textGhost: "rgba(13,13,11,.18)",
    gold: "#B8943A", goldDark: "#8C6D26", goldFaint: "rgba(184,148,58,.08)", goldLine: "rgba(184,148,58,.18)",
    cardBg: "#FFFFFF", cardBorder: "rgba(13,13,11,.08)",
    inputBg: "rgba(184,148,58,.04)", inputBorder: "rgba(13,13,11,.12)",
    heroOverlay: "radial-gradient(ellipse 80% 70% at 60% 40%, rgba(184,148,58,.07) 0%, transparent 70%)",
  },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const safeGet = (key, fallback) => {
  try { const v = typeof window !== "undefined" && window.localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
  catch { return fallback; }
};
const safeSave = (key, val) => {
  try { typeof window !== "undefined" && window.localStorage.setItem(key, JSON.stringify(val)); }
  catch {}
};
const effectivePrice = (p) => p.discount > 0 ? Math.round(p.price * (1 - p.discount / 100)) : p.price;
const deliveryCharge = (sub) => sub >= 300 ? 0 : 30;

// ─── WA SVG ───────────────────────────────────────────────────────────────────
const WA = ({ size = 20 }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// ─── Global styles injected once ─────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('${FONT_LINK}');
  .hob-serif { font-family: 'Cormorant Garant', Georgia, serif; }
  .hob-sans  { font-family: 'Outfit', system-ui, sans-serif; }
  .hob-root  { font-family: 'Outfit', system-ui, sans-serif; }
  @keyframes hob-float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
  @keyframes hob-float-b { 0%,100%{transform:translateY(-6px)} 50%{transform:translateY(8px)} }
  @keyframes hob-float-c { 0%,100%{transform:translateY(4px)} 50%{transform:translateY(-10px)} }
  @keyframes hob-fade-up { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes hob-slide-right { from{transform:translateX(100%)} to{transform:translateX(0)} }
  @keyframes hob-toast-in { from{opacity:0;transform:translateX(-50%) translateY(-8px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
  @keyframes hob-load-line { from{width:0} to{width:180px} }
  @keyframes hob-spin { to{transform:rotate(360deg)} }
  .hob-float-a { animation: hob-float-a 6s ease-in-out infinite; }
  .hob-float-b { animation: hob-float-b 7s ease-in-out infinite 1s; }
  .hob-float-c { animation: hob-float-c 5s ease-in-out infinite .5s; }
  .hob-fade-up { animation: hob-fade-up .8s ease both; }
  .hob-slide-right { animation: hob-slide-right .35s cubic-bezier(.16,1,.3,1) both; }
  .hob-load-line { animation: hob-load-line 1.8s ease forwards .3s; }
  .hob-toast { animation: hob-toast-in .3s ease both; }
  .hob-cart-item:not(:last-child) { border-bottom: 1px solid rgba(212,175,110,.1); }
  .hob-reveal { opacity:0; transform:translateY(20px); transition: opacity .7s ease, transform .7s ease; }
  .hob-reveal.visible { opacity:1; transform:translateY(0); }
  .hob-menu-card:hover .hob-menu-img { transform: scale(1.07); }
  .hob-coll-card:hover .hob-coll-img { transform: scale(1.06); filter: brightness(.65); }
  .hob-coll-card:hover .hob-coll-border { border-color: rgba(212,175,110,.4); }
  .hob-why-card:hover { background: rgba(212,175,110,.04); }
  .hob-why-card:hover .hob-why-line { transform: scaleX(1); }
  .hob-faq-a { max-height: 0; overflow: hidden; transition: max-height .4s ease; }
  .hob-faq-a.open { max-height: 300px; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0D0D0B; }
  ::-webkit-scrollbar-thumb { background: #D4AF6E; }

  /* Phase 1: theme transition, glass, counters, testimonials */
  .hob-root, .hob-root * { transition: background-color .4s ease, border-color .4s ease, color .4s ease; }
  .hob-glass { backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); }
  .hob-theme-toggle { transition: transform .3s cubic-bezier(.34,1.56,.64,1); }
  .hob-theme-toggle:hover { transform: rotate(20deg); }
  @keyframes hob-counter-pop { from{ transform: scale(0.92); opacity:.4; } to{ transform: scale(1); opacity:1; } }
  .hob-counter { animation: hob-counter-pop .4s ease both; }
  .hob-trust-badge { animation: hob-fade-up .7s ease both; }
  .hob-testimonial-card { transition: opacity .5s ease, transform .5s ease; }
  .hob-test-dot { transition: all .3s ease; cursor: pointer; }
  .hob-product-card-3d { transition: transform .35s cubic-bezier(.16,1,.3,1), box-shadow .35s ease; transform-style: preserve-3d; }
  .hob-badge-new { animation: hob-fade-up .5s ease both; }
  @keyframes hob-shimmer { 0%{background-position:-300px 0} 100%{background-position:300px 0} }
  .hob-skeleton { background: linear-gradient(90deg, rgba(212,175,110,.06) 0%, rgba(212,175,110,.16) 50%, rgba(212,175,110,.06) 100%); background-size: 300px 100%; animation: hob-shimmer 1.6s ease-in-out infinite; }
`;

// ─── Animated counter (Phase 1) ──────────────────────────────────────────────
function Counter({ target, suffix = "", duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setVal(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref} className="hob-counter">{val.toLocaleString()}{suffix}</span>;
}

// ─── Main Component ───────────────────────────────────────────────────────────
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
  const [adminState, setAdminState] = useState({ loginOpen: false, panelOpen: false, pwd: "", tab: "products", editing: null, ef: {} });
  const [specials, setSpecials] = useState("Chocolate Truffle Cake • Rasmalai Cake • Paneer Puff");
  const [specialsDraft, setSpecialsDraft] = useState("");
  const [themeName, setThemeName] = useState("dark");
  const [testiIndex, setTestiIndex] = useState(0);
  const theme = THEMES[themeName];

  // ── Theme persistence ──────────────────────────────────────────────────────
  useEffect(() => {
    const saved = safeGet("hob_theme", "dark");
    setThemeName(saved === "light" ? "light" : "dark");
  }, []);
  useEffect(() => { if (mounted) safeSave("hob_theme", themeName); }, [themeName, mounted]);
  const toggleTheme = () => setThemeName(t => t === "dark" ? "light" : "dark");

  // ── Testimonial auto-rotate ────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setTestiIndex(i => (i + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  // ── Mount & localStorage ───────────────────────────────────────────────────
  useEffect(() => {
    setMounted(true);
    const savedProds = safeGet("hob_products_v2", []);
    const savedCart = safeGet("hob_cart_v2", []);
    const savedSpecials = safeGet("hob_specials", "");
    if (savedProds.length) setProducts(savedProds);
    if (savedCart.length) setCart(savedCart);
    if (savedSpecials) setSpecials(savedSpecials);
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => { if (mounted) safeSave("hob_products_v2", products); }, [products, mounted]);
  useEffect(() => { if (mounted) safeSave("hob_cart_v2", cart); }, [cart, mounted]);
  useEffect(() => { if (mounted) safeSave("hob_specials", specials); }, [specials, mounted]);

  // ── Scroll listener ────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      document.querySelectorAll(".hob-reveal").forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add("visible");
      });
    };
    window.addEventListener("scroll", onScroll);
    setTimeout(onScroll, 300);
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted]);

  // ── Toast ──────────────────────────────────────────────────────────────────
  let toastTimer = useRef(null);
  const showToast = useCallback((msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  }, []);

  // ── Cart ───────────────────────────────────────────────────────────────────
  const cartSub = cart.reduce((a, i) => { const p = products.find(x => x.id === i.id); return p ? a + effectivePrice(p) * i.qty : a; }, 0);
  const cartDel = deliveryCharge(cartSub);
  const cartTot = cartSub + cartDel;
  const cartCount = cart.reduce((a, i) => a + i.qty, 0);

  const addToCart = (id) => {
    const p = products.find(x => x.id === id);
    if (!p) return;
    if (p.available === false) { showToast(`${p.name} is currently out of stock`); return; }
    setCart(prev => {
      const ex = prev.find(i => i.id === id);
      return ex ? prev.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i) : [...prev, { id, qty: 1 }];
    });
    showToast(`${p.name} added to cart ✓`);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const changeQty = (id, d) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(0, i.qty + d) } : i).filter(i => i.qty > 0));

  // ── WhatsApp order ─────────────────────────────────────────────────────────
  const sendWAOrder = () => {
    if (!customer.name || !customer.phone || !customer.address || !customer.branch) { showToast("Please fill all required fields"); return; }
    const lines = cart.map((it, i) => { const p = products.find(x => x.id === it.id); return p ? `${i + 1}. ${p.name} x ${it.qty} = ₹${effectivePrice(p) * it.qty}` : ""; }).filter(Boolean).join("\n");
    const msg = `Hello House of Bakers! 🎂\n\nCustomer: ${customer.name}\nPhone: ${customer.phone}\nBranch: ${customer.branch}\nDelivery Address: ${customer.address}\n\nOrder:\n${lines}\n\nSubtotal: ₹${cartSub}\nDelivery: ${cartDel === 0 ? "FREE ✅" : "₹" + cartDel}\nTotal: ₹${cartTot}\n\nPlease confirm my order. 🙏`;
    window.open(`https://wa.me/919246741544?text=${encodeURIComponent(msg)}`, "_blank");
    showToast("Order sent on WhatsApp! 🎉");
  };

  // ── Admin ──────────────────────────────────────────────────────────────────
  const tryAdminLogin = () => {
    if (adminState.pwd === "HOB2026@Admin#4488") setAdminState(a => ({ ...a, loginOpen: false, panelOpen: true, pwd: "" }));
    else { showToast("Incorrect password"); setAdminState(a => ({ ...a, pwd: "" })); }
  };
  const saveAdminEdit = (id) => {
    const ef = adminState.ef;
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...ef, price: Number(ef.price ?? p.price), discount: Number(ef.discount ?? 0) } : p));
    setAdminState(a => ({ ...a, editing: null, ef: {} }));
    showToast("Product updated");
  };
  const adminDelete = (id) => { if (!window.confirm("Delete this product?")) return; setProducts(prev => prev.filter(p => p.id !== id)); setCart(prev => prev.filter(i => i.id !== id)); showToast("Deleted"); };
  const adminAddProduct = () => {
    const n = { id: Date.now(), name: "New Item", cat: "Eggless Cakes", price: 299, discount: 0, img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=75", tag: "New", desc: "Fresh item — add description here", tc: "#D4AF6E", available: true };
    setProducts(prev => [...prev, n]);
    setAdminState(a => ({ ...a, editing: n.id, ef: { ...n } }));
  };

  const filteredProducts = menuCat === "All" ? products : products.filter(p => p.cat === menuCat);
  const bestSellers = BESTSELLER_IDS.map(id => products.find(p => p.id === id)).filter(Boolean);

  if (!mounted) return null;

  // ─────────────────────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Global styles */}
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />

      <div className="hob-root" style={{ background: theme.bg, color: theme.text, minHeight: "100vh", overflowX: "hidden", fontWeight: 300 }}>

        {/* ── LOADING SCREEN ── */}
        {loading && (
          <div style={{ position: "fixed", inset: 0, background: "#0D0D0B", zIndex: 9999, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 20 }}>
            <div className="hob-serif hob-fade-up" style={{ fontSize: "1.8rem", fontWeight: 300, letterSpacing: "0.25em", textTransform: "uppercase", color: "#FAF7F2" }}>House of Bakers</div>
            <div className="hob-load-line" style={{ height: 1, background: "#D4AF6E", width: 0 }} />
            <div className="hob-fade-up" style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#D4AF6E", animationDelay: "1.2s", opacity: 0 }}>Artisan Bakery · Hyderabad</div>
          </div>
        )}

        {/* ── NAVBAR ── */}
        <nav className="hob-glass" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "0 48px", height: 68, display: "flex", alignItems: "center", justifyContent: "space-between", transition: "all .4s", background: scrolled ? (themeName === "dark" ? "rgba(13,13,11,.82)" : "rgba(250,247,242,.82)") : "transparent", borderBottom: scrolled ? `1px solid ${theme.goldLine}` : "none" }}>
          <div className="hob-serif" style={{ fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", color: theme.text }}>
            House <span style={{ color: theme.gold }}>of</span> Bakers
          </div>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {["Collections", "Menu", "Gallery", "FAQ"].map(item => (
              <button key={item} onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "none", border: "none", color: theme.textMuted, fontSize: "0.68rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = theme.gold} onMouseLeave={e => e.currentTarget.style.color = theme.textMuted}>
                {item}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button onClick={toggleTheme} className="hob-theme-toggle" title={themeName === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              style={{ background: theme.goldFaint, border: `1px solid ${theme.goldLine}`, color: theme.gold, width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "0.95rem" }}>
              {themeName === "dark" ? "☀️" : "🌙"}
            </button>
            <button onClick={() => setCartOpen(true)} style={{ background: theme.goldFaint, border: `1px solid ${theme.goldLine}`, color: theme.gold, padding: "0.4rem 1.1rem", borderRadius: 99, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all .2s" }}>
              🛒 Cart <span style={{ background: theme.gold, color: theme.bg, borderRadius: 99, padding: "1px 7px", fontSize: "0.6rem", fontWeight: 600, minWidth: 18, textAlign: "center" }}>{cartCount}</span>
            </button>
            <button onClick={() => setAdminState(a => ({ ...a, loginOpen: true }))} style={{ background: "none", border: "none", color: "rgba(250,247,242,.3)", fontSize: "0.8rem", cursor: "pointer" }}>🔑</button>
          </div>
        </nav>

        {/* ── TODAY'S SPECIALS BANNER ── */}
        {specials && (
          <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 99, background: theme.gold, color: theme.bg, padding: "7px 24px", textAlign: "center", fontSize: "0.74rem", letterSpacing: "0.02em" }}>
            <strong style={{ fontWeight: 600 }}>Freshly Baked Today</strong> &nbsp;·&nbsp; {specials}
          </div>
        )}

        {/* ── HERO ── */}
        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "162px 48px 80px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: theme.heroOverlay }} />
          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", position: "relative", zIndex: 2 }}>
            <div>
              <div className="hob-fade-up" style={{ fontSize: "0.65rem", letterSpacing: "0.28em", textTransform: "uppercase", color: theme.gold, marginBottom: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ display: "block", width: 28, height: 1, background: theme.gold }} />
                Artisan Bakery · Hyderabad
              </div>
              <h1 className="hob-serif hob-fade-up" style={{ fontSize: "clamp(2.8rem,7vw,5.2rem)", fontWeight: 300, lineHeight: 1.05, color: theme.text, marginBottom: 28, animationDelay: "0.15s" }}>
                Crafted With<br />Love.
                <em style={{ fontStyle: "italic", color: theme.gold, display: "block" }}>Baked Fresh.</em>
              </h1>
              <p className="hob-fade-up" style={{ fontSize: "0.95rem", fontWeight: 300, lineHeight: 1.85, color: theme.textMuted, maxWidth: 420, marginBottom: 32, animationDelay: "0.3s" }}>
                Premium artisan cakes, pastries and bakery delights made to order daily. Each creation tells a story — yours.
              </p>
              {/* Trust badges */}
              <div className="hob-fade-up" style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 32, animationDelay: "0.38s" }}>
                {[["⭐ 4.9", "Rated by customers"], ["10,000+", "Happy customers"], ["50,000+", "Cakes delivered"]].map(([n, l]) => (
                  <div key={l} className="hob-trust-badge" style={{ background: theme.goldFaint, border: `1px solid ${theme.goldLine}`, padding: "8px 16px", display: "flex", flexDirection: "column", gap: 1 }}>
                    <span className="hob-serif" style={{ fontSize: "0.95rem", color: theme.gold, fontWeight: 500 }}>{n}</span>
                    <span style={{ fontSize: "0.6rem", color: theme.textFaint, letterSpacing: "0.04em" }}>{l}</span>
                  </div>
                ))}
              </div>
              <div className="hob-fade-up" style={{ display: "flex", gap: 20, flexWrap: "wrap", animationDelay: "0.5s" }}>
                <button onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ background: theme.gold, color: theme.bg, border: "none", padding: "0.9rem 2.2rem", fontSize: "0.72rem", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all .25s" }}
                  onMouseEnter={e => e.currentTarget.style.background = theme.goldDark} onMouseLeave={e => e.currentTarget.style.background = theme.gold}>
                  Browse Menu
                </button>
                <button onClick={() => document.getElementById("collections")?.scrollIntoView({ behavior: "smooth" })}
                  style={{ background: "none", border: `1px solid ${theme.goldLine}`, color: theme.gold, padding: "0.9rem 2.2rem", fontSize: "0.72rem", fontWeight: 400, letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = theme.goldFaint; e.currentTarget.style.borderColor = theme.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.borderColor = theme.goldLine; }}>
                  Our Collections
                </button>
              </div>
            </div>
            {/* Floating cake images */}
            <div style={{ position: "relative", height: 520 }}>
              {[
                { src: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80", label: "Black Forest", cls: "hob-float-a", style: { width: 270, height: 330, top: 30, right: 50 } },
                { src: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80", label: "Pastry", cls: "hob-float-b", style: { width: 170, height: 210, top: 170, right: 290 } },
                { src: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=300&q=80", label: "Cupcake", cls: "hob-float-c", style: { width: 135, height: 155, bottom: 40, right: 95 } },
              ].map((fc) => (
                <div key={fc.label} className={fc.cls} style={{ position: "absolute", overflow: "hidden", boxShadow: "0 24px 64px rgba(0,0,0,.5)", borderRadius: 6, ...fc.style }}>
                  <img src={fc.src} alt={fc.label} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => e.currentTarget.style.display = "none"} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(13,13,11,.9),transparent)", padding: "20px 14px 12px", fontFamily: "'Cormorant Garant',serif", fontSize: "0.85rem", color: "#FAF7F2" }}>{fc.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS STRIP (animated counters) ── */}
        <div style={{ background: theme.goldFaint, borderTop: `1px solid ${theme.goldLine}`, borderBottom: `1px solid ${theme.goldLine}` }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {[[10000, "+", "Happy Customers"], [50000, "+", "Cakes Delivered"], [4, "", "Hyderabad Branches"], [15, " min", "Fresh to Order"]].map(([n, suffix, l], i) => (
              <div key={i} style={{ padding: "40px 28px", borderRight: i < 3 ? `1px solid ${theme.goldLine}` : "none", textAlign: "center" }}>
                <div className="hob-serif" style={{ fontSize: "2.4rem", fontWeight: 300, color: theme.gold, lineHeight: 1 }}>
                  <Counter target={n} suffix={suffix} />
                </div>
                <div style={{ fontSize: "0.68rem", letterSpacing: "0.14em", textTransform: "uppercase", color: theme.textFaint, marginTop: 8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── COLLECTIONS ── */}
        <section id="collections" style={{ padding: "100px 48px", background: "#0D0D0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: "#D4AF6E", display: "block" }} /> Our Offerings
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 16 }}>Signature Collections</h2>
              <div style={{ width: 56, height: 1, background: "#D4AF6E", marginBottom: 52 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }} className="hob-reveal">
              {[
                { label: "Signature Cakes", sub: "Collection 01", cat: "Eggless Cakes", img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80" },
                { label: "Artisan Pastries", sub: "Collection 02", cat: "Pastries", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80" },
                { label: "Bakery Specials", sub: "Collection 03", cat: "Tea Time Snacks", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80" },
              ].map((c) => (
                <div key={c.label} className="hob-coll-card" style={{ position: "relative", overflow: "hidden", cursor: "pointer", aspectRatio: "0.75" }}
                  onClick={() => { setMenuCat(c.cat); document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" }); }}>
                  <img className="hob-coll-img" src={c.img} alt={c.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .7s ease, filter .4s", filter: "brightness(.5)" }} onError={e => e.currentTarget.style.display = "none"} />
                  <div className="hob-coll-border" style={{ position: "absolute", inset: 12, border: "1px solid transparent", transition: "border-color .4s", pointerEvents: "none" }} />
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px 28px", background: "linear-gradient(to top,rgba(13,13,11,.85) 0%,transparent 60%)" }}>
                    <div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 8 }}>{c.sub}</div>
                    <div className="hob-serif" style={{ fontSize: "1.65rem", fontWeight: 300, color: "#FAF7F2", marginBottom: 16 }}>{c.label}</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, border: "1px solid rgba(212,175,110,.5)", color: "#D4AF6E", padding: "0.45rem 1.1rem", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", width: "fit-content", transition: "all .25s" }}>
                      Explore →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BEST SELLERS ── */}
        <section style={{ padding: "100px 48px", background: "#1A1916" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: "#D4AF6E", display: "block" }} /> Most Loved
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 16 }}>Best Sellers</h2>
              <div style={{ width: 56, height: 1, background: "#D4AF6E", marginBottom: 52 }} />
            </div>
            <div style={{ display: "flex", gap: 20, overflowX: "auto", paddingBottom: 8, scrollbarWidth: "none" }}>
              {bestSellers.map((p) => {
                const isOut = p.available === false;
                return (
                <div key={p.id} style={{ minWidth: 272, background: "#2A2820", border: "1px solid rgba(212,175,110,.08)", flexShrink: 0, transition: "all .3s", cursor: "pointer", opacity: isOut ? 0.55 : 1 }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,110,.3)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,110,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ height: 195, overflow: "hidden", position: "relative" }}>
                    <img src={p.img} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s", filter: isOut ? "grayscale(.5)" : "none" }} onError={e => e.currentTarget.style.display = "none"}
                      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.07)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"} />
                    {!isOut && <div style={{ position: "absolute", top: 12, left: 12, background: "#D4AF6E", color: "#0D0D0B", fontSize: "0.6rem", fontWeight: 600, padding: "3px 8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>★ Best Seller</div>}
                    {isOut && <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,11,.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ background: "#C94B4B", color: "#fff", padding: "5px 14px", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Out of Stock</span>
                    </div>}
                  </div>
                  <div style={{ padding: 20 }}>
                    <div style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 6 }}>{p.cat}</div>
                    <div className="hob-serif" style={{ fontSize: "1.1rem", fontWeight: 400, color: "#FAF7F2", marginBottom: 8 }}>{p.name}</div>
                    <div style={{ fontSize: "0.74rem", color: "rgba(250,247,242,.4)", lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div className="hob-serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#D4AF6E" }}>₹{effectivePrice(p)}</div>
                      {isOut ? (
                        <span style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C94B4B", fontWeight: 600 }}>Unavailable</span>
                      ) : (
                        <button onClick={() => addToCart(p.id)} style={{ background: "none", border: "1px solid rgba(212,175,110,.35)", color: "#D4AF6E", padding: "0.38rem 0.875rem", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "#D4AF6E"; e.currentTarget.style.color = "#0D0D0B"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#D4AF6E"; }}>
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );})}
            </div>
          </div>
        </section>

        {/* ── FULL MENU ── */}
        <section id="menu" style={{ padding: "100px 48px", background: "#FAF7F2", color: "#0D0D0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B8943A", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 24, height: 1, background: "#B8943A", display: "block" }} /> Full Menu
            </div>
            <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#0D0D0B", marginBottom: 16 }}>Every Item, Fresh</h2>
            <div style={{ width: 56, height: 1, background: "#B8943A", marginBottom: 0 }} />
            {/* Category filters */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "36px 0 32px" }}>
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setMenuCat(cat)}
                  style={{ background: menuCat === cat ? "#0D0D0B" : "none", border: `1px solid ${menuCat === cat ? "#0D0D0B" : "rgba(13,13,11,.15)"}`, color: menuCat === cat ? "#FAF7F2" : "rgba(13,13,11,.5)", padding: "0.42rem 1.1rem", borderRadius: 99, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s" }}>
                  {cat}
                </button>
              ))}
            </div>
            {/* Product grid */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: "center", padding: "48px", color: "rgba(13,13,11,.3)", fontSize: "0.9rem" }}>No products in this category yet.</div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(236px,1fr))", gap: 20 }}>
                {filteredProducts.map((p, i) => {
                  const fp = effectivePrice(p);
                  const isOut = p.available === false;
                  return (
                    <div key={p.id} className="hob-menu-card" style={{ background: "#fff", border: "1px solid rgba(13,13,11,.06)", overflow: "hidden", transition: "all .35s", cursor: "pointer", opacity: isOut ? 0.6 : 1 }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 48px rgba(13,13,11,.12)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                      <div style={{ height: 195, overflow: "hidden", position: "relative" }}>
                        <img className="hob-menu-img" src={p.img} alt={p.name} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s", filter: isOut ? "grayscale(.5)" : "none" }} onError={e => e.currentTarget.style.display = "none"} />
                        {p.tag && !isOut && <div style={{ position: "absolute", top: 10, left: 10, background: p.tc || "#D4AF6E", color: "#fff", padding: "3px 9px", fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase" }}>{p.tag}</div>}
                        {p.discount > 0 && !isOut && <div style={{ position: "absolute", top: 10, right: 10, background: "#22C55E", color: "#fff", padding: "3px 8px", fontSize: "0.62rem", fontWeight: 600 }}>{p.discount}% OFF</div>}
                        {isOut && <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,11,.45)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ background: "#C94B4B", color: "#fff", padding: "5px 14px", fontSize: "0.68rem", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>Out of Stock</span>
                        </div>}
                      </div>
                      <div style={{ padding: "16px 18px" }}>
                        <div style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#B8943A", marginBottom: 5 }}>{p.cat}</div>
                        <div className="hob-serif" style={{ fontSize: "1rem", fontWeight: 500, color: "#0D0D0B", marginBottom: 5 }}>{p.name}</div>
                        <div style={{ fontSize: "0.72rem", color: "rgba(13,13,11,.45)", lineHeight: 1.6, marginBottom: 14 }}>{p.desc}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div>
                            <span className="hob-serif" style={{ fontSize: "1.2rem", fontWeight: 400, color: "#0D0D0B" }}>₹{fp}</span>
                            {p.discount > 0 && <span style={{ fontSize: "0.7rem", color: "rgba(13,13,11,.3)", textDecoration: "line-through", marginLeft: 5 }}>₹{p.price}</span>}
                          </div>
                          {isOut ? (
                            <span style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#C94B4B", fontWeight: 600 }}>Unavailable</span>
                          ) : (
                            <button onClick={() => addToCart(p.id)} style={{ background: "#0D0D0B", color: "#FAF7F2", border: "none", padding: "0.4rem 0.9rem", fontSize: "0.68rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "background .2s" }}
                              onMouseEnter={e => e.currentTarget.style.background = "#B8943A"} onMouseLeave={e => e.currentTarget.style.background = "#0D0D0B"}>
                              Add +
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* ── WHY US ── */}
        <section style={{ padding: "100px 48px", background: "#0D0D0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: "#D4AF6E", display: "block" }} /> The Difference
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 16 }}>Why House of Bakers</h2>
              <div style={{ width: 56, height: 1, background: "#D4AF6E", marginBottom: 52 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }} className="hob-reveal">
              {[
                ["01", "Made to Order", "No pre-made stock. Every cake is freshly crafted within 15 minutes of your order — maximum freshness, every time."],
                ["02", "Premium Ingredients", "We use only the finest ingredients — real butter, fresh cream, premium chocolate. No shortcuts in our kitchen."],
                ["03", "Custom Creations", "Any theme. Any message. Any occasion. Our bakers bring your vision to life — birthdays, weddings, anniversaries."],
                ["04", "4 City Branches", "Madhapur, Nizampet, KPHB Colony, and HITEC City. We're close to you, wherever you are in Hyderabad."],
                ["05", "Free Delivery", "Orders above ₹300 enjoy free delivery across all branches. Below ₹300? Just ₹30 delivery charge."],
                ["06", "WhatsApp Simple", "Order confirmation on WhatsApp in minutes. No apps, no hassle. Just add to cart and checkout."],
              ].map(([num, title, body]) => (
                <div key={num} className="hob-why-card" style={{ padding: "44px 32px", border: "1px solid rgba(212,175,110,.07)", position: "relative", overflow: "hidden", transition: "all .3s" }}>
                  <div className="hob-why-line" style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "#D4AF6E", transform: "scaleX(0)", transition: "transform .4s ease", transformOrigin: "left" }} />
                  <div className="hob-serif" style={{ fontSize: "3.5rem", fontWeight: 300, color: "rgba(212,175,110,.12)", lineHeight: 1, marginBottom: 18 }}>{num}</div>
                  <div className="hob-serif" style={{ fontSize: "1.2rem", fontWeight: 400, color: "#FAF7F2", marginBottom: 10 }}>{title}</div>
                  <div style={{ fontSize: "0.8rem", fontWeight: 300, lineHeight: 1.8, color: "rgba(250,247,242,.4)" }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── GALLERY ── */}
        <section id="gallery" style={{ padding: "100px 48px", background: "#1A1916" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: "#D4AF6E", display: "block" }} /> Our Work
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 16 }}>Bakery Gallery</h2>
              <div style={{ width: 56, height: 1, background: "#D4AF6E", marginBottom: 48 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }} className="hob-reveal">
              {GALLERY_IMGS.map((img, i) => (
                <div key={i} style={{ position: "relative", overflow: "hidden", aspectRatio: "1", cursor: "pointer" }}>
                  <img src={img} alt={`Gallery ${i + 1}`} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform .5s, filter .4s", filter: "brightness(.75)" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.06)"; e.currentTarget.style.filter = "brightness(1)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "brightness(.75)"; }}
                    onError={e => e.currentTarget.style.display = "none"} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ORDER JOURNEY ── */}
        <section style={{ padding: "100px 48px", background: "#F0EBE0", color: "#0D0D0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#B8943A", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ width: 24, height: 1, background: "#B8943A", display: "block" }} /> How It Works
            </div>
            <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#0D0D0B", marginBottom: 16 }}>Order in 4 Simple Steps</h2>
            <div style={{ width: 56, height: 1, background: "#B8943A", marginBottom: 52 }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 0 }} className="hob-reveal">
              {[["01", "Browse Menu", "Explore our full collection of cakes, pastries and bakery delights"], ["02", "Add to Cart", "Select items and quantities in our interactive cart"], ["03", "Enter Details", "Name, phone, address and your nearest branch"], ["04", "WhatsApp Confirm", "Full order sent to us — ready in 15 minutes"]].map(([num, title, body], i) => (
                <div key={num} style={{ textAlign: "center", padding: "0 24px" }}>
                  <div style={{ width: 64, height: 64, border: "1px solid #B8943A", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontFamily: "'Cormorant Garant',serif", fontSize: "1.3rem", fontWeight: 300, color: "#B8943A", background: "#F0EBE0" }}>{num}</div>
                  <div className="hob-serif" style={{ fontSize: "1.1rem", fontWeight: 400, color: "#0D0D0B", marginBottom: 8 }}>{title}</div>
                  <div style={{ fontSize: "0.78rem", fontWeight: 300, color: "rgba(13,13,11,.5)", lineHeight: 1.7 }}>{body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BRANCHES ── */}
        <section style={{ padding: "100px 48px", background: "#0D0D0B" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: "#D4AF6E", display: "block" }} /> Find Us
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: "#FAF7F2", marginBottom: 16 }}>Our 4 Branches</h2>
              <div style={{ width: 56, height: 1, background: "#D4AF6E", marginBottom: 52 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }} className="hob-reveal">
              {BRANCHES.map(b => (
                <div key={b.id} style={{ background: "#1A1916", border: "1px solid rgba(212,175,110,.08)", padding: "32px 28px", transition: "all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,175,110,.3)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,175,110,.08)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#D4AF6E", marginBottom: 6 }}>Branch {b.id.toString().padStart(2, "0")}</div>
                  <div className="hob-serif" style={{ fontSize: "1.2rem", fontWeight: 400, color: "#FAF7F2", marginBottom: 8 }}>House of Bakers — {b.name}</div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(250,247,242,.45)", lineHeight: 1.75, marginBottom: 6 }}>{b.addr}</div>
                  <div style={{ fontSize: "0.78rem", color: "rgba(250,247,242,.35)", marginBottom: 16 }}>🕐 {b.timing}</div>
                  <a href={`tel:${b.ph.replace(/\s/g, "")}`} style={{ display: "block", fontSize: "0.82rem", color: "#FAF7F2", fontWeight: 400, marginBottom: 16, textDecoration: "none" }}>📞 {b.ph}</a>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <a href={`https://wa.me/${b.wa}`} target="_blank" rel="noreferrer" style={{ background: "#25D366", color: "#fff", padding: "0.4rem 1rem", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <WA size={14} /> WhatsApp
                    </a>
                    <a href={b.maps} target="_blank" rel="noreferrer" style={{ background: "#2A2820", color: "#FAF7F2", padding: "0.4rem 1rem", fontSize: "0.68rem", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "none" }}>
                      📍 Maps
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS (carousel) ── */}
        <section style={{ padding: "100px 48px", background: theme.bg }}>
          <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: theme.gold, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: theme.gold, display: "block" }} /> Customer Stories <span style={{ width: 24, height: 1, background: theme.gold, display: "block" }} />
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: theme.text, marginBottom: 48 }}>What Hyderabad Is Saying</h2>
            </div>
            <div style={{ position: "relative", minHeight: 220 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} className="hob-testimonial-card" style={{ position: i === testiIndex ? "relative" : "absolute", inset: i === testiIndex ? "auto" : 0, opacity: i === testiIndex ? 1 : 0, transform: i === testiIndex ? "translateY(0)" : "translateY(10px)", pointerEvents: i === testiIndex ? "auto" : "none" }}>
                  <div style={{ color: "#F59E0B", fontSize: "1rem", marginBottom: 20 }}>{"★".repeat(t.rating)}</div>
                  <p className="hob-serif" style={{ fontSize: "1.3rem", fontWeight: 300, fontStyle: "italic", color: theme.text, lineHeight: 1.6, marginBottom: 28, maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
                    "{t.text}"
                  </p>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
                    <div style={{ width: 40, height: 40, borderRadius: "50%", background: theme.goldFaint, border: `1px solid ${theme.goldLine}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 600, color: theme.gold }}>{t.initials}</div>
                    <div style={{ textAlign: "left" }}>
                      <div style={{ fontSize: "0.85rem", color: theme.text, fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: "0.72rem", color: theme.gold }}>{t.loc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 36 }}>
              {TESTIMONIALS.map((_, i) => (
                <span key={i} className="hob-test-dot" onClick={() => setTestiIndex(i)}
                  style={{ width: i === testiIndex ? 22 : 7, height: 7, borderRadius: 4, background: i === testiIndex ? theme.gold : theme.goldLine }} />
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" style={{ padding: "100px 48px", background: theme.bgAlt }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div className="hob-reveal">
              <div style={{ fontSize: "0.63rem", letterSpacing: "0.28em", textTransform: "uppercase", color: theme.gold, marginBottom: 16, display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ width: 24, height: 1, background: theme.gold, display: "block" }} /> Questions
              </div>
              <h2 className="hob-serif" style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, color: theme.text, marginBottom: 16 }}>Frequently Asked</h2>
              <div style={{ width: 56, height: 1, background: theme.gold, marginBottom: 52 }} />
            </div>
            <div style={{ maxWidth: 760 }} className="hob-reveal">
              {FAQS.map((f, i) => (
                <div key={i} style={{ borderBottom: `1px solid ${theme.goldLine}` }}>
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: "100%", background: "none", border: "none", color: openFaq === i ? theme.gold : theme.text, fontFamily: "'Cormorant Garant',serif", fontSize: "1.05rem", fontWeight: 300, textAlign: "left", padding: "22px 0", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", transition: "color .2s" }}>
                    {f.q}
                    <span style={{ color: theme.gold, transition: "transform .3s", transform: openFaq === i ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                  </button>
                  <div className={`hob-faq-a${openFaq === i ? " open" : ""}`}>
                    <p style={{ fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.85, color: theme.textMuted, paddingBottom: 20 }}>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WA CTA ── */}
        <section style={{ background: "#D4AF6E", padding: "80px 48px", textAlign: "center" }}>
          <h2 className="hob-serif" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 300, color: "#0D0D0B", marginBottom: 12 }}>Ready to Order Your Dream Cake?</h2>
          <p style={{ fontSize: "0.88rem", color: "rgba(13,13,11,.6)", marginBottom: 36, fontWeight: 300 }}>Add items to cart and we'll confirm your order on WhatsApp in minutes.</p>
          <button onClick={() => setCartOpen(true)} style={{ background: "#0D0D0B", color: "#FAF7F2", border: "none", padding: "1rem 2.5rem", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 10, transition: "all .25s" }}
            onMouseEnter={e => e.currentTarget.style.background = "#2A2820"} onMouseLeave={e => e.currentTarget.style.background = "#0D0D0B"}>
            <WA /> Open Cart & Order
          </button>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ background: "#0D0D0B", borderTop: "1px solid rgba(212,175,110,.08)", padding: "64px 48px 32px" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            <div>
              <div className="hob-serif" style={{ fontSize: "1.4rem", fontWeight: 300, letterSpacing: "0.15em", textTransform: "uppercase", color: "#FAF7F2", marginBottom: 14 }}>
                House <span style={{ color: "#D4AF6E" }}>of</span> Bakers
              </div>
              <p style={{ fontSize: "0.78rem", color: "rgba(250,247,242,.3)", lineHeight: 1.85, maxWidth: 250 }}>Artisan cakes and bakery delights crafted fresh to order across 4 Hyderabad branches.</p>
            </div>
            <div>
              <div style={{ fontSize: "0.62rem", color: "#D4AF6E", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>Navigate</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Collections", "Menu", "Gallery", "FAQ"].map(l => (
                  <button key={l} onClick={() => document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: "smooth" })}
                    style={{ background: "none", border: "none", color: "rgba(250,247,242,.35)", fontSize: "0.8rem", textAlign: "left", cursor: "pointer", padding: 0, transition: "color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#D4AF6E"} onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,242,.35)"}>
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.62rem", color: "#D4AF6E", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>Branches</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {BRANCHES.map(b => (
                  <a key={b.id} href={b.maps} target="_blank" rel="noreferrer" style={{ color: "rgba(250,247,242,.35)", fontSize: "0.8rem", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => e.currentTarget.style.color = "#D4AF6E"} onMouseLeave={e => e.currentTarget.style.color = "rgba(250,247,242,.35)"}>
                    📍 {b.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: "0.62rem", color: "#D4AF6E", letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 20 }}>Contact</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="tel:+919246741544" style={{ color: "rgba(250,247,242,.35)", fontSize: "0.8rem", textDecoration: "none" }}>📞 +91 92467 41544</a>
                <a href="https://wa.me/919246741544" target="_blank" rel="noreferrer" style={{ color: "rgba(250,247,242,.35)", fontSize: "0.8rem", textDecoration: "none" }}>💬 WhatsApp Us</a>
                <span style={{ color: "rgba(250,247,242,.35)", fontSize: "0.8rem" }}>🕐 6 AM – 1 AM Daily</span>
              </div>
            </div>
          </div>
          <div style={{ maxWidth: 1200, margin: "0 auto", paddingTop: 24, borderTop: "1px solid rgba(212,175,140,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: "0.68rem", color: "rgba(250,247,242,.2)" }}>© 2026 House of Bakers, Hyderabad. All rights reserved.</div>
            <div style={{ fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,175,110,.5)" }}>Hyderabad · India</div>
          </div>
        </footer>

        {/* ── WA FLOAT ── */}
        <a href="https://wa.me/919246741544?text=Hello%20House%20of%20Bakers!" target="_blank" rel="noreferrer"
          style={{ position: "fixed", bottom: 28, right: 28, zIndex: 400, width: 54, height: 54, background: "#25D366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(37,211,102,.4)", color: "#fff", textDecoration: "none", transition: "transform .2s" }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
          <WA size={26} />
        </a>

        {/* ── TOAST ── */}
        {toast && (
          <div className="hob-toast" style={{ position: "fixed", top: 80, left: "50%", transform: "translateX(-50%)", background: "#1A1916", border: "1px solid rgba(212,175,110,.25)", color: "#FAF7F2", padding: "0.65rem 1.4rem", fontSize: "0.78rem", letterSpacing: "0.06em", zIndex: 800, boxShadow: "0 8px 32px rgba(0,0,0,.5)", whiteSpace: "nowrap" }}>
            {toast}
          </div>
        )}

        {/* ── CART DRAWER ── */}
        {cartOpen && (
          <div>
            <div onClick={() => setCartOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(13,13,11,.7)", zIndex: 500 }} />
            <div className="hob-slide-right" style={{ position: "fixed", right: 0, top: 0, bottom: 0, width: "min(440px,100vw)", background: "#1A1916", zIndex: 501, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(212,175,110,.1)" }}>
              <div style={{ padding: "28px", borderBottom: "1px solid rgba(212,175,110,.1)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div className="hob-serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#FAF7F2" }}>Your Cart {cartCount > 0 && `(${cartCount})`}</div>
                <button onClick={() => setCartOpen(false)} style={{ background: "none", border: "1px solid rgba(212,175,110,.2)", color: "rgba(250,247,242,.4)", padding: "0.35rem 0.75rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Close ✕</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: "16px 28px" }}>
                {cart.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "48px 20px", color: "rgba(250,247,242,.25)" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🛒</div>
                    <p style={{ fontSize: "0.85rem", lineHeight: 1.7 }}>Your cart is empty.<br />Browse our menu and add some items.</p>
                  </div>
                ) : cart.map(item => {
                  const p = products.find(x => x.id === item.id);
                  if (!p) return null;
                  return (
                    <div key={item.id} className="hob-cart-item" style={{ display: "flex", gap: 14, padding: "16px 0" }}>
                      <img src={p.img} alt={p.name} style={{ width: 58, height: 58, objectFit: "cover", flexShrink: 0 }} onError={e => e.currentTarget.style.display = "none"} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="hob-serif" style={{ fontSize: "0.95rem", color: "#FAF7F2", marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                        <div style={{ fontSize: "0.78rem", color: "#D4AF6E" }}>₹{effectivePrice(p)} each</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
                          <button onClick={() => changeQty(p.id, -1)} style={{ background: "rgba(212,175,110,.1)", border: "none", color: "#D4AF6E", width: 26, height: 26, cursor: "pointer", fontSize: "0.9rem" }}>−</button>
                          <span style={{ fontSize: "0.82rem", color: "#FAF7F2", minWidth: 18, textAlign: "center" }}>{item.qty}</span>
                          <button onClick={() => changeQty(p.id, 1)} style={{ background: "rgba(212,175,110,.1)", border: "none", color: "#D4AF6E", width: 26, height: 26, cursor: "pointer", fontSize: "0.9rem" }}>+</button>
                          <button onClick={() => removeFromCart(p.id)} style={{ background: "none", border: "none", color: "rgba(250,247,242,.25)", fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", marginLeft: "auto" }}>Remove</button>
                        </div>
                      </div>
                      <div className="hob-serif" style={{ fontSize: "0.95rem", color: "#D4AF6E", flexShrink: 0 }}>₹{effectivePrice(p) * item.qty}</div>
                    </div>
                  );
                })}
              </div>
              {cart.length > 0 && (
                <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(212,175,110,.1)" }}>
                  {cartDel === 0
                    ? <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", padding: "0.4rem 0.875rem", fontSize: "0.72rem", color: "#22C55E", marginBottom: 14, textAlign: "center" }}>✅ You qualify for FREE delivery!</div>
                    : <div style={{ fontSize: "0.72rem", color: "rgba(212,175,110,.6)", marginBottom: 14, textAlign: "center" }}>Add ₹{300 - cartSub} more for FREE delivery</div>}
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(250,247,242,.4)", marginBottom: 8 }}><span>Subtotal</span><span style={{ color: "#D4AF6E" }}>₹{cartSub}</span></div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(250,247,242,.4)", marginBottom: 8 }}><span>Delivery</span><span style={{ color: cartDel === 0 ? "#22C55E" : "#D4AF6E" }}>{cartDel === 0 ? "FREE ✅" : `₹${cartDel}`}</span></div>
                  <div className="hob-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", color: "#FAF7F2", paddingTop: 10, borderTop: "1px solid rgba(212,175,110,.1)", marginBottom: 20 }}>
                    <span>Total</span><span style={{ color: "#D4AF6E" }}>₹{cartTot}</span>
                  </div>
                  <button onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}
                    style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <WA /> Checkout via WhatsApp
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── CHECKOUT PANEL ── */}
        {checkoutOpen && (
          <div style={{ position: "fixed", inset: 0, background: "#0D0D0B", zIndex: 600, overflowY: "auto" }}>
            <div style={{ maxWidth: 640, margin: "0 auto", padding: "60px 32px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 40 }}>
                <button onClick={() => { setCheckoutOpen(false); setCartOpen(true); }} style={{ background: "none", border: "1px solid rgba(212,175,110,.2)", color: "#D4AF6E", padding: "0.4rem 0.875rem", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>← Back</button>
                <h2 className="hob-serif" style={{ fontSize: "2rem", fontWeight: 300, color: "#FAF7F2" }}>Checkout</h2>
              </div>
              {/* Order summary */}
              <div style={{ background: "rgba(212,175,110,.04)", border: "1px solid rgba(212,175,110,.1)", padding: 20, marginBottom: 28 }}>
                <div style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.35)", marginBottom: 14 }}>Order Summary</div>
                {cart.map(it => { const p = products.find(x => x.id === it.id); return p ? <div key={it.id} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(250,247,242,.4)", marginBottom: 7 }}><span>{p.name} × {it.qty}</span><span>₹{effectivePrice(p) * it.qty}</span></div> : null; })}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(250,247,242,.4)", marginBottom: 7 }}><span>Delivery</span><span style={{ color: cartDel === 0 ? "#22C55E" : "#D4AF6E" }}>{cartDel === 0 ? "FREE ✅" : `₹${cartDel}`}</span></div>
                <div className="hob-serif" style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", color: "#FAF7F2", paddingTop: 12, borderTop: "1px solid rgba(212,175,110,.1)", marginTop: 4 }}>
                  <span>Total</span><span style={{ color: "#D4AF6E" }}>₹{cartTot}</span>
                </div>
              </div>
              {/* Fields */}
              {[["Your Name *", "text", "name", "Full name"], ["Phone Number *", "tel", "phone", "+91 XXXXX XXXXX"]].map(([label, type, key, ph]) => (
                <div key={key} style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.35)", marginBottom: 8 }}>{label}</label>
                  <input type={type} placeholder={ph} value={customer[key]} onChange={e => setCustomer(c => ({ ...c, [key]: e.target.value }))}
                    style={{ width: "100%", background: "rgba(212,175,110,.05)", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.85rem 1rem", fontSize: "0.88rem", fontFamily: "'Outfit',sans-serif", fontWeight: 300, outline: "none" }} />
                </div>
              ))}
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.35)", marginBottom: 8 }}>Delivery Address *</label>
                <textarea rows={3} placeholder="Door no, street, area, landmark..." value={customer.address} onChange={e => setCustomer(c => ({ ...c, address: e.target.value }))}
                  style={{ width: "100%", background: "rgba(212,175,110,.05)", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.85rem 1rem", fontSize: "0.88rem", fontFamily: "'Outfit',sans-serif", fontWeight: 300, outline: "none", resize: "none" }} />
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(250,247,242,.35)", marginBottom: 10 }}>Select Nearest Branch *</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                  {BRANCHES.map(b => (
                    <div key={b.id} onClick={() => setCustomer(c => ({ ...c, branch: b.name }))}
                      style={{ border: `1px solid ${customer.branch === b.name ? "#D4AF6E" : "rgba(212,175,110,.12)"}`, background: customer.branch === b.name ? "rgba(212,175,110,.06)" : "transparent", padding: "14px 16px", cursor: "pointer", transition: "all .2s" }}>
                      <div className="hob-serif" style={{ fontSize: "0.92rem", color: "#FAF7F2", marginBottom: 3 }}>📍 {b.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "rgba(250,247,242,.35)" }}>{b.ph}</div>
                    </div>
                  ))}
                </div>
              </div>
              {cartDel === 0
                ? <div style={{ background: "rgba(34,197,94,.08)", border: "1px solid rgba(34,197,94,.2)", padding: "0.5rem 1rem", fontSize: "0.72rem", color: "#22C55E", marginBottom: 16, textAlign: "center" }}>✅ FREE delivery on this order!</div>
                : <div style={{ background: "rgba(212,175,110,.05)", border: "1px solid rgba(212,175,110,.12)", padding: "0.5rem 1rem", fontSize: "0.72rem", color: "rgba(212,175,110,.6)", marginBottom: 16, textAlign: "center" }}>Add ₹{300 - cartSub} more to qualify for FREE delivery</div>}
              <button onClick={sendWAOrder} style={{ width: "100%", background: "#25D366", color: "#fff", border: "none", padding: "1rem", fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <WA /> Confirm Order on WhatsApp
              </button>
              <p style={{ textAlign: "center", fontSize: "0.72rem", color: "rgba(250,247,242,.25)", marginTop: 12 }}>WhatsApp will open with your complete order details</p>
            </div>
          </div>
        )}

        {/* ── ADMIN LOGIN ── */}
        {adminState.loginOpen && (
          <div style={{ position: "fixed", inset: 0, background: "rgba(13,13,11,.93)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: "#111", border: "1px solid rgba(212,175,110,.12)", padding: 48, width: 320, textAlign: "center", boxShadow: "0 40px 120px rgba(0,0,0,.8)" }}>
              <div className="hob-serif" style={{ fontSize: "1.3rem", fontWeight: 300, color: "#FAF7F2", letterSpacing: "0.12em", marginBottom: 32 }}>
                House of Bakers<br />
                <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", color: "#D4AF6E", fontFamily: "'Outfit',sans-serif" }}>OWNER ACCESS</span>
              </div>
              <input type="password" placeholder="••••••••••" value={adminState.pwd}
                onChange={e => setAdminState(a => ({ ...a, pwd: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && tryAdminLogin()}
                style={{ width: "100%", background: "rgba(212,175,110,.05)", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.85rem 1rem", fontSize: "0.9rem", fontFamily: "'Outfit',sans-serif", textAlign: "center", letterSpacing: "0.1em", outline: "none", marginBottom: 12 }}
                autoFocus />
              <button onClick={tryAdminLogin} style={{ width: "100%", background: "#D4AF6E", color: "#0D0D0B", border: "none", padding: "0.85rem", fontSize: "0.72rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit',sans-serif", marginBottom: 10 }}>
                Login
              </button>
              <button onClick={() => setAdminState(a => ({ ...a, loginOpen: false, pwd: "" }))} style={{ background: "none", border: "none", color: "rgba(250,247,242,.3)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── ADMIN PANEL ── */}
        {adminState.panelOpen && (
          <div onClick={e => e.target === e.currentTarget && setAdminState(a => ({ ...a, panelOpen: false }))}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.8)", zIndex: 700, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
            <div style={{ background: "#111", border: "1px solid rgba(212,175,110,.15)", width: "100%", maxWidth: 720, maxHeight: "88vh", overflow: "auto", boxShadow: "0 40px 120px rgba(0,0,0,.8)" }}>
              {/* Header */}
              <div style={{ padding: "18px 24px", borderBottom: "1px solid rgba(212,175,110,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: "#111", zIndex: 1 }}>
                <div>
                  <div className="hob-serif" style={{ fontSize: "1.1rem", fontWeight: 300, color: "#FAF7F2" }}>Owner Dashboard</div>
                  <div style={{ fontSize: "0.68rem", color: "rgba(250,247,242,.3)", marginTop: 2 }}>House of Bakers — Manage Products</div>
                </div>
                <button onClick={() => setAdminState(a => ({ ...a, panelOpen: false, editing: null, ef: {} }))}
                  style={{ background: "none", border: "1px solid rgba(212,175,110,.15)", color: "rgba(250,247,242,.35)", padding: "0.3rem 0.65rem", fontSize: "0.7rem", cursor: "pointer" }}>Close ✕</button>
              </div>
              <div style={{ padding: "18px 24px" }}>
                {/* Tabs */}
                <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
                  {["products", "specials", "delivery"].map(t => (
                    <button key={t} onClick={() => setAdminState(a => ({ ...a, tab: t }))}
                      style={{ background: adminState.tab === t ? "#D4AF6E" : "rgba(212,175,110,.06)", border: `1px solid ${adminState.tab === t ? "#D4AF6E" : "rgba(212,175,110,.12)"}`, color: adminState.tab === t ? "#0D0D0B" : "rgba(250,247,242,.4)", padding: "0.4rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>
                      {t === "products" ? "🎂 Products" : t === "specials" ? "🌟 Today's Specials" : "🚚 Delivery Rules"}
                    </button>
                  ))}
                </div>

                {adminState.tab === "specials" && (
                  <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(212,175,110,.08)", padding: 20 }}>
                    <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,247,242,.4)", marginBottom: 8 }}>Freshly Baked Today — Banner Text</label>
                    <input type="text" defaultValue={specials} onChange={e => setSpecialsDraft(e.target.value)}
                      placeholder="e.g. Chocolate Truffle Cake • Rasmalai Cake • Paneer Puff"
                      style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.15)", color: "#FAF7F2", padding: "0.6rem 0.8rem", fontSize: "0.85rem", outline: "none", fontFamily: "'Outfit',sans-serif", marginBottom: 12 }} />
                    <p style={{ fontSize: "0.7rem", color: "rgba(250,247,242,.3)", marginBottom: 12 }}>Separate items with • — this appears as a banner under the navigation bar on every page.</p>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => { setSpecials(specialsDraft || specials); showToast("Today's specials updated"); }}
                        style={{ background: "#D4AF6E", color: "#0D0D0B", border: "none", padding: "0.5rem 1.2rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>✓ Update Banner</button>
                      <button onClick={() => { setSpecials(""); showToast("Specials banner hidden"); }}
                        style={{ background: "rgba(201,75,75,.12)", color: "#C94B4B", border: "none", padding: "0.5rem 1rem", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Hide Banner</button>
                    </div>
                  </div>
                )}

                {adminState.tab === "products" ? (
                  <>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                      <span style={{ fontSize: "0.78rem", color: "rgba(250,247,242,.35)" }}>{products.length} products total</span>
                      <button onClick={adminAddProduct} style={{ background: "rgba(34,197,94,.1)", border: "1px solid rgba(34,197,94,.25)", color: "#22C55E", padding: "0.38rem 1rem", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>+ Add Product</button>
                    </div>
                    <div style={{ maxHeight: "55vh", overflowY: "auto" }}>
                      {products.map(p => (
                        <div key={p.id} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(212,175,110,.07)", padding: "12px 14px", marginBottom: 8, display: "flex", alignItems: "center", gap: 14 }}>
                          {adminState.editing === p.id ? (
                            <div style={{ flex: 1 }}>
                              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                                {[["Name", "name", "text"], ["Price (₹)", "price", "number"], ["Discount (%)", "discount", "number"], ["Tag", "tag", "text"]].map(([label, key, type]) => (
                                  <div key={key}>
                                    <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,247,242,.3)", marginBottom: 4 }}>{label}</label>
                                    <input type={type} value={String(adminState.ef[key] ?? "")}
                                      onChange={e => setAdminState(a => ({ ...a, ef: { ...a.ef, [key]: e.target.value } }))}
                                      style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.12)", color: "#FAF7F2", padding: "0.45rem 0.7rem", fontSize: "0.82rem", outline: "none", fontFamily: "'Outfit',sans-serif" }} />
                                  </div>
                                ))}
                              </div>
                              <div style={{ marginBottom: 8 }}>
                                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,247,242,.3)", marginBottom: 4 }}>Category</label>
                                <select value={String(adminState.ef.cat ?? "")} onChange={e => setAdminState(a => ({ ...a, ef: { ...a.ef, cat: e.target.value } }))}
                                  style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.12)", color: "#FAF7F2", padding: "0.45rem 0.7rem", fontSize: "0.82rem", outline: "none", fontFamily: "'Outfit',sans-serif", cursor: "pointer" }}>
                                  {CATEGORIES.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                              </div>
                              <div style={{ marginBottom: 8 }}>
                                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,247,242,.3)", marginBottom: 4 }}>Image URL</label>
                                <input type="text" value={String(adminState.ef.img ?? "")} placeholder="Paste any image URL"
                                  onChange={e => setAdminState(a => ({ ...a, ef: { ...a.ef, img: e.target.value } }))}
                                  style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.12)", color: "#FAF7F2", padding: "0.45rem 0.7rem", fontSize: "0.82rem", outline: "none", fontFamily: "'Outfit',sans-serif" }} />
                              </div>
                              <div style={{ marginBottom: 10 }}>
                                <label style={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,247,242,.3)", marginBottom: 4 }}>Description</label>
                                <input type="text" value={String(adminState.ef.desc ?? "")}
                                  onChange={e => setAdminState(a => ({ ...a, ef: { ...a.ef, desc: e.target.value } }))}
                                  style={{ width: "100%", background: "#1a1a18", border: "1px solid rgba(212,175,110,.12)", color: "#FAF7F2", padding: "0.45rem 0.7rem", fontSize: "0.82rem", outline: "none", fontFamily: "'Outfit',sans-serif" }} />
                              </div>
                              <div style={{ marginBottom: 12, display: "flex", alignItems: "center", gap: 10 }}>
                                <label style={{ fontSize: "0.6rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(250,247,242,.3)" }}>Stock Status</label>
                                <button type="button" onClick={() => setAdminState(a => ({ ...a, ef: { ...a.ef, available: !(a.ef.available !== false) } }))}
                                  style={{ background: (adminState.ef.available !== false) ? "rgba(34,197,94,.15)" : "rgba(201,75,75,.15)", border: `1px solid ${(adminState.ef.available !== false) ? "rgba(34,197,94,.4)" : "rgba(201,75,75,.4)"}`, color: (adminState.ef.available !== false) ? "#22C55E" : "#C94B4B", padding: "0.32rem 0.9rem", fontSize: "0.7rem", letterSpacing: "0.06em", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>
                                  {(adminState.ef.available !== false) ? "✓ Available" : "✕ Out of Stock"}
                                </button>
                              </div>
                              <div style={{ display: "flex", gap: 8 }}>
                                <button onClick={() => saveAdminEdit(p.id)} style={{ flex: 1, background: "#D4AF6E", color: "#0D0D0B", border: "none", padding: "0.5rem 1.2rem", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>✓ Save</button>
                                <button onClick={() => setAdminState(a => ({ ...a, editing: null, ef: {} }))} style={{ background: "rgba(255,255,255,.05)", border: "none", color: "rgba(250,247,242,.35)", padding: "0.5rem 0.875rem", fontSize: "0.72rem", cursor: "pointer", fontFamily: "'Outfit',sans-serif" }}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <img src={p.img} alt={p.name} style={{ width: 48, height: 48, objectFit: "cover", flexShrink: 0 }} onError={e => e.currentTarget.style.display = "none"} />
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ color: "#FAF7F2", fontWeight: 500, fontSize: "0.86rem", marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</div>
                                <div style={{ color: "rgba(250,247,242,.35)", fontSize: "0.74rem" }}>₹{p.price}{p.discount > 0 ? ` → ₹${effectivePrice(p)} (${p.discount}% off)` : ""} · {p.cat} · <span style={{ color: p.available === false ? "#C94B4B" : "#22C55E" }}>{p.available === false ? "Out of Stock" : "Available"}</span></div>
                              </div>
                              <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                                <button onClick={() => { setProducts(prev => prev.map(x => x.id === p.id ? { ...x, available: x.available === false } : x)); showToast(p.available === false ? `${p.name} marked available` : `${p.name} marked out of stock`); }}
                                  title="Toggle stock status"
                                  style={{ background: p.available === false ? "rgba(34,197,94,.12)" : "rgba(201,75,75,.1)", border: "none", color: p.available === false ? "#22C55E" : "#C94B4B", padding: "0.32rem 0.6rem", fontSize: "0.7rem", cursor: "pointer" }}>
                                  {p.available === false ? "↺ Restock" : "⊘ Mark Out"}
                                </button>
                                <button onClick={() => setAdminState(a => ({ ...a, editing: p.id, ef: { ...p } }))}
                                  style={{ background: "rgba(212,175,110,.12)", border: "none", color: "#D4AF6E", padding: "0.32rem 0.7rem", fontSize: "0.72rem", cursor: "pointer" }}>✏️ Edit</button>
                                <button onClick={() => adminDelete(p.id)}
                                  style={{ background: "rgba(201,75,75,.12)", border: "none", color: "#C94B4B", padding: "0.32rem 0.7rem", fontSize: "0.72rem", cursor: "pointer" }}>🗑</button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : adminState.tab === "delivery" ? (
                  <div>
                    <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(212,175,110,.08)", padding: 16, marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(250,247,242,.5)" }}>
                      <span>Orders below ₹300</span><span style={{ color: "#D4AF6E", fontWeight: 500 }}>₹30 delivery charge</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(212,175,110,.08)", padding: 16, marginBottom: 8, display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "rgba(250,247,242,.5)" }}>
                      <span>Orders ₹300 and above</span><span style={{ color: "#22C55E", fontWeight: 500 }}>FREE delivery ✅</span>
                    </div>
                    <p style={{ fontSize: "0.73rem", color: "rgba(250,247,242,.25)", marginTop: 12 }}>Delivery rules apply automatically at checkout.</p>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}

      </div>
    </>
  );
}