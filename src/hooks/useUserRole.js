import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../utils/api";

export function useUserRole() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const email = user?.email;

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (authLoading) return;
      if (!email) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const data = await apiFetch(`/users/role?email=${encodeURIComponent(email)}`);
        if (cancelled) return;
        setRole(data?.role || "user");
      } catch (e) {
        if (cancelled) return;
        setError(e);
        setRole("user");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, [authLoading, email]);

  return useMemo(
    () => ({ role, loading: authLoading || loading, error }),
    [role, authLoading, loading, error]
  );
}
