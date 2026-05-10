import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { apiFetch } from "../../utils/api";

export default function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch(`/payments?email=${encodeURIComponent(user?.email || "")}`);
        if (cancelled) return;
        setRows(Array.isArray(data) ? data : data?.data || []);
      } catch (e) {
        if (cancelled) return;
        setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  if (loading) return <div className="p-2">Loading payments...</div>;
  if (error) return <div className="alert alert-error">Failed to load payments.</div>;

  return (
    <div className="card bg-base-100 border border-base-200">
      <div className="card-body">
        <h2 className="text-lg font-bold">Payment History</h2>
        <div className="overflow-x-auto mt-3">
          <table className="table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>Date</th>
                <th className="text-right">Amount</th>
                <th>Method</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p._id || p.txnId || `${p.amount}-${p.date}`}
                >
                  <td>{p.txnId || p.transactionId || "—"}</td>
                  <td>{p.date ? new Date(p.date).toLocaleDateString() : "—"}</td>
                  <td className="text-right">{p.amount ?? "—"}</td>
                  <td>{p.method || "—"}</td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="opacity-70">No payments found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
