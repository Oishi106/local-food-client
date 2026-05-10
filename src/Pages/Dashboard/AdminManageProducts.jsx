import { useContext, useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { DashboardDataContext } from "../../context/DashboardDataContext";
import { IoRestaurantOutline, IoSearchOutline, IoTrashOutline, IoPencilOutline, IoRefreshOutline } from "react-icons/io5";

export default function AdminManageProducts() {
  const { triggerRefresh } = useContext(DashboardDataContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [deleting, setDeleting] = useState(null);

  const load = () => {
    setLoading(true); setError(null);
    let cancelled = false;
    apiFetch("/foods")
      .then((data) => { if (!cancelled) setItems(Array.isArray(data) ? data : data?.data || []); })
      .catch((e) => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  };
  useEffect(load, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this food item?")) return;
    setDeleting(id);
    try {
      await apiFetch(`/foods/${id}`, { method: "DELETE" });
      setItems(prev => prev.filter(i => i._id !== id));
      triggerRefresh?.();
    } catch {
      alert("Failed to delete.");
    } finally { setDeleting(null); }
  };

  const filtered = items.filter(i =>
    !search || i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.category?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-9 h-9 rounded-full border-4 border-base-200 animate-spin" style={{ borderTopColor: "rgb(226,98,73)" }} />
    </div>
  );
  if (error) return (
    <div className="bg-red-50 text-red-600 border border-red-200 rounded-2xl p-4">
      ⚠️ Failed to load products. <button onClick={load} className="underline font-semibold">Retry</button>
    </div>
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-3 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
            <IoRestaurantOutline size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Manage Products</h1>
            <p className="text-xs opacity-50">{items.length} food items</p>
          </div>
        </div>
        <button onClick={load}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors">
          <IoRefreshOutline size={15} /> Refresh
        </button>
      </div>

      <div className="relative animate-fade-in-up stagger-1">
        <IoSearchOutline size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
        <input type="text" placeholder="Search items…" value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-base-200 bg-base-100 text-sm focus:outline-none focus:border-[rgb(226,98,73)] focus:ring-2 focus:ring-[rgba(226,98,73,0.12)] transition-all"
        />
      </div>

      <div className="bg-base-100 rounded-2xl border border-base-200 overflow-hidden animate-fade-in-up stagger-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-base-200">
                {["Item", "Category", "Price", "Actions"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={4} className="px-5 py-12 text-center opacity-40 text-sm">No items found.</td></tr>
              ) : filtered.map(item => (
                <tr key={item._id} className="border-b border-base-200/60 hover:bg-base-200/30 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-base-200 shrink-0 flex items-center justify-center text-lg">🍽️</div>
                      )}
                      <span className="font-semibold">{item.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2.5 py-1 rounded-lg bg-base-200/70 text-xs font-medium">{item.category || "—"}</span>
                  </td>
                  <td className="px-5 py-3.5 font-semibold">
                    {item.price ? `৳${item.price}` : "—"}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(item._id)}
                        disabled={deleting === item._id}
                        className="p-2 rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors disabled:opacity-40"
                        title="Delete"
                      >
                        <IoTrashOutline size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
