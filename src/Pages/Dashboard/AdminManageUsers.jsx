import { useEffect, useState } from "react";
import { apiFetch } from "../../utils/api";
import { IoPeopleOutline, IoSearchOutline, IoRefreshOutline } from "react-icons/io5";

export default function AdminManageUsers() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState("");

  const load = () => {
    setLoading(true);
    setError(null);
    let cancelled = false;
    apiFetch("/users")
      .then((data) => {
        if (cancelled) return;
        setRows(Array.isArray(data) ? data : data?.data || []);
      })
      .catch((e) => { if (!cancelled) setError(e); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  };

  useEffect(load, []);

  const filtered = rows.filter(r =>
    !search || r.email?.toLowerCase().includes(search.toLowerCase()) ||
    r.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-9 h-9 rounded-full border-4 border-base-200 animate-spin"
        style={{ borderTopColor: "rgb(226,98,73)" }} />
    </div>
  );

  if (error) return (
    <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-200 rounded-2xl p-4">
      ⚠️ Failed to load users. <button onClick={load} className="underline font-semibold">Retry</button>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
            <IoPeopleOutline size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Manage Users</h1>
            <p className="text-xs opacity-50">{rows.length} registered users</p>
          </div>
        </div>
        <button onClick={load}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors">
          <IoRefreshOutline size={15} /> Refresh
        </button>
      </div>

      {/* Search */}
      <div className="relative animate-fade-in-up stagger-1">
        <IoSearchOutline size={16} className="absolute left-4 top-1/2 -translate-y-1/2 opacity-40" />
        <input
          type="text"
          placeholder="Search by email or name…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-base-200 bg-base-100 text-sm focus:outline-none focus:border-[rgb(226,98,73)] focus:ring-2 focus:ring-[rgba(226,98,73,0.12)] transition-all"
        />
      </div>

      {/* Table */}
      <div className="bg-base-100 rounded-2xl border border-base-200 overflow-hidden animate-fade-in-up stagger-2">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-base-200">
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">#</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">User</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">Email</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">Role</th>
                <th className="px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider opacity-50">Joined</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-12 text-center opacity-40 text-sm">
                    {search ? "No users match your search." : "No users found."}
                  </td>
                </tr>
              ) : filtered.map((u, i) => (
                <tr key={u._id || u.email} className="border-b border-base-200/60 hover:bg-base-200/30 transition-colors">
                  <td className="px-5 py-3.5 opacity-40 text-xs">{i + 1}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-base-200 shrink-0 flex items-center justify-center">
                        {u.photoURL
                          ? <img src={u.photoURL} alt="" className="w-full h-full object-cover" />
                          : <span className="text-xs font-bold opacity-40">{(u.name || u.email || "?")[0].toUpperCase()}</span>
                        }
                      </div>
                      <span className="font-medium">{u.name || "—"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 opacity-70">{u.email}</td>
                  <td className="px-5 py-3.5">
                    <span className={u.role === "admin" ? "role-admin" : "role-user"}>
                      {u.role || "user"}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 opacity-50 text-xs">
                    {u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" }) : "—"}
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
