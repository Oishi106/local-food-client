import { Link, NavLink } from "react-router";
import { GoHomeFill } from "react-icons/go";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import { FaBowlFood, FaCircleInfo, FaGear, FaStar, FaUser } from "react-icons/fa6";
import { ImBoxAdd } from "react-icons/im";
import { useContext, useEffect, useId, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const NavBar = () => {
  const { user, signOutUser } = useContext(AuthContext);

  const mobileNavId = useId();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const html = document.querySelector("html");
    html.setAttribute("data-theme", theme)
    localStorage.setItem("theme", theme)
  }, [theme])


  const handleTheme = (checked) => {
    setTheme(checked ? "dark" : "light")
  }

  const closeMobileNav = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const handleLogout = async () => {
    await signOutUser();
    closeMobileNav();
  };

  const navItemBaseClass =
    "m-3 flex items-center gap-1.5 font-bold cursor-pointer text-[15px] p-2 rounded-3xl border-2 border-transparent transition-all duration-200 focus:outline-none focus-visible:ring focus-visible:ring-[rgb(226,98,73)]/30";

  const navItemInactiveClass =
    "text-base-content hover:border-base-300 hover:px-3 hover:bg-[#F7755C] hover:text-white";

  const navItemActiveClass = "border-base-300 px-3 bg-[#F7755C] text-white";

  const navLinkClass = ({ isActive }) =>
    `${navItemBaseClass} ${isActive ? navItemActiveClass : navItemInactiveClass}`;

  const dropdownLinkClass = ({ isActive }) =>
    `flex items-center gap-1.5 font-bold cursor-pointer text-[15px] p-2 rounded-3xl border-2 border-transparent transition-all duration-200 ${
      isActive ? navItemActiveClass : navItemInactiveClass
    }`;

  const publicLinks = useMemo(
    () => [
      { to: "/", label: "Home", icon: <GoHomeFill /> },
      { to: "/all-items", label: "Available Foods", icon: <FaBowlFood /> },
      { to: "/about", label: "About", icon: <FaCircleInfo /> },
    ],
    []
  );

  const loggedInLinks = useMemo(
    () => [
      { to: "/my-reviews", label: "Dashboard" },
      { to: "/my-downloads", label: "Bookings" },
    ],
    []
  );

  const servicesLinks = useMemo(
    () =>
      [
        { to: "/all-items", label: "Browse Items" },
        ...(user
          ? [
            { to: "/all-reviews", label: "All Reviews", icon: <FaStar /> },
            { to: "/add-Review", label: "Add Review", icon: <ImBoxAdd /> },
          ]
          : []),
      ],
    [user]
  );

  return (
    <header className="sticky top-0 z-50 isolate">
      <div className="navbar h-20 bg-base-100/70 backdrop-blur-sm shadow-[0_4px_8px_rgba(0,0,0,0.1)] mb-0.5 p-3 md:px-10">
          <div className="navbar-start gap-2">
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-controls={mobileNavId}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="btn btn-ghost btn-sm md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform duration-200 ${mobileOpen ? "rotate-90" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </button>

            <Link to={"/"} onClick={closeMobileNav} className="flex items-center gap-2">
              <img className="w-14" src="/lo.png" alt="FoodNest logo" />
              <span className="text-[22px] font-extrabold text-[rgb(226,98,73)] tracking-tight md:text-[35px]">FoodNest</span>
            </Link>
          </div>

          <div className="navbar-center hidden md:flex">
            <nav aria-label="Primary" className="flex items-center gap-2">
              {publicLinks.map((l) => (
                <NavLink key={l.to} to={l.to} className={navLinkClass}>
                  {l.icon}
                  {l.label}
                </NavLink>
              ))}

              {user && (
                <div className="dropdown dropdown-hover">
                  <div
                    tabIndex={0}
                    role="button"
                    className={`${navItemBaseClass} ${navItemInactiveClass}`}
                  >
                    Services
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu dropdown-content mt-2 w-56 rounded-box bg-base-100 p-2 shadow"
                  >
                    {servicesLinks.map((s) => (
                      <li key={s.to}>
                        <NavLink
                          to={s.to}
                          onClick={closeMobileNav}
                          className={dropdownLinkClass}
                        >
                          {s.icon}
                          {s.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {user &&
                loggedInLinks.map((l) => (
                  <NavLink key={l.to} to={l.to} className={navLinkClass}>
                    {l.label}
                  </NavLink>
                ))}
            </nav>
          </div>

          <div className="navbar-end gap-2">
            <label className="swap swap-rotate">
              <input
                aria-label="Toggle dark mode"
                type="checkbox"
                onChange={(e) => handleTheme(e.target.checked)}
                checked={theme === "dark"}
              />
              <svg
                className="swap-on h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5.64 17l-.71.71a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71a1 1 0 0 0-1.41-1.41ZM5 12a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h1a1 1 0 0 0 1-1Zm7-7a1 1 0 0 0 1-1V3a1 1 0 0 0-2 0v1a1 1 0 0 0 1 1Zm7.36 2.05a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.71-.71a1 1 0 1 0-1.41 1.41l.71.71ZM21 11h-1a1 1 0 0 0 0 2h1a1 1 0 0 0 0-2Zm-9 8a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1Zm-7.36-2.05a1 1 0 0 0 0 1.41 1 1 0 0 0 1.41 0l.71-.71a1 1 0 0 0-1.41-1.41l-.71.71ZM18.36 17a1 1 0 0 0-1.41 1.41l.71.71a1 1 0 0 0 1.41 0 1 1 0 0 0 0-1.41l-.71-.71ZM12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z" />
              </svg>
              <svg
                className="swap-off h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.64 13a1 1 0 0 0-1.05-.14 8.05 8.05 0 0 1-3.37.73A8.15 8.15 0 0 1 9.08 5.49a8.59 8.59 0 0 1 .25-2A1 1 0 0 0 8 2.36 10.14 10.14 0 1 0 22 14a1 1 0 0 0-.36-1Z" />
              </svg>
            </label>

            {user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  aria-label="Open profile menu"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-9 rounded-full ring-2 ring-base-100/40">
                    <img
                      alt="User avatar"
                      referrerPolicy="no-referrer"
                      src={
                        user.photoURL ||
                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content mt-3 w-60 rounded-box bg-base-100 p-2 text-base-content shadow"
                >
                  <li className="pointer-events-none">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold">
                        {user.displayName || "Signed in"}
                      </span>
                      <span className="text-xs opacity-70">{user.email}</span>
                    </div>
                  </li>
                  <div className="my-2 h-px bg-base-200" />
                  <li>
                    <Link to={"/profile"} onClick={closeMobileNav}>
                      <FaUser /> Profile
                    </Link>
                  </li>
                  <li>
                    <button type="button">
                      <FaGear /> Settings
                    </button>
                  </li>
                  <li>
                    <button type="button" onClick={handleLogout}>
                      <IoLogOut /> Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to={"/auth/login"}
                onClick={closeMobileNav}
                className="btn text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90 border-none"
              >
                <IoLogIn /> Login
              </Link>
            )}
          </div>
        </div>

        {/* Mobile / Tablet menu */}
        <div
          id={mobileNavId}
          className={`md:hidden overflow-hidden transition-all duration-200 ease-out ${mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          <nav aria-label="Mobile" className="pb-3">
            <div className="mt-2 rounded-box bg-base-100 p-2 text-base-content shadow-sm">
              {publicLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={closeMobileNav}
                  className={navLinkClass}
                >
                  {l.icon}
                  {l.label}
                </NavLink>
              ))}

              {user && (
                <>
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    className={`${navItemBaseClass} ${navItemInactiveClass} w-full justify-between`}
                  >
                    <span>Services</span>
                    <span
                      className={`transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      ▾
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-200 ease-out ${
                      servicesOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="pl-2">
                      {servicesLinks.map((s) => (
                        <NavLink
                          key={s.to}
                          to={s.to}
                          onClick={closeMobileNav}
                          className={dropdownLinkClass}
                        >
                          {s.icon}
                          {s.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {user ? (
                <>
                  {loggedInLinks.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      onClick={closeMobileNav}
                      className={navLinkClass}
                    >
                      {l.label}
                    </NavLink>
                  ))}
                  <NavLink
                    to={"/profile"}
                    onClick={closeMobileNav}
                    className={navLinkClass}
                  >
                    <FaUser /> Profile
                  </NavLink>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`${navItemBaseClass} ${navItemInactiveClass}`}
                  >
                    <IoLogOut /> Logout
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </nav>
        </div>
    </header>
  );
};

export default NavBar;