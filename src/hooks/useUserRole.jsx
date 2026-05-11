import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { apiFetch } from "../utils/api";

export function useUserRole() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!user?.email) {
        setRole(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const data = await apiFetch("/users");
        const users = Array.isArray(data) ? data : data?.data || [];
        const currentUser = users.find((entry) => entry.email === user.email);
        if (!cancelled) {
          setRole(currentUser?.role || "user");
        }
      } catch {
        if (!cancelled) {
          setRole("user");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [user?.email]);

  return { role, loading };
}