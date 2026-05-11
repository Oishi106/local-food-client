import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DashboardDataContext } from "../../context/DashboardDataContext";
import { apiFetch } from "../../utils/api";
import {
  IoStarSharp, IoTrashOutline, IoPencilOutline,
  IoEyeOutline, IoAddOutline, IoRefreshOutline, IoStarOutline
} from "react-icons/io5";

export default function MyReviewsDashboard() {
  const { user } = useContext(AuthContext);
  const { refresh } = useContext(DashboardDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiFetch(`/my-reviews?email=${encodeURIComponent(user?.email || "")}`);
      setRows(Array.isArray(data) ? data : data?.data || []);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this review? This cannot be undone.")) return;
    setDeletingId(id);
    try {
      await apiFetch(`/details/${id}`, { method: "DELETE" });
      setRows(prev => prev.filter(r => r._id !== id));
      refresh?.();
    } catch (e) {
      alert("Delete failed: " + e.message);
    } finally {
      setDeletingId(null);
    }
  };

  const avgRating = rows.length
    ? (rows.reduce((s, r) => s + (parseFloat(r.star_rating) || 0), 0) / rows.length).toFixed(1)
    : null;

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-9 h-9 rounded-full border-4 border-base-200 animate-spin"
        style={{ borderTopColor: "rgb(226,98,73)" }} />
    </div>
  );

  if (error) return (
    <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl p-4">
      ⚠️ Failed to load reviews. <button onClick={load} className="underline font-semibold">Retry</button>
    </div>
  );

  return (
    <div className="space-y-5">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
            <IoStarOutline size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">My Reviews</h1>
            <p className="text-xs opacity-50">{rows.length} reviews written</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={load}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors">
            <IoRefreshOutline size={15} />
          </button>
          <Link to="/dashboard/reviews/add"
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
            style={{ background: "rgb(226,98,73)" }}>
            <IoAddOutline size={16} /> Add Review
          </Link>
        </div>
      </div>

      {/* Stats row */}
      {rows.length > 0 && (
        <div className="grid grid-cols-3 gap-3 animate-fade-in-up stagger-1">
          {[
            { label: "Total Reviews", value: rows.length, icon: "📝" },
            { label: "Avg Rating", value: avgRating ? `${avgRating} ★` : "—", icon: "⭐" },
            { label: "Restaurants", value: new Set(rows.map(r => r.restaurant_name).filter(Boolean)).size, icon: "🍴" },
          ].map(s => (
            <div key={s.label} className="bg-base-100 rounded-2xl border border-base-200 p-4 text-center shadow-sm">
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-xl font-extrabold text-heading">{s.value}</div>
              <div className="text-xs text-muted mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {rows.length === 0 ? (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-14 text-center animate-fade-in-up stagger-1">
          <div className="text-5xl mb-4">✍️</div>
          <div className="font-bold text-base mb-1">No reviews yet</div>
          <p className="text-sm text-muted mb-5">Share your food experiences with the community!</p>
          <Link to="/dashboard/reviews/add"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: "rgb(226,98,73)" }}>
            <IoAddOutline size={16} /> Write First Review
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in-up stagger-2">
          {rows.map(r => {
            const stars = parseFloat(r.star_rating) || 0;
            return (
              <div key={r._id}
                className="group bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: "rgb(226,98,73)" }} />

                {/* Image */}
                {r.food_image && (
                  <div className="h-36 overflow-hidden bg-base-200">
                    <img src={r.food_image} alt={r.food_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}

                <div className="p-4 flex flex-col gap-2.5">
                  {/* Food name */}
                  <h3 className="font-bold text-base text-heading line-clamp-1">{r.food_name || "—"}</h3>

                  {/* Stars */}
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IoStarSharp key={i} size={13}
                        className={i < Math.floor(stars) ? "text-amber-400" : "text-base-200"} />
                    ))}
                    <span className="ml-1.5 text-xs font-semibold text-muted">{stars > 0 ? stars.toFixed(1) : "—"}</span>
                  </div>

                  {/* Restaurant */}
                  {r.restaurant_name && (
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg self-start"
                      style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
                      🍴 {r.restaurant_name}
                    </span>
                  )}

                  {/* Review snippet */}
                  {r.review_text && (
                    <p className="text-xs text-muted leading-relaxed line-clamp-2 italic">
                      "{r.review_text}"
                    </p>
                  )}

                  {/* Divider */}
                  <div className="h-px bg-base-200" />

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link to={`/item-details/${r._id}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-base-200 hover:bg-base-200/60 transition-colors flex-1 justify-center">
                      <IoEyeOutline size={13} /> View
                    </Link>
                    <Link to={`/dashboard/reviews/${r._id}/edit`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-base-200 hover:bg-base-200/60 transition-colors flex-1 justify-center">
                      <IoPencilOutline size={13} /> Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleDelete(r._id)}
                      disabled={deletingId === r._id}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold hover:bg-red-50 hover:text-red-500 border border-base-200 transition-colors disabled:opacity-40"
                    >
                      <IoTrashOutline size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
