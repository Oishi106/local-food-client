import { createContext, useCallback, useMemo, useState } from "react";

export const DashboardDataContext = createContext({
  refreshKey: 0,
  refresh: () => {},
});

export default function DashboardDataProvider({ children }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const refresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
  }, []);

  const value = useMemo(() => ({ refreshKey, refresh }), [refreshKey, refresh]);

  return (
    <DashboardDataContext.Provider value={value}>
      {children}
    </DashboardDataContext.Provider>
  );
}
