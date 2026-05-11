import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  IoLocationOutline, IoMailOutline, IoShieldCheckmarkOutline,
  IoStarSharp, IoHeartOutline, IoBookmarkOutline,
  IoPencilOutline, IoRestaurantOutline, IoTrophyOutline,
  IoFlameOutline, IoLeafOutline
} from "react-icons/io5";

const BRAND = "rgb(226,98,73)";

const TASTE_TAGS = [
  { icon: "🌶️", label: "Spicy Foods" },
  { icon: "🍜", label: "Asian Cuisine" },
  { icon: "🍔", label: "Street Food" },
  { icon: "☕", label: "Cafés & Desserts" },
  { icon: "🥗", label: "Healthy Eats" },
  { icon: "🍣", label: "Seafood" },
];

const ACHIEVEMENTS = [
  { icon: <IoTrophyOutline size={16} />, label: "Top Reviewer",      color: "#D4AF37", bg: "rgba(212,175,55,0.12)"  },
  { icon: <IoFlameOutline  size={16} />, label: "Food Explorer",     color: "#e05252", bg: "rgba(224,82,82,0.10)"   },
  { icon: <IoLeafOutline   size={16} />, label: "Trusted Member",    color: "#16a34a", bg: "rgba(22,163,74,0.10)"   },
  { icon: <IoShieldCheckmarkOutline size={16} />, label: "Verified", color: "#6366f1", bg: "rgba(99,102,241,0.10)"  },
];

const STATS = [
  { icon: <IoStarSharp    size={18} />, label: "Reviews",    value: "24",  color: "#f59e0b" },
  { icon: <IoHeartOutline size={18} />, label: "Favourites", value: "12",  color: BRAND      },
  { icon: <IoRestaurantOutline size={18} />, label: "Places Visited", value: "38", color: "#10b981" },
];

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("about");

  const displayName = user?.displayName || "Anonymous Foodie";
  const email       = user?.email       || "No email provided";
  const photoURL    = user?.photoURL    ||
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";

  const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-[calc(100vh-80px)] py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-5">

        {/* ── Hero Card ─────────────────────────────── */}
        <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-xl">

          {/* Cover gradient */}
          <div className="h-36 md:h-44 relative"
            style={{ background: `linear-gradient(135deg, rgb(226,98,73) 0%, #c41230 50%, #7c1a6e 100%)` }}>
            {/* Decorative circles */}
            <div className="absolute -top-8 -right-8 w-48 h-48 rounded-full opacity-20"
              style={{ background: "radial-gradient(circle, white, transparent)" }} />
            <div className="absolute top-4 left-1/3 w-24 h-24 rounded-full opacity-10"
              style={{ background: "radial-gradient(circle, white, transparent)" }} />
            {/* Edit cover btn */}
            <button className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur border border-white/25 text-white text-xs font-semibold hover:bg-white/25 transition-colors">
              <IoPencilOutline size={13} /> Edit Profile
            </button>
          </div>

          {/* Avatar + info */}
          <div className="px-6 md:px-10 pb-7">
            <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-14 md:-mt-16">

              {/* Avatar */}
              <div className="relative shrink-0 self-start">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden ring-4 ring-base-100 shadow-xl">
                  {user?.photoURL ? (
                    <img src={photoURL} alt={displayName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-3xl font-extrabold text-white"
                      style={{ background: BRAND }}>
                      {initials}
                    </div>
                  )}
                </div>
                {/* Online dot */}
                <span className="absolute bottom-2 right-2 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-base-100" />
              </div>

              {/* Name + meta */}
              <div className="flex-1 min-w-0 pt-2 md:pb-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h1 className="font-display text-2xl md:text-3xl font-extrabold text-heading leading-tight">
                    {displayName}
                  </h1>
                  <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(22,163,74,0.12)", color: "#16a34a" }}>
                    <IoShieldCheckmarkOutline size={12} /> Verified
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                  <span className="flex items-center gap-1.5">
                    <IoMailOutline size={14} /> {email}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <IoLocationOutline size={14} /> Bangladesh
                  </span>
                </div>

                {/* Achievement badges */}
                <div className="flex flex-wrap gap-2 mt-3">
                  {ACHIEVEMENTS.map(a => (
                    <span key={a.label}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-lg"
                      style={{ background: a.bg, color: a.color }}>
                      {a.icon} {a.label}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick action buttons */}
              <div className="flex gap-2 shrink-0 mt-2 md:mt-0 md:pb-1">
                <Link to="/dashboard/reviews"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                  style={{ background: BRAND }}>
                  <IoStarSharp size={15} /> My Reviews
                </Link>
                <Link to="/dashboard/favourites"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors">
                  <IoHeartOutline size={15} /> Favourites
                </Link>
              </div>
            </div>

            {/* Stats row */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {STATS.map((s, i) => (
                <div key={s.label}
                  className="flex items-center gap-3 p-4 rounded-2xl border border-base-200 bg-base-200/30 hover:bg-base-200/50 transition-colors">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.color + "15", color: s.color }}>
                    {s.icon}
                  </div>
                  <div>
                    <div className="text-xl font-extrabold text-heading leading-none">{s.value}</div>
                    <div className="text-xs text-muted mt-0.5">{s.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Content ───────────────────────────── */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* Left col — tabs */}
          <div className="lg:col-span-2 space-y-4">

            {/* Tab bar */}
            <div className="flex gap-1 p-1 rounded-2xl bg-base-200/50 border border-base-200">
              {[
                { id: "about",    label: "About" },
                { id: "activity", label: "Activity" },
              ].map(t => (
                <button key={t.id} type="button"
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
                    ${activeTab === t.id
                      ? "bg-base-100 shadow-sm text-heading"
                      : "text-muted hover:text-heading"}`}>
                  {t.label}
                </button>
              ))}
            </div>

            {/* About tab */}
            {activeTab === "about" && (
              <div className="bg-base-100 rounded-2xl border border-base-200 p-6 space-y-5 animate-fade-in-up">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Bio</div>
                  <p className="text-sm text-muted leading-relaxed">
                    Passionate food explorer based in Bangladesh. I love discovering hidden gems, trying new cuisines, and sharing honest reviews with the FoodNest community. Always on the hunt for the best biryani! 🍛
                  </p>
                </div>

                <div className="h-px bg-base-200" />

                <div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Account Details</div>
                  <div className="space-y-3">
                    {[
                      { label: "Display Name", value: displayName },
                      { label: "Email",        value: email },
                      { label: "Member Since", value: user?.metadata?.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString("en-BD", { year: "numeric", month: "long" })
                          : "—" },
                      { label: "Account Type", value: "Food Lover" },
                    ].map(d => (
                      <div key={d.label} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-muted shrink-0 w-32">{d.label}</span>
                        <span className="font-semibold text-heading text-right break-all">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-base-200" />

                {/* Quick links */}
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Quick Links</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { to: "/dashboard/reviews",    icon: <IoStarSharp size={14} />,       label: "My Reviews" },
                      { to: "/dashboard/favourites", icon: <IoHeartOutline size={14} />,    label: "My Favourites" },
                      { to: "/dashboard/overview",   icon: <IoBookmarkOutline size={14} />, label: "Dashboard" },
                      { to: "/all-items",            icon: <IoRestaurantOutline size={14} />, label: "Browse Foods" },
                    ].map(l => (
                      <Link key={l.to} to={l.to}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-base-200 text-sm font-semibold hover:bg-base-200/60 transition-colors text-heading">
                        <span style={{ color: BRAND }}>{l.icon}</span>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Activity tab */}
            {activeTab === "activity" && (
              <div className="bg-base-100 rounded-2xl border border-base-200 p-6 animate-fade-in-up">
                <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-4">Recent Activity</div>
                <div className="space-y-3">
                  {[
                    { icon: "⭐", action: "Reviewed",   item: "Chicken Biryani",    time: "2 days ago",  color: "#f59e0b" },
                    { icon: "❤️", action: "Saved",       item: "Grilled Seafood",    time: "4 days ago",  color: "#e05252" },
                    { icon: "✍️", action: "Updated review", item: "Shami Kebab",    time: "1 week ago",  color: BRAND      },
                    { icon: "🔍", action: "Explored",   item: "Street Food section", time: "2 weeks ago", color: "#6366f1" },
                  ].map((a, i) => (
                    <div key={i} className="flex items-center gap-4 p-3.5 rounded-xl border border-base-200 hover:bg-base-200/30 transition-colors">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base shrink-0"
                        style={{ background: a.color + "15" }}>
                        {a.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-heading">
                          {a.action} <span className="font-bold">{a.item}</span>
                        </div>
                      </div>
                      <div className="text-xs text-muted shrink-0">{a.time}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted italic">Activity is illustrative — connect your data for live feed.</p>
                </div>
              </div>
            )}
          </div>

          {/* Right col */}
          <div className="space-y-4">

            {/* Taste Profile card */}
            <div className="rounded-2xl overflow-hidden border border-base-200 shadow-sm">
              <div className="p-5"
                style={{ background: `linear-gradient(135deg, rgb(226,98,73), #c41230)` }}>
                <div className="text-xs font-bold uppercase tracking-widest text-white/70 mb-1">Taste Profile</div>
                <h3 className="text-base font-extrabold text-white mb-1">Your Food DNA 🧬</h3>
                <p className="text-xs text-white/75 leading-relaxed">
                  Based on your reviews and favourites.
                </p>
              </div>
              <div className="p-4 bg-base-100">
                <div className="flex flex-wrap gap-2">
                  {TASTE_TAGS.map(t => (
                    <span key={t.label}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-base-200 bg-base-200/40 text-heading hover:bg-base-200/70 transition-colors cursor-default">
                      {t.icon} {t.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Level card */}
            <div className="bg-base-100 rounded-2xl border border-base-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40">Your Level</div>
                  <div className="text-base font-extrabold text-heading mt-0.5">Food Connoisseur</div>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: "rgba(212,175,55,0.15)" }}>
                  🏅
                </div>
              </div>
              {/* XP bar */}
              <div className="mb-2">
                <div className="flex justify-between text-xs text-muted mb-1.5">
                  <span>2,400 XP</span>
                  <span>3,000 XP</span>
                </div>
                <div className="h-2.5 rounded-full bg-base-200 overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{ width: "80%", background: `linear-gradient(90deg, ${BRAND}, #f5a623)` }} />
                </div>
              </div>
              <p className="text-xs text-muted">600 XP to reach <strong>Master Foodie</strong> 🚀</p>
            </div>

            {/* CTA card */}
            <div className="bg-base-100 rounded-2xl border border-base-200 p-5 shadow-sm text-center">
              <div className="text-3xl mb-2">✍️</div>
              <div className="font-bold text-sm text-heading mb-1">Share your experience</div>
              <p className="text-xs text-muted mb-4 leading-relaxed">
                Help the community discover great food by writing a review.
              </p>
              <Link to="/dashboard/reviews/add"
                className="block w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-md"
                style={{ background: BRAND }}>
                Write a Review
              </Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;