import { Link, NavLink } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut, IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { FaBowlFood, FaCircleInfo, FaGear, FaStar, FaUser } from "react-icons/fa6";
import { useContext, useEffect, useId, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const mobileNavId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const closeMobileNav = () => { setMobileOpen(false); setServicesOpen(false); };
  const handleLogout = async () => { await signOutUser(); closeMobileNav(); };

  const navItemBase = "flex items-center gap-1.5 font-semibold cursor-pointer text-[14px] px-3 py-2 rounded-xl border border-transparent transition-all duration-200 focus:outline-none";
  const navItemInactive = "text-base-content hover:bg-base-200/60";
  const navItemActive = "bg-[rgb(226,98,73)] text-white border-[rgb(226,98,73)]";
  const navLinkClass = ({ isActive }) => `${navItemBase} ${isActive ? navItemActive : navItemInactive}`;

  const publicLinks = useMemo(() => [
    { to: "/", label: "Home", icon: <GoHomeFill /> },
    { to: "/all-items", label: "Available Foods", icon: <FaBowlFood /> },
    { to: "/about", label: "About", icon: <FaCircleInfo /> },
  ], []);

  const loggedInLinks = useMemo(() => [
    { to: "/dashboard/overview", label: "Dashboard" },
  ], []);

  const servicesLinks = useMemo(() => [
    { to: "/all-items", label: "Browse Items" },
    ...(user ? [{ to: "/all-reviews", label: "All Reviews", icon: <FaStar /> }] : []),
  ], [user]);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "shadow-md" : ""}`}>
      <div className={`navbar h-[68px] transition-all duration-300 px-4 md:px-8 
        ${scrolled ? "bg-base-100/90 backdrop-blur-xl" : "bg-base-100/70 backdrop-blur-md"}
        border-b border-base-200/60`}>

        {/* Brand */}
        <div className="navbar-start gap-2">
          <button
            type="button"
            aria-label="Toggle navigation"
            aria-controls={mobileNavId}
            onClick={() => setMobileOpen(v => !v)}
            className="btn btn-ghost btn-sm md:hidden"
          >
            <svg className={`h-5 w-5 transition-transform duration-200 ${mobileOpen ? "rotate-90" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          <Link to="/" onClick={closeMobileNav} className="flex items-center gap-2.5">
            <img className="w-11" src="/lo.png" alt="FoodNest logo" />
            <span className="text-xl font-extrabold tracking-tight md:text-[26px]"
              style={{ color: "rgb(226,98,73)" }}>
              FoodNest
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="navbar-center hidden md:flex">
          <nav className="flex items-center gap-1">
            {publicLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={navLinkClass}>{l.icon}{l.label}</NavLink>
            ))}
            {user && (
              <div className="dropdown dropdown-hover">
                <div tabIndex={0} role="button" className={`${navItemBase} ${navItemInactive}`}>
                  Services ▾
                </div>
                <ul tabIndex={0} className="menu dropdown-content mt-2 w-52 rounded-xl bg-base-100 p-1.5 shadow-xl border border-base-200 z-50">
                  {servicesLinks.map(s => (
                    <li key={s.to}>
                      <NavLink to={s.to} onClick={closeMobileNav}
                        className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${isActive ? "bg-[rgb(226,98,73)] text-white" : "hover:bg-base-200/70"}`}>
                        {s.icon}{s.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {user && loggedInLinks.map(l => (
              <NavLink key={l.to} to={l.to} className={navLinkClass}>{l.label}</NavLink>
            ))}
          </nav>
        </div>

        {/* Right: theme + profile */}
        <div className="navbar-end gap-2">
          <button
            type="button"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            className="btn btn-ghost btn-sm btn-square"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <IoSunnyOutline size={18} /> : <IoMoonOutline size={18} />}
          </button>

          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar btn-sm">
                <div className="w-8 rounded-full ring-2 ring-offset-1 overflow-hidden"
                  style={{ "--tw-ring-color": "rgba(226,98,73,0.4)" }}>
                  <img referrerPolicy="no-referrer"
                    src={user.photoURL || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    alt="avatar" />
                </div>
              </div>
              <ul tabIndex={0} className="menu dropdown-content mt-3 w-60 rounded-2xl bg-base-100 p-2 text-base-content shadow-xl border border-base-200 z-50">
                <li className="pointer-events-none px-2 py-1">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold">{user.displayName || "Signed in"}</span>
                    <span className="text-xs opacity-50">{user.email}</span>
                  </div>
                </li>
                <div className="my-1 h-px bg-base-200" />
                <li><Link to="/profile" onClick={closeMobileNav}><FaUser size={13} />Profile</Link></li>
                <li><Link to="/dashboard/overview" onClick={closeMobileNav}><FaGear size={13} />Dashboard</Link></li>
                <li>
                  <button type="button" onClick={handleLogout} className="text-red-500">
                    <IoLogOut size={15} />Sign out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/auth/login" onClick={closeMobileNav}
              className="btn text-white border-none text-sm px-5 rounded-xl"
              style={{ background: "rgb(226,98,73)" }}>
              <IoLogIn size={16} /> Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      <div id={mobileNavId}
        className={`md:hidden overflow-hidden transition-all duration-250 ease-out ${mobileOpen ? "max-h-[540px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav className="bg-base-100 border-b border-base-200 p-3 flex flex-col gap-1">
          {publicLinks.map(l => (
            <NavLink key={l.to} to={l.to} onClick={closeMobileNav}
              className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-[rgb(226,98,73)] text-white" : "hover:bg-base-200/60"}`}>
              {l.icon}{l.label}
            </NavLink>
          ))}
          {user && (
            <>
              <button type="button" onClick={() => setServicesOpen(v => !v)}
                className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold hover:bg-base-200/60 w-full">
                <span>Services</span>
                <span className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}>▾</span>
              </button>
              <div className={`overflow-hidden transition-all duration-200 ${servicesOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pl-4 flex flex-col gap-1">
                  {servicesLinks.map(s => (
                    <NavLink key={s.to} to={s.to} onClick={closeMobileNav}
                      className={({ isActive }) => `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-[rgb(226,98,73)] text-white" : "hover:bg-base-200/60"}`}>
                      {s.icon}{s.label}
                    </NavLink>
                  ))}
                </div>
              </div>
              {loggedInLinks.map(l => (
                <NavLink key={l.to} to={l.to} onClick={closeMobileNav}
                  className={({ isActive }) => `flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors ${isActive ? "bg-[rgb(226,98,73)] text-white" : "hover:bg-base-200/60"}`}>
                  {l.label}
                </NavLink>
              ))}
              <button type="button" onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 w-full text-left">
                <IoLogOut size={16} /> Sign out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
