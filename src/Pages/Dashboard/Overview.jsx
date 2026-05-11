import { useContext, useEffect, useMemo, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Legend,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
  Area, AreaChart, Cell
} from "recharts";
import { AuthContext } from "../../context/AuthContext";
import { DashboardDataContext } from "../../context/DashboardDataContext";
import { useUserRole } from "../../hooks/useUserRole";
import { apiFetch } from "../../utils/api";
import {
  IoPeopleOutline, IoStarOutline, IoRestaurantOutline,
  IoTimeOutline, IoHeartOutline, IoAddOutline, IoListOutline,
  IoTrendingUpOutline, IoCalendarOutline
} from "react-icons/io5";

const BRAND = "rgb(226,98,73)";
const FAVS_KEY = "fn_favourites";

function readFavs() {
  try {
    return JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
  } catch {
    return [];
  }
}

function formatMonthKey(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown";
  return date.toLocaleDateString("en-US", { month: "short", year: "2-digit" });
}

function average(numbers) {
  if (!numbers.length) return 0;
  return numbers.reduce((sum, value) => sum + value, 0) / numbers.length;
}

const MetricCard = ({ label, value, icon, color, delay = 0 }) => (
  <div
    className="metric-card bg-base-100 border border-base-200 shadow-sm animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Gradient accent bar */}
    <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-xl" style={{ background: color }} />
    <div className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-xs font-semibold opacity-50 uppercase tracking-wider mb-1">{label}</div>
          <div className="text-3xl font-extrabold tracking-tight">{value}</div>
        </div>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 opacity-90"
          style={{ background: color + "18", color }}>
          {icon}
        </div>
      </div>
    </div>
  </div>
);

const CUSTOM_TOOLTIP = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl shadow-xl border border-base-200 bg-base-100 p-3 text-sm">
      <div className="font-bold mb-1 opacity-70">{label}</div>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="opacity-60">{p.name}:</span>
          <span className="font-semibold">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function Overview() {
  const { user } = useContext(AuthContext);
  const { refreshKey } = useContext(DashboardDataContext);
  const { role } = useUserRole();
  const isAdmin = role === "admin";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [adminData, setAdminData] = useState({ reviews: [], users: [] });

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const email = encodeURIComponent(user?.email || "");
        const [userReviews, allReviews, allUsers] = await Promise.all([
          apiFetch(`/my-reviews?email=${email}`),
          isAdmin ? apiFetch("/details") : Promise.resolve([]),
          isAdmin ? apiFetch("/users") : Promise.resolve([]),
        ]);

        const normalizedReviews = Array.isArray(userReviews) ? userReviews : userReviews?.data || [];
        const normalizedAllReviews = Array.isArray(allReviews) ? allReviews : allReviews?.data || [];
        const normalizedUsers = Array.isArray(allUsers) ? allUsers : allUsers?.data || [];

        if (cancelled) return;

        setReviews(normalizedReviews);
        setFavourites(readFavs());
        setAdminData({ reviews: normalizedAllReviews, users: normalizedUsers });
      } catch (e) {
        if (cancelled) return;
        setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [user?.email, refreshKey]);

  const adminCards = useMemo(() => {
    const s = adminData || {};
    const reviewCount = s.reviews?.length || 0;
    const userCount = s.users?.length || 0;
    const avgRating = average((s.reviews || []).map((r) => parseFloat(r.star_rating) || 0));
    const restaurants = new Set((s.reviews || []).map((r) => r.restaurant_name).filter(Boolean)).size;
    return [
      { label: "All Reviews", value: reviewCount, icon: <IoStarOutline size={22} />, color: BRAND },
      { label: "Users", value: userCount, icon: <IoPeopleOutline size={22} />, color: "#6366f1" },
      { label: "Restaurants", value: restaurants, icon: <IoRestaurantOutline size={22} />, color: "#10b981" },
      { label: "Avg Rating", value: reviewCount ? avgRating.toFixed(1) : "—", icon: <IoHeartOutline size={22} />, color: "#D4AF37" },
    ];
  }, [adminData]);

  const userCards = useMemo(() => {
    const reviewCount = reviews.length;
    const favoriteCount = favourites.length;
    const avgRating = average(reviews.map((r) => parseFloat(r.star_rating) || 0));
    const restaurants = new Set(reviews.map((r) => r.restaurant_name).filter(Boolean)).size;
    return [
      { label: "My Reviews", value: reviewCount, icon: <IoStarOutline size={22} />, color: BRAND },
      { label: "Saved Foods", value: favoriteCount, icon: <IoHeartOutline size={22} />, color: "#6366f1" },
      { label: "Restaurants", value: restaurants, icon: <IoRestaurantOutline size={22} />, color: "#10b981" },
      { label: "Avg Rating", value: reviewCount ? avgRating.toFixed(1) : "—", icon: <IoTrendingUpOutline size={22} />, color: "#D4AF37" },
    ];
  }, [reviews, favourites]);

  const cards = isAdmin ? adminCards : userCards;

  const chartData = useMemo(() => {
    const source = isAdmin ? adminData.reviews : reviews;
    const grouped = new Map();

    source.forEach((item) => {
      const key = formatMonthKey(item.date || item.createdAt || item.updatedAt);
      const current = grouped.get(key) || { label: key, reviews: 0, avgRating: 0, ratingSum: 0, count: 0 };
      const rating = parseFloat(item.star_rating) || 0;
      current.reviews += 1;
      current.ratingSum += rating;
      current.count += 1;
      current.avgRating = current.count ? current.ratingSum / current.count : 0;
      grouped.set(key, current);
    });

    return Array.from(grouped.values()).slice(-6).map((row) => ({
      label: row.label,
      reviews: row.reviews,
      avgRating: Number(row.avgRating.toFixed(1)),
    }));
  }, [reviews, adminData, isAdmin]);

  const topRestaurants = useMemo(() => {
    const source = isAdmin ? adminData.reviews : reviews;
    const counts = new Map();

    source.forEach((item) => {
      const name = item.restaurant_name || "Unknown";
      const current = counts.get(name) || { name, total: 0, totalRating: 0 };
      current.total += 1;
      current.totalRating += parseFloat(item.star_rating) || 0;
      counts.set(name, current);
    });

    return Array.from(counts.values())
      .map((row) => ({
        name: row.name,
        total: row.total,
        avgRating: row.total ? row.totalRating / row.total : 0,
      }))
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [reviews, adminData, isAdmin]);

  const latestReviews = useMemo(() => {
    const source = isAdmin ? adminData.reviews : reviews;
    return [...source]
      .sort((a, b) => new Date(b.date || b.createdAt || 0) - new Date(a.date || a.createdAt || 0))
      .slice(0, 3);
  }, [reviews, adminData, isAdmin]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="w-10 h-10 rounded-full border-4 border-base-200 animate-spin"
        style={{ borderTopColor: BRAND }} />
      <div className="text-sm opacity-50">Loading dashboard...</div>
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-200 rounded-2xl p-4">
      <span className="text-lg">⚠️</span>
      <span>Failed to load dashboard data. Please refresh.</span>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="animate-fade-in-up flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">
            {isAdmin ? "Admin Overview" : "My Dashboard"}
          </h1>
          <p className="text-sm opacity-50 mt-1 flex items-center gap-1.5">
            <IoTimeOutline size={14} />
            Real data from your reviews and favourites
          </p>
        </div>
        {isAdmin && (
          <span className="badge-premium flex items-center gap-1.5">
            ⚡ Admin Access
          </span>
        )}
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {cards.map((c, i) => (
          <MetricCard key={c.label} {...c} delay={i * 80} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Bar chart */}
        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 animate-fade-in-up stagger-3">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base">Review Activity</h2>
            <span className="text-xs opacity-40">Last 6 months</span>
          </div>
          <div className="h-64 w-full">
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm opacity-40">
                No review data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, opacity: 0.6 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, opacity: 0.6 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                  <Bar dataKey="reviews" name="Reviews" fill={BRAND} radius={[6, 6, 0, 0]}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? BRAND : "#6366f1"} />
                    ))}
                  </Bar>
                  <Bar dataKey="avgRating" name="Avg Rating" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Area chart */}
        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base">Review Trend</h2>
            <span className="text-xs opacity-40">All time</span>
          </div>
          <div className="h-64 w-full">
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm opacity-40">
                No trend data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={BRAND} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={BRAND} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, opacity: 0.6 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, opacity: 0.6 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} />
                  <Area
                    type="monotone"
                    dataKey="reviews"
                    name="Reviews"
                    stroke={BRAND}
                    strokeWidth={2.5}
                    fill="url(#revGrad)"
                    dot={{ fill: BRAND, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="avgRating"
                    name="Avg Rating"
                    stroke="#10b981"
                    strokeWidth={2}
                    fillOpacity={0}
                    dot={{ fill: "#10b981", r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-4">
        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base">Latest Reviews</h2>
            <span className="text-xs opacity-40 flex items-center gap-1"><IoCalendarOutline size={12} /> Recent activity</span>
          </div>
          {latestReviews.length === 0 ? (
            <div className="text-sm opacity-40">No reviews yet</div>
          ) : (
            <div className="space-y-3">
              {latestReviews.map((item) => (
                <div key={item._id} className="flex items-start justify-between gap-4 rounded-2xl border border-base-200 p-4">
                  <div className="min-w-0">
                    <div className="font-semibold text-heading line-clamp-1">{item.food_name || "Untitled"}</div>
                    <div className="text-xs text-muted mt-1 line-clamp-2">{item.review_text || "No review text"}</div>
                    <div className="mt-2 text-xs text-muted flex flex-wrap gap-2">
                      <span>{item.restaurant_name || "Unknown restaurant"}</span>
                      <span>•</span>
                      <span>{item.location || "Unknown location"}</span>
                    </div>
                  </div>
                  <div className="shrink-0 text-right">
                    <div className="text-sm font-bold text-amber-500">{item.star_rating || "—"} ★</div>
                    <div className="text-[11px] text-muted mt-1">{formatMonthKey(item.date || item.createdAt || item.updatedAt)}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 animate-fade-in-up">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base">Top Restaurants</h2>
            <span className="text-xs opacity-40">By review count</span>
          </div>
          {topRestaurants.length === 0 ? (
            <div className="text-sm opacity-40">No restaurant data yet</div>
          ) : (
            <div className="space-y-4">
              {topRestaurants.map((item, index) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="font-semibold text-heading line-clamp-1">{item.name}</span>
                    <span className="text-xs text-muted">{item.total} reviews</span>
                  </div>
                  <div className="h-2 rounded-full bg-base-200 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${Math.min(100, item.total * 20)}%`, background: index % 2 === 0 ? BRAND : "#6366f1" }}
                    />
                  </div>
                  <div className="text-[11px] text-muted">
                    Avg rating: {item.avgRating ? item.avgRating.toFixed(1) : "—"}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-base-100 rounded-2xl border border-base-200 p-5 animate-fade-in-up stagger-4">
        <h2 className="font-semibold text-base mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {isAdmin ? (
            <>
              <a href="/dashboard/manage-users" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoPeopleOutline size={16} /> Manage Users
              </a>
              <a href="/dashboard/manage-products" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoRestaurantOutline size={16} /> Manage Products
              </a>
              <a href="/dashboard/all-bookings" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoListOutline size={16} /> All Bookings
              </a>
            </>
          ) : (
            <>
              <a href="/all-items" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoRestaurantOutline size={16} /> Browse Foods
              </a>
              <a href="/dashboard/reviews/add" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoAddOutline size={16} /> Write Review
              </a>
              <a href="/dashboard/reviews" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoStarOutline size={16} /> My Reviews
              </a>
              <a href="/dashboard/favourites" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoHeartOutline size={16} /> My Favourites
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
