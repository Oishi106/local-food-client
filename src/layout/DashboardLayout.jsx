import { useContext, useMemo, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DashboardDataProvider from "../context/DashboardDataContext";
import {
  IoHomeOutline, IoStarOutline, IoRestaurantOutline,
  IoLogOutOutline, IoMenuOutline,
  IoMoonOutline, IoSunnyOutline, IoChevronForwardOutline,
  IoHeartOutline, IoAddOutline
} from "react-icons/io5";

const NAV_ICONS = {
  "Overview": <IoHomeOutline size={18} />,
  "My Reviews": <IoStarOutline size={18} />,
  "Write Review": <IoAddOutline size={18} />,
  "My Favourites": <IoHeartOutline size={18} />,
};

export default function DashboardLayout() {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.querySelector("html").setAttribute("data-theme", next);
  };

  const menuItems = useMemo(() => {
    return [
      { to: "/dashboard/overview", label: "Overview" },
      { to: "/dashboard/reviews", label: "My Reviews" },
      { to: "/dashboard/reviews/add", label: "Write Review" },
      { to: "/dashboard/favourites", label: "My Favourites" },
    ];
  }, []);

  const handleLogout = async () => {
    await signOutUser();
    navigate("/");
  };

  const Sidebar = () => (
    <aside className="w-72 min-h-full flex flex-col border-r border-base-200 bg-base-100">
      {/* Brand */}
      <div className="p-5 border-b border-base-200">
        <Link to="/" className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <div style={{ width: "82px", height: "66px" }}>
            <img
              src="/lo.png"
              alt="FoodNest"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <div className="text-xl font-extrabold" style={{ color: "rgb(226,98,73)" }}>FoodNest</div>
            <div className="text-xs opacity-50 font-medium -mt-0.5">Dashboard</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-base-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-1 shrink-0"
            style={{ ringColor: "rgba(226,98,73,0.3)" }}>
            <img
              src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
              alt="avatar"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold truncate">{user?.displayName || "User"}</div>
            <div className="text-xs opacity-50 truncate">{user?.email}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <span className="role-user">👤 User</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="text-xs font-bold uppercase tracking-widest opacity-40 px-3 mb-2 mt-1">
          My Account
        </div>
        {menuItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/dashboard/overview" || item.to === "/dashboard/reviews" || item.to === "/dashboard/reviews/add" || item.to === "/dashboard/favourites"}
            onClick={() => setSidebarOpen(false)}
            className={({ isActive }) =>
              `dash-nav-item ${isActive ? "active" : ""}`
            }
          >
            <span className="shrink-0 opacity-70">{NAV_ICONS[item.label]}</span>
            <span className="flex-1">{item.label}</span>
            <IoChevronForwardOutline size={14} className="opacity-30" />
          </NavLink>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="p-3 border-t border-base-200 space-y-1">
        <Link
          to="/"
          className="dash-nav-item opacity-70 hover:opacity-100"
          onClick={() => setSidebarOpen(false)}
        >
          <IoHomeOutline size={18} />
          Back to Home
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="dash-nav-item w-full text-left text-red-500 hover:bg-red-50"
          style={{ color: "#e05252" }}
        >
          <IoLogOutOutline size={18} />
          Sign out
        </button>
      </div>
    </aside>
  );

  return (
    <DashboardDataProvider>
      <div className="flex min-h-screen bg-base-200/40">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex shrink-0">
          <Sidebar />
        </div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-10 flex">
              <Sidebar />
            </div>
          </div>
        )}

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar */}
          <header className="sticky top-0 z-40 bg-base-100/80 backdrop-blur-md border-b border-base-200 px-4 md:px-6 h-16 flex items-center gap-4">
            <button
              type="button"
              aria-label="Toggle sidebar"
              className="lg:hidden btn btn-ghost btn-sm btn-square"
              onClick={() => setSidebarOpen(true)}
            >
              <IoMenuOutline size={22} />
            </button>

            {/* Page title area */}
            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold opacity-50 hidden sm:block">
                User Dashboard
              </div>
            </div>

            {/* Right: theme toggle + avatar */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="btn btn-ghost btn-sm btn-square"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
              </button>

              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar btn-sm">
                  <div className="w-8 rounded-full overflow-hidden">
                    <img
                      referrerPolicy="no-referrer"
                      src={user?.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                      alt="avatar"
                    />
                  </div>
                </div>
                <ul tabIndex={0} className="menu dropdown-content mt-3 w-56 rounded-2xl bg-base-100 p-2 shadow-xl border border-base-200 z-50">
                  <li className="pointer-events-none px-2 py-1.5">
                    <div>
                      <div className="text-sm font-semibold">{user?.displayName || "User"}</div>
                      <div className="text-xs opacity-50">{user?.email}</div>
                    </div>
                  </li>
                  <div className="my-1 h-px bg-base-200" />
                  <li><Link to="/profile">Profile</Link></li>
                  <li><button type="button" onClick={handleLogout} className="text-red-500">Sign out</button></li>
                </ul>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardDataProvider>
  );
}
