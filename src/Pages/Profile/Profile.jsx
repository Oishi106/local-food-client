import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { apiFetch } from "../../utils/api";
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
  { icon: <IoStarSharp    size={18} />, label: "Reviews",    color: "#f59e0b" },
  { icon: <IoHeartOutline size={18} />, label: "Favourites", color: BRAND      },
  { icon: <IoRestaurantOutline size={18} />, label: "Places Visited", color: "#10b981" },
];

const LS_KEY = "fn_favourites";

const readFavs = () => {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "[]");
  } catch {
    return [];
  }
};

const formatActivityTime = (value) => {
  if (!value) return "Recently";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Recently";
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 60) return `${Math.max(1, minutes)}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString("en-BD", { month: "short", day: "numeric" });
};

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("about");
  const [editOpen, setEditOpen] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [photoInput, setPhotoInput] = useState("");
  const [savingProfile, setSavingProfile] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);
  const [activityError, setActivityError] = useState("");
  const [favourites, setFavourites] = useState(readFavs);

  const displayName = user?.displayName || "Anonymous Foodie";
  const email       = user?.email       || "No email provided";
  const photoURL    = user?.photoURL    ||
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";

  const initials = displayName.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    setDisplayNameInput(displayName);
    setPhotoInput(user?.photoURL || "");
  }, [displayName, user?.photoURL]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!user?.email) {
        setReviews([]);
        setLoadingActivity(false);
        return;
      }

      setLoadingActivity(true);
      setActivityError("");
      try {
        const data = await apiFetch(`/my-reviews?email=${encodeURIComponent(user.email)}`);
        if (cancelled) return;
        setReviews(Array.isArray(data) ? data : data?.data || []);
        setFavourites(readFavs());
      } catch {
        if (cancelled) return;
        setActivityError("Unable to load live activity right now.");
        setReviews([]);
      } finally {
        if (!cancelled) setLoadingActivity(false);
      }
    }

    run();
    return () => { cancelled = true; };
  }, [user?.email]);

  useEffect(() => {
    const handleStorage = () => setFavourites(readFavs());
    window.addEventListener("storage", handleStorage);
    window.addEventListener("fn:favourites-changed", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("fn:favourites-changed", handleStorage);
    };
  }, []);

  const stats = useMemo(() => {
    const uniqueRestaurants = new Set([
      ...reviews.map((review) => review.restaurant_name).filter(Boolean),
      ...favourites.map((item) => item.restaurant_name).filter(Boolean),
    ]).size;

    return [
      { icon: <IoStarSharp size={18} />, label: "Reviews", value: reviews.length.toString(), color: "#f59e0b" },
      { icon: <IoHeartOutline size={18} />, label: "Favourites", value: favourites.length.toString(), color: BRAND },
      { icon: <IoRestaurantOutline size={18} />, label: "Places Visited", value: uniqueRestaurants.toString(), color: "#10b981" },
    ];
  }, [reviews, favourites]);

  const recentActivity = useMemo(() => {
    const reviewActivity = reviews
      .map((review) => ({
        type: "review",
        icon: "⭐",
        action: "Reviewed",
        item: review.food_name || "Food item",
        time: formatActivityTime(review.date || review.createdAt || review.updatedAt),
        color: "#f59e0b",
        sortTime: new Date(review.date || review.createdAt || review.updatedAt || 0).getTime(),
      }))
      .filter((entry) => entry.item);

    const favouriteActivity = favourites
      .map((item) => ({
        type: "favourite",
        icon: "❤️",
        action: "Saved",
        item: item.food_name || "Food item",
        time: formatActivityTime(item.savedAt),
        color: "#e05252",
        sortTime: new Date(item.savedAt || 0).getTime(),
      }))
      .filter((entry) => entry.item);

    return [...reviewActivity, ...favouriteActivity]
      .sort((a, b) => b.sortTime - a.sortTime)
      .slice(0, 6);
  }, [reviews, favourites]);

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    try {
      await updateUserProfile(displayNameInput.trim() || displayName, photoInput.trim() || photoURL);
      toast.success("Profile updated successfully");
      setEditOpen(false);
    } catch (error) {
      toast.error(error?.message || "Failed to update profile");
    } finally {
      setSavingProfile(false);
    }
  };

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
            <button
              type="button"
              onClick={() => setEditOpen(true)}
              className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/15 backdrop-blur border border-white/25 text-white text-xs font-semibold hover:bg-white/25 transition-colors"
            >
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
              {stats.map((s) => (
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
            <div className="flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100 p-1">
              {[
                { id: "about", label: "About" },
                { id: "activity", label: "Activity" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${activeTab === tab.id ? "text-white" : "text-muted hover:bg-base-200/60"}`}
                  style={activeTab === tab.id ? { background: BRAND } : undefined}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "about" ? (
              <>
                <div className="bg-base-100 rounded-2xl border border-base-200 p-6 animate-fade-in-up">
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Account Details</div>
                  <div className="space-y-3">
                    {[
                      { label: "Display Name", value: displayName },
                      { label: "Email", value: email },
                      {
                        label: "Member Since",
                        value: user?.metadata?.creationTime
                          ? new Date(user.metadata.creationTime).toLocaleDateString("en-BD", { year: "numeric", month: "long" })
                          : "—",
                      },
                      { label: "Account Type", value: "Food Lover" },
                    ].map((d) => (
                      <div key={d.label} className="flex items-start justify-between gap-4 text-sm">
                        <span className="text-muted shrink-0 w-32">{d.label}</span>
                        <span className="font-semibold text-heading text-right break-all">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-base-100 rounded-2xl border border-base-200 p-6 animate-fade-in-up">
                  <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-3">Quick Links</div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { to: "/dashboard/reviews", icon: <IoStarSharp size={14} />, label: "My Reviews" },
                      { to: "/dashboard/favourites", icon: <IoHeartOutline size={14} />, label: "My Favourites" },
                      { to: "/dashboard/overview", icon: <IoBookmarkOutline size={14} />, label: "Dashboard" },
                      { to: "/all-items", icon: <IoRestaurantOutline size={14} />, label: "Browse Foods" },
                    ].map((l) => (
                      <Link
                        key={l.to}
                        to={l.to}
                        className="flex items-center gap-2 px-4 py-3 rounded-xl border border-base-200 text-sm font-semibold hover:bg-base-200/60 transition-colors text-heading"
                      >
                        <span style={{ color: BRAND }}>{l.icon}</span>
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-base-100 rounded-2xl border border-base-200 p-6 animate-fade-in-up">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-1">Recent Activity</div>
                    <p className="text-sm text-muted">Live feed from your reviews and favourites.</p>
                  </div>
                  <div className="text-xs font-semibold text-muted">{recentActivity.length} items</div>
                </div>

                {loadingActivity ? (
                  <div className="flex items-center gap-3 rounded-xl border border-base-200 px-4 py-5 text-sm text-muted">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-base-200 border-t-[rgb(226,98,73)]" />
                    Loading live activity...
                  </div>
                ) : activityError ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                    {activityError}
                  </div>
                ) : recentActivity.length === 0 ? (
                  <div className="rounded-xl border border-base-200 px-4 py-6 text-center text-sm text-muted">
                    No recent activity yet. Write a review or save a food to see it here.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {recentActivity.map((a, i) => (
                      <div key={`${a.type}-${a.item}-${i}`} className="flex items-center gap-4 p-3.5 rounded-xl border border-base-200 hover:bg-base-200/30 transition-colors">
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
                )}
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

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-base-200 bg-base-100 p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="text-2xl font-bold text-heading">Edit Profile</h3>
                <p className="text-sm text-muted mt-1">Update your name and profile photo.</p>
              </div>
              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-full border border-base-200 px-3 py-1.5 text-xs font-semibold text-muted hover:bg-base-200/60"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-heading">Display Name</label>
                <input
                  type="text"
                  value={displayNameInput}
                  onChange={(e) => setDisplayNameInput(e.target.value)}
                  className="input-premium"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-heading">Photo URL</label>
                <input
                  type="url"
                  value={photoInput}
                  onChange={(e) => setPhotoInput(e.target.value)}
                  className="input-premium"
                  placeholder="https://..."
                />
              </div>

              <div className="flex gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="flex-1 rounded-2xl border border-base-200 px-4 py-3 text-sm font-semibold hover:bg-base-200/60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingProfile}
                  className="flex-1 rounded-2xl px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
                  style={{ background: BRAND }}
                >
                  {savingProfile ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;