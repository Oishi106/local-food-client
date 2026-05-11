import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { IoCalendarOutline, IoRefreshOutline } from "react-icons/io5";

const STATUS_STYLE = {
  pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
  confirmed: "bg-green-50 text-green-700 border-green-200",
  cancelled: "bg-red-50 text-red-600 border-red-200",
  completed: "bg-blue-50 text-blue-700 border-blue-200",
};

export default function MyBookings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);

  const load = () => {
    setLoading(true);
    setError(null);
    let cancelled = false;

    apiFetch("/bookings")
      .then((data) => {
        if (!cancelled) setRows(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((e) => {
        if (!cancelled) setError(e);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  };

  useEffect(load, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div
          className="w-9 h-9 rounded-full border-4 border-base-200 animate-spin"
          style={{ borderTopColor: "rgb(226,98,73)" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl p-4">
        ⚠️ Failed to load bookings. <button onClick={load} className="underline font-semibold">Retry</button>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
            <IoCalendarOutline size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">My Bookings</h1>
            <p className="text-xs opacity-50">{rows.length} bookings saved</p>
          </div>
        </div>
        <button
          onClick={load}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors"
        >
          <IoRefreshOutline size={15} /> Refresh
        </button>
      </div>

      <div className="bg-base-100 rounded-2xl border border-base-200 overflow-hidden animate-fade-in-up stagger-1">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-base-200">
                {['#', 'Food', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center opacity-40 text-sm">No bookings found.</td>
                </tr>
              ) : (
                rows.map((b, i) => (
                  <tr key={b._id || i} className="border-b border-base-200/60 hover:bg-base-200/30 transition-colors">
                    <td className="px-5 py-3.5 text-xs opacity-40">{i + 1}</td>
                    <td className="px-5 py-3.5 font-semibold">{b.foodName || b.food_name || "—"}</td>
                    <td className="px-5 py-3.5 font-semibold">{b.amount ? `৳${b.amount}` : "—"}</td>
                    <td className="px-5 py-3.5">
                      {b.status ? (
                        <span className={`px-2.5 py-1 rounded-lg border text-xs font-semibold capitalize ${STATUS_STYLE[b.status] || "bg-base-200 border-base-200"}`}>
                          {b.status}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-5 py-3.5 opacity-50 text-xs">
                      {b.createdAt ? new Date(b.createdAt).toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" }) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}