import { useEffect, useRef, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import Banner from "../../components/Banner";
import { FoodCard } from "../../components/FoodCard";
import Reveal from "../../components/Reveal";

/* ─── Section Heading ─────────────────────────────── */
const SectionHeading = ({ title, description, align = "left", accent }) => (
  <header className={`space-y-2 ${align === "center" ? "text-center" : "text-left"}`}>
    <h2 className="text-3xl font-extrabold leading-tight text-accent md:text-4xl">
      {accent
        ? <>{title} <span className="shimmer-text">{accent}</span></>
        : title}
    </h2>
    {description && <p className="text-sm text-muted md:text-base">{description}</p>}
  </header>
);

/* ─── Testimonial Carousel ───────────────────────── */
const Carousel = () => {
  const reviews = [
    { name: "Rafiul Karim", location: "Dhaka, Bangladesh", text: "FoodNest keeps listings fresh, reviews honest, and the experience smooth—my go-to for discovering local favourites across Dhaka.", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop", stars: 5 },
    { name: "Sumaiya Akter", location: "Chattogram, Bangladesh", text: "I trust the ratings and photos here. Finding great food and saving favourites makes re-ordering super easy.", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop", stars: 5 },
    { name: "Jahid Hasan", location: "Sylhet, Bangladesh", text: "Adding reviews is simple and the community feedback is real. Best way to spot hidden gems near me.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop", stars: 5 },
  ];
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(p => (p + 1) % reviews.length), 4500);
    return () => clearInterval(id);
  }, []);
  const active = reviews[index];
  return (
    <div className="mt-10 rounded-3xl card-surface p-8 md:p-10 shadow-lg relative overflow-hidden">
      <div className="absolute inset-y-0 right-6 hidden h-full w-32 items-center justify-center opacity-10 lg:flex">
        <span className="text-7xl">🍕</span>
      </div>
      {/* Stars */}
      <div className="flex gap-1 mb-5">
        {Array.from({ length: active.stars }).map((_, i) => (
          <span key={i} className="text-amber-400 text-lg">★</span>
        ))}
      </div>
      <div className="grid gap-8 lg:grid-cols-[200px_1fr] items-center">
        <div className="flex justify-center lg:justify-start">
          <div className="relative">
            <img src={active.avatar} alt={active.name}
              className="h-28 w-28 rounded-full object-cover shadow-lg ring-4 ring-offset-2"
              style={{ ringColor: "rgba(226,98,73,0.3)" }} loading="lazy" />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ background: "rgb(226,98,73)" }}>✓</div>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-lg leading-relaxed italic opacity-85">"{active.text}"</p>
          <div>
            <div className="font-bold text-base">{active.name}</div>
            <div className="text-sm text-muted">{active.location}</div>
          </div>
        </div>
      </div>
      <div className="mt-7 flex items-center gap-2">
        {reviews.map((_, idx) => (
          <button key={idx} aria-label={`Go to ${idx + 1}`} onClick={() => setIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 ${idx === index ? "w-8 bg-accent" : "w-2 bg-gray-300"}`} />
        ))}
      </div>
    </div>
  );
};

/* ─── Count-Up Hook ──────────────────────────────── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const num = parseInt(String(target).replace(/[^0-9]/g, ""));
      const step = Math.ceil(num / (duration / 16));
      let cur = 0;
      const tick = () => {
        cur = Math.min(cur + step, num);
        setCount(cur);
        if (cur < num) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);
  return [count, ref];
}

/* ─── Stat Card ──────────────────────────────────── */
const StatCard = ({ label, value, icon, gradient }) => {
  const num = parseInt(String(value).replace(/[^0-9]/g, ""));
  const suffix = String(value).replace(/[0-9]/g, "");
  const [count, ref] = useCountUp(num);
  return (
    <div ref={ref}
      className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">{icon}</div>
        <div className="text-5xl md:text-6xl font-black text-gray-900 mb-3 tracking-tight tabular-nums">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="text-base md:text-lg font-bold text-gray-700">{label}</div>
      </div>
      <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};

/* ─── Newsletter ──────────────────────────────────── */
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const submit = (e) => { e.preventDefault(); if (email) { setSent(true); setEmail(""); } };
  return (
    <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] py-16 md:py-20 overflow-hidden"
      style={{ background: "linear-gradient(135deg, rgb(226,98,73), #d4380d, #c41230)" }}>
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 -translate-y-1/2 translate-x-1/4"
        style={{ background: "radial-gradient(circle, white, transparent)" }} />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full opacity-10 translate-y-1/3 -translate-x-1/4"
        style={{ background: "radial-gradient(circle, white, transparent)" }} />
      <div className="mx-auto max-w-3xl px-4 text-center relative z-10">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70 mb-3">Stay Updated</p>
        <h2 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4 leading-tight">
          Get the tastiest deals<br />straight to your inbox 🍽️
        </h2>
        <p className="text-white/80 mb-8 text-base max-w-xl mx-auto">
          Weekly curated food discoveries, new restaurant alerts, and exclusive member-only offers.
        </p>
        {sent ? (
          <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur text-white rounded-2xl px-6 py-4 font-semibold">
            <span className="text-2xl">🎉</span> You're on the list! Check your inbox.
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-5 py-3.5 rounded-2xl bg-white/15 backdrop-blur border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-white/60 focus:bg-white/20 transition-all text-sm font-medium"
            />
            <button type="submit"
              className="px-7 py-3.5 rounded-2xl bg-white text-sm font-bold transition-all hover:bg-white/90 hover:-translate-y-0.5 hover:shadow-lg shrink-0"
              style={{ color: "rgb(226,98,73)" }}>
              Subscribe
            </button>
          </form>
        )}
        <p className="mt-4 text-white/50 text-xs">No spam. Unsubscribe anytime.</p>
      </div>
    </section>
  );
};

/* ─── Trending Tags ───────────────────────────────── */
const TRENDING = ["🔥 Biryani", "🍔 Burgers", "🌮 Street Food", "🍜 Noodles", "🥗 Vegan", "🍣 Seafood", "🍰 Desserts", "☕ Café Vibes", "🫕 Curries", "🧆 BBQ"];

/* ─── Chef Spotlight Card ────────────────────────── */
const chefs = [
  { name: "Rahim Uddin", specialty: "Biryani & Kebabs", rating: 4.9, orders: "2.4k", avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=200&h=200&fit=crop", badge: "🏆 Top Chef" },
  { name: "Nasrin Begum", specialty: "Bengali Sweets", rating: 4.8, orders: "1.8k", avatar: "https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=200&h=200&fit=crop", badge: "⭐ Rising Star" },
  { name: "Kamal Hossain", specialty: "Street Food", rating: 4.7, orders: "3.1k", avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?w=200&h=200&fit=crop", badge: "🔥 Fan Favorite" },
];

/* ═══════════════════════════════════════════════════
   HOME PAGE
════════════════════════════════════════════════════ */
const Home = () => {
  const data = useLoaderData() || [];

  return (                      
    <main>
      <Banner />

      {/* ── Trending Tags ─────────────────────────── */}
      <div className="border-y border-base-200 overflow-hidden bg-base-100/60 backdrop-blur">
        <div className="flex items-center gap-3 py-3 px-4 overflow-x-auto scrollbar-hide whitespace-nowrap">
          <span className="text-xs font-bold uppercase tracking-widest text-muted shrink-0">Trending</span>
          <div className="w-px h-4 bg-base-200 shrink-0" />       
          {TRENDING.map(tag => (
            <button key={tag}
              className="chip-dark shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold hover:bg-accent hover:text-white hover:border-transparent transition-all duration-200">
              {tag}
            </button>
          ))}
        </div>
      </div>      

  {/* ── Intro / Hero Section ─────────────────────────────────── */}
<section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] brand-mesh py-12 md:py-16">
  <Reveal className="mx-auto max-w-6xl px-4 pt-12">
  <section
    id="intro"
    className="relative overflow-hidden rounded-3xl border border-base-200 shadow-sm"
  >
    {/* Background */}
    <div className="absolute inset-0" style={{ background: "var(--surface-1)" }} />
    <div
      className="absolute inset-y-0 right-0 w-[42%] hidden lg:block"
      style={{
        background: "linear-gradient(135deg, rgba(226,98,73,0.07) 0%, rgba(212,175,55,0.05) 100%)",
      }}
    />

    {/* Blobs */}
    <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(226,98,73,0.12) 0%, transparent 70%)" }} />
    <div className="absolute -bottom-24 left-4 w-64 h-64 rounded-full pointer-events-none"
      style={{ background: "radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)" }} />

    {/* ── Main grid ── */}
    <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-center">

      {/* LEFT: Text */}
      <div className="p-8 md:p-12 lg:p-14 flex flex-col gap-5 min-w-0">

        {/* Eyebrow */}
        <div className="inline-flex items-center self-start gap-2 rounded-full border border-base-200 bg-base-100/80 backdrop-blur px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
          style={{ color: "rgb(226,98,73)" }}>
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Bangladesh's Food Community
        </div>

        {/* Headline */}
        <div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-heading">
            Discover the <br />
            <span className="shimmer-text">Taste of Local</span>
          </h1>
          <p className="text-base text-muted max-w-sm leading-relaxed mt-3">
            Authentic flavors from your neighborhood — curated, reviewed, and loved by the community.
          </p>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap gap-2">
          {[
            { icon: "🍽️", text: "Curated dishes" },
            { icon: "⭐", text: "Community reviews" },
            { icon: "❤️", text: "Save favourites" },
          ].map((b) => (
            <span key={b.text}
              className="flex items-center gap-1.5 rounded-xl border border-base-200 bg-base-100/70 px-3 py-1.5 text-xs font-semibold text-heading">
              {b.icon} {b.text}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <NavLink to="/all-items"
            className="inline-flex items-center gap-2 rounded-2xl px-7 py-3 text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
            style={{ background: "rgb(226,98,73)" }}>
            Explore Foods →
          </NavLink>
          <NavLink to="/all-reviews"
            className="inline-flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100/60 px-7 py-3 text-sm font-semibold backdrop-blur hover:bg-base-200/60 transition-colors">
            Read Reviews
          </NavLink>
        </div>

        {/* Stats row */}
        <div className="flex items-center gap-0 pt-2 border-t border-base-200 w-fit">
          {[
            { val: "12k+", label: "Happy Customers" },
            { val: "3.8k", label: "Food Items" },
            { val: "25k+", label: "Reviews" },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && <div className="w-px h-8 bg-base-200 mx-5" />}
              <div>
                <div className="text-lg font-extrabold text-heading leading-none">{s.val}</div>
                <div className="text-[11px] text-muted mt-0.5">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT: Visual collage — fixed width so it never overflows */}
      <div className="hidden lg:block relative shrink-0" style={{ width: "420px", height: "480px" }}>

        {/* Main food card */}
        <div className="absolute rounded-2xl overflow-hidden shadow-2xl"
          style={{ width: "220px", height: "290px", top: "80px", left: "60px",
            transform: "rotate(2deg)", transition: "transform 0.5s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "rotate(0deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "rotate(2deg)"}>
          <img src="https://images.unsplash.com/photo-1546069901-eacef0df6022?w=500&h=700&fit=crop"
            alt="Biryani" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="text-white text-sm font-bold">Chicken Biryani</div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-amber-400 text-xs">★★★★★</span>
              <span className="text-white/70 text-xs">4.9</span>
            </div>
          </div>
        </div>

        {/* Secondary card */}
        <div className="absolute rounded-2xl overflow-hidden shadow-xl"
          style={{ width: "150px", height: "175px", top: "24px", right: "24px",
            transform: "rotate(-3deg)", transition: "transform 0.5s ease" }}
          onMouseEnter={e => e.currentTarget.style.transform = "rotate(0deg)"}
          onMouseLeave={e => e.currentTarget.style.transform = "rotate(-3deg)"}>
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=450&fit=crop"
            alt="Seafood" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute bottom-2 left-2 right-2 text-white text-xs font-semibold">
            Grilled Seafood
          </div>
        </div>

        {/* Floating review badge */}
        <div className="absolute z-20 rounded-2xl border border-base-200 bg-base-100/95 backdrop-blur p-3 shadow-xl float"
          style={{ bottom: "48px", right: "16px", width: "160px", animationDelay: "1s" }}>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "rgb(226,98,73)" }}>R</div>
            <div>
              <div className="text-xs font-bold text-heading">Rafiul K.</div>
              <div className="text-amber-400 text-[10px]">★★★★★</div>
            </div>
          </div>
          <p className="text-[10px] text-muted mt-1.5 leading-relaxed">
            "Best biryani I've ever had!"
          </p>
        </div>

        {/* Floating orders badge */}
        <div className="absolute z-20 rounded-2xl border border-base-200 bg-base-100/95 backdrop-blur px-3 py-2.5 shadow-lg float"
          style={{ top: "24px", left: "16px", animationDelay: "0.5s" }}>
          <div className="text-[10px] text-muted font-medium">Today's orders</div>
          <div className="text-xl font-extrabold text-heading">1,284</div>
          <div className="text-[10px] font-semibold" style={{ color: "#16a34a" }}>↑ 12% from yesterday</div>
        </div>
      </div>

    </div>
  </section>
</Reveal>
</section>

      {/* ── Top Rated ─────────────────────────────── */}
      <Reveal className="mx-auto max-w-6xl px-4 pt-8 pb-12">
        <section id="top-rated" aria-label="Top rated foods" className="p-6 md:p-8 bg-base-100/60 rounded-3xl border border-base-200">
          <div className="flex items-center justify-between flex-wrap gap-3 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">This Week</p>
              <h2 className="text-2xl font-extrabold text-heading">Top Rated Foods</h2>
            </div>
            <NavLink to="/all-items"
              className="text-sm font-semibold text-accent hover:underline flex items-center gap-1">
              View all →
            </NavLink>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {Array.isArray(data) ? data.slice(0, 8).map(item => <FoodCard key={item._id} item={item} />) : null}
          </div>
          {Array.isArray(data) && data.length === 0 && (
            <div className="text-center py-10 text-muted text-sm">No food items yet.</div>
          )}
        </section>
      </Reveal>

      {/* ── Why FoodNest ──────────────────────────── */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] brand-mesh py-12 md:py-16">
        <Reveal className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-base-200 bg-base-100/50 backdrop-blur-sm p-10 shadow-sm">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Why Us</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-heading mb-3">Why Choose FoodNest?</h2>
              <p className="text-base text-muted leading-relaxed">
                Connect with authentic local cuisines and passionate home cooks. Browse, review, save—all in one seamless platform.
              </p>
            </div>
            <div className="grid gap-10 lg:grid-cols-2 items-center">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl order-2 lg:order-1 group">
                <img src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                  alt="Food preparation" className="w-full h-full object-cover aspect-4/3 group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="space-y-4 order-1 lg:order-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { cls: "why-card-pink",   icon: "📋", title: "Browse Food Items",   desc: "Explore hundreds of local dishes with detailed descriptions, ratings, and photos." },
                    { cls: "why-card-teal",   icon: "⭐", title: "Add Reviews",         desc: "Share your experience and help others discover great food with honest reviews." },
                    { cls: "why-card-lime",   icon: "❤️", title: "Save Favorites",      desc: "Create your personal collection of favorite dishes for quick access anytime." },
                    { cls: "why-card-indigo", icon: "👤", title: "Manage Profile",      desc: "Track your reviews, favorites, and downloads all in your personal dashboard." },
                  ].map(c => (
                    <div key={c.title}
                      className={`group rounded-2xl border border-base-200 ${c.cls} p-5 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}>
                      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{c.icon}</div>
                      <h3 className="text-base font-bold text-heading mb-1.5">{c.title}</h3>
                      <p className="text-xs text-muted leading-relaxed">{c.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 text-center">
                  <NavLink to="/auth/login"
                    className="inline-flex items-center justify-center border-2 border-accent rounded-full text-accent px-10 py-3.5 text-base font-bold hover:bg-accent hover:text-white transition-all duration-300 hover:-translate-y-0.5">
                    Get Started →
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Chef Spotlight ────────────────────────── */}
      <Reveal className="mx-auto max-w-6xl px-4 py-14">
        <section aria-label="Chef Spotlight">
          <div className="text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">Community Stars</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-heading mb-3">Chef Spotlight</h2>
            <p className="text-muted text-base max-w-xl mx-auto">
              Meet the talented cooks behind FoodNest's most loved dishes.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            {chefs.map(chef => (
              <div key={chef.name}
                className="group feature-card rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 relative overflow-hidden">
                {/* accent top border */}
                <div className="absolute inset-x-0 top-0 h-0.5 bg-accent opacity-60" />
                <div className="relative">
                  <img src={chef.avatar} alt={chef.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 ring-4 ring-offset-2 shadow-lg"
                    style={{ ringColor: "rgba(226,98,73,0.3)" }} loading="lazy" />
                  <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-accent-10 text-accent mb-3">
                    {chef.badge}
                  </span>
                  <h3 className="font-bold text-lg text-heading">{chef.name}</h3>
                  <p className="text-xs text-muted mb-4">{chef.specialty}</p>
                  <div className="flex items-center justify-center gap-5 text-sm">
                    <div className="text-center">
                      <div className="font-extrabold text-heading">{chef.rating}</div>
                      <div className="text-xs text-muted">Rating</div>
                    </div>
                    <div className="w-px h-8 bg-base-200" />
                    <div className="text-center">
                      <div className="font-extrabold text-heading">{chef.orders}</div>
                      <div className="text-xs text-muted">Orders</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Getting Started ───────────────────────── */}
      <Reveal className="w-screen relative left-1/2 right-1/2 -mx-[50vw] steps-bg py-16 md:py-20 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent mb-2">Quick Start</p>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-heading mb-4">
              How to Get Started
            </h2>
            <p className="text-muted text-base leading-relaxed">
              Join our food community in four simple steps.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-4">
            {[
              { n: "01", title: "Create Account", desc: "Sign up with email in under a minute.", color: "from-blue-500 to-blue-600", bar: "from-blue-500 to-blue-300" },
              { n: "02", title: "Explore Foods",  desc: "Browse local dishes with ratings and photos.", color: "from-violet-500 to-violet-600", bar: "from-violet-500 to-violet-300" },
              { n: "03", title: "Share Reviews",  desc: "Post honest reviews and help the community.", color: "from-emerald-500 to-emerald-600", bar: "from-emerald-500 to-emerald-300" },
              { n: "04", title: "Save Favorites", desc: "Build your personal dish collection.", color: "from-orange-500 to-orange-600", bar: "from-orange-500 to-orange-300" },
            ].map(s => (
              <div key={s.n}
                className="group step-card rounded-2xl p-7 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${s.bar}`} />
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300 bg-gradient-to-br ${s.color}`} />
                <div className="relative z-10">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${s.color} text-white font-black text-base mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300`}>
                    {s.n}
                  </div>
                  <h3 className="text-base font-bold text-heading mb-2">{s.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <NavLink to="/auth/login"
              className="inline-flex items-center justify-center bg-accent text-white font-bold rounded-full px-12 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 hover:bg-accent-dark">
              Start Your Journey →
            </NavLink>
          </div>
        </div>
      </Reveal>

      {/* ── Core Features ─────────────────────────── */}
      <Reveal className="mx-auto max-w-6xl px-4 py-14">
        <SectionHeading title="Core Features" align="center"
          description="Everything you need to explore local food confidently." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {[
            { icon: "🍅", title: "Fresh Ingredients",   desc: "Sourced daily from local farms and vendors." },
            { icon: "👨‍🍳", title: "Top Rated Chefs",   desc: "Curated dishes from community-favorite cooks." },
            { icon: "⚡",  title: "Fast Discovery",     desc: "Find great food quickly with smart listings." },
            { icon: "⭐",  title: "Community Reviews",  desc: "Real feedback from local food lovers." },
          ].map(f => (
            <div key={f.title}
              className="group feature-card relative overflow-hidden rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-accent opacity-70" />
              <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-[0.04] transition-colors duration-300" />
              <div className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-10 text-2xl ring-1 ring-accent/15 group-hover:scale-110 transition-transform duration-300 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-base font-extrabold text-heading mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      {/* ── Newsletter ────────────────────────────── */}
      <Newsletter />

      {/* ── Popular Categories ────────────────────── */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-accent-5 py-12 md:py-16">
        <Reveal className="mx-auto max-w-6xl px-4">
          <SectionHeading title="Popular Categories" description="Quickly jump into the cuisines people search for most." />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "Burgers",     img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=360&fit=crop" },
              { name: "BBQ",         img: "https://t4.ftcdn.net/jpg/03/36/59/67/360_F_336596714_KYxkCzJK686f0lon80WIeHOecR3OIy5S.jpg" },
              { name: "Seafood",     img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=360&fit=crop" },
              { name: "Vegan",       img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=560&fit=crop" },
              { name: "Desserts",    img: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg" },
              { name: "Street Food", img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500&h=360&fit=crop" },
              { name: "Biryani",     img: "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=500&h=360&fit=crop" },
              { name: "Snacks",      img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=360&fit=crop" },
            ].map(c => (
              <div key={c.name}
                className="group category-card relative overflow-hidden rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <img src={c.img} alt={c.name} className="h-40 w-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-gray-900 shadow">
                    <span className="h-2 w-2 rounded-full bg-accent" />
                    {c.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── Testimonials ──────────────────────────── */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] testimonial-bg py-14 md:py-16 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="space-y-2 max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-widest text-accent">Testimonials</p>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold text-heading leading-tight">
                Discover Our<br />Satisfied Customers
              </h2>
              <p className="text-muted text-base">
                Real stories from food lovers who explore, review, and save their favourites on FoodNest.
              </p>
            </div>
            <NavLink to="/all-reviews"
              className="self-start mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-accent text-accent text-sm font-bold hover:bg-accent hover:text-white transition-all duration-200">
              All Reviews →
            </NavLink>
          </div>
          <Carousel />
        </div>
      </section>

      {/* ── App Download ──────────────────────────── */}
      <section className="w-screen relative left-[50%] right-[50%] -mx-[50vw] app-dl-bg py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-8">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="food-p" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <text x="10" y="30" fontSize="28" fill="currentColor" opacity="0.25">🍕</text>
                <text x="60" y="65" fontSize="22" fill="currentColor" opacity="0.25">🍔</text>
                <text x="20" y="82" fontSize="18" fill="currentColor" opacity="0.2">🥗</text>
                <text x="75" y="22" fontSize="20" fill="currentColor" opacity="0.2">🍜</text>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#food-p)" />
          </svg>
        </div>
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent px-3 py-1.5 rounded-full bg-accent-10">
                📱 Mobile App
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-heading leading-tight">
                Download The FoodNest App!
              </h2>
              <p className="text-lg text-muted">
                Get <span className="font-bold text-heading">5% off</span> on your first order through the app.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {[
                  { href: "https://www.apple.com/app-store/", label: "App Store", sub: "Download on the" },
                  { href: "https://play.google.com/store", label: "Google Play", sub: "GET IT ON" },
                ].map(a => (
                  <a key={a.label} href={a.href} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center bg-gray-900 text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5">
                    <div className="text-left">
                      <div className="text-xs opacity-70">{a.sub}</div>
                      <div className="text-base font-bold">{a.label}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <div className="relative lg:block hidden">
              <div className="relative w-full h-[480px]">
                <div className="absolute right-32 top-0 w-60 h-[480px] transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-gray-900 rounded-[3rem] shadow-2xl p-2.5">
                    <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=800&fit=crop" alt="App" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
                <div className="absolute right-0 top-10 w-60 h-[480px] transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="w-full h-full bg-gray-900 rounded-[3rem] shadow-2xl p-2.5">
                    <div className="w-full h-full rounded-[2.5rem] overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=800&fit=crop" alt="App" className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────── */}
      <Reveal className="mx-auto max-w-6xl px-4 py-14">
        <section aria-label="FAQ">
          <div className="text-center mb-12 space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">Help Center</p>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold text-heading">
              Have any <span className="text-accent">questions?</span>
            </h2>
            <p className="text-muted text-base max-w-2xl mx-auto">
              Everything you need to know about using FoodNest.
            </p>
          </div>
          <div className="max-w-4xl mx-auto space-y-3">
            {[
              { q: "How do I create an account?", a: "Click 'Sign Up', fill your name, email, and password—ready in under a minute." },
              { q: "Do I need an account to browse foods?", a: "No. Public listings are open to all. Login is needed for reviews, favourites, and your dashboard." },
              { q: "Is there a fee for using FoodNest?", a: "FoodNest is completely free. Browse, review, save—no hidden charges." },
              { q: "Can I manage my reviews from my phone?", a: "Yes! FoodNest is fully responsive and works great on mobile, tablet, and desktop." },
              { q: "How do favourites work?", a: "After login, click the heart icon on any food to save it. Access your full list in the dashboard." },
            ].map((faq, idx) => (
              <div key={idx} className="faq-item rounded-2xl transition-all duration-300 hover:shadow-md">
                <details className="overflow-hidden group">
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-base faq-q list-none">
                    <span className="flex-1">{faq.q}</span>
                    <span className="ml-4 shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-base-200 hover:bg-accent hover:text-white transition-colors text-heading">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 pt-1">
                    <p className="faq-a text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Statistics ────────────────────────────── */}
      <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] stats-bg py-20 overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="mx-auto max-w-7xl px-4 relative z-10">
          <div className="text-center mb-14 space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">By The Numbers</p>
            <h2 className="font-display text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Join Our Growing <span className="text-accent">Food Community</span>
            </h2>
            <p className="text-gray-800 text-lg max-w-2xl mx-auto">
              Discover authentic local flavors and connect with passionate food lovers.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <StatCard label="Happy Customers" value="12500+" icon="😊" gradient="from-orange-400 to-red-400" />
            <StatCard label="Food Items Listed" value="3850"  icon="🍽️" gradient="from-blue-400 to-indigo-400" />
            <StatCard label="Reviews Posted"    value="25000+" icon="⭐" gradient="from-green-400 to-emerald-400" />
          </div>
        </div>
      </section>

    </main>
  );
};

export default Home;
