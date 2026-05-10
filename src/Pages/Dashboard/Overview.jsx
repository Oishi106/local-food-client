import { useContext, useEffect, useMemo, useState } from "react";
import {
  Bar, BarChart, CartesianGrid, Legend,
  ResponsiveContainer, Tooltip, XAxis, YAxis,
  Area, AreaChart
} from "recharts";
import { AuthContext } from "../../context/AuthContext";
import { DashboardDataContext } from "../../context/DashboardDataContext";
import { useUserRole } from "../../hooks/useUserRole";
import { apiFetch } from "../../utils/api";
import {
  IoReceiptOutline, IoPeopleOutline, IoCardOutline,
  IoStarOutline, IoRestaurantOutline, IoTrendingUpOutline,
  IoTimeOutline
} from "react-icons/io5";

const BRAND = "rgb(226,98,73)";

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
  const [metrics, setMetrics] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError(null);
      try {
        const data = await apiFetch(
          `/dashboard/overview?email=${encodeURIComponent(user?.email || "")}`
        );
        if (cancelled) return;
        setMetrics(data?.metrics || null);
        setChartData(Array.isArray(data?.chartData) ? data.chartData : []);
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
    const s = metrics || {};
    return [
      { label: "Total Bookings", value: s.totalBookings ?? "—", icon: <IoReceiptOutline size={22} />, color: BRAND },
      { label: "Food Items", value: s.totalServices ?? "—", icon: <IoRestaurantOutline size={22} />, color: "#6366f1" },
      { label: "Registered Users", value: s.totalUsers ?? "—", icon: <IoPeopleOutline size={22} />, color: "#10b981" },
      { label: "Revenue (৳)", value: s.revenue ?? "—", icon: <IoCardOutline size={22} />, color: "#D4AF37" },
    ];
  }, [metrics]);

  const userCards = useMemo(() => {
    const s = metrics || {};
    return [
      { label: "My Bookings", value: s.totalBookings ?? "—", icon: <IoReceiptOutline size={22} />, color: BRAND },
      { label: "My Reviews", value: s.totalServices ?? "—", icon: <IoStarOutline size={22} />, color: "#6366f1" },
      { label: "Payments Made", value: s.totalUsers ?? "—", icon: <IoCardOutline size={22} />, color: "#10b981" },
      { label: "Amount Spent (৳)", value: s.revenue ?? "—", icon: <IoTrendingUpOutline size={22} />, color: "#D4AF37" },
    ];
  }, [metrics]);

  const cards = isAdmin ? adminCards : userCards;

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
            Last updated just now
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
            <h2 className="font-semibold text-base">Performance Overview</h2>
            <span className="text-xs opacity-40">Updates on changes</span>
          </div>
          <div className="h-64 w-full">
            {chartData.length === 0 ? (
              <div className="flex items-center justify-center h-full text-sm opacity-40">
                No performance data yet
              </div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }} barSize={16}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="label" tick={{ fontSize: 12, opacity: 0.6 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, opacity: 0.6 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CUSTOM_TOOLTIP />} cursor={{ fill: "rgba(0,0,0,0.04)" }} />
                  <Legend wrapperStyle={{ fontSize: "12px", paddingTop: "12px" }} />
                  <Bar dataKey="revenue" name="Revenue" fill={BRAND} radius={[6, 6, 0, 0]} />
                  <Bar dataKey="bookings" name="Bookings" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Area chart */}
        <div className="bg-base-100 rounded-2xl border border-base-200 p-5 animate-fade-in-up stagger-4">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-semibold text-base">Revenue Trend</h2>
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
                    dataKey="revenue"
                    name="Revenue"
                    stroke={BRAND}
                    strokeWidth={2.5}
                    fill="url(#revGrad)"
                    dot={{ fill: BRAND, r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
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
              <a href="/dashboard/bookings" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoReceiptOutline size={16} /> My Bookings
              </a>
              <a href="/dashboard/reviews" className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/70 transition-colors flex items-center gap-2">
                <IoStarOutline size={16} /> My Reviews
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
