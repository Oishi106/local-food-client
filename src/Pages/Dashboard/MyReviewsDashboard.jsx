import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthContext";
import { DashboardDataContext } from "../../context/DashboardDataContext";
import { apiFetch } from "../../utils/api";

export default function MyReviewsDashboard() {
  const { user } = useContext(AuthContext);
  const { refresh } = useContext(DashboardDataContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);

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

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this review?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      await apiFetch(`/details/${id}`, { method: "DELETE" });
      await load();
      refresh();
      Swal.fire({ title: "Deleted", icon: "success" });
    } catch (e) {
      Swal.fire({ title: "Delete failed", text: e.message, icon: "error" });
    }
  };

  if (loading) return <div className="p-2">Loading reviews...</div>;
  if (error) return <div className="alert alert-error">Failed to load reviews.</div>;

  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">My Reviews</h2>
          <Link to="/dashboard/reviews/add" className="btn btn-sm">
            Add Review
          </Link>
        </div>

        <div className="overflow-x-auto mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Restaurant</th>
                <th>Rating</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r._id}>
                  <td>{r.food_name || "—"}</td>
                  <td>{r.restaurant_name || "—"}</td>
                  <td>{r.star_rating ?? "—"}</td>
                  <td className="text-right">
                    <div className="inline-flex gap-2">
                      <Link to={`/item-details/${r._id}`} className="btn btn-ghost btn-xs">
                        View
                      </Link>
                      <Link to={`/dashboard/reviews/${r._id}/edit`} className="btn btn-ghost btn-xs">
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(r._id)}
                        className="btn btn-ghost btn-xs"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="opacity-70">No reviews found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
