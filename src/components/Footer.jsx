import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const mainLinks = [
    { to: '/', label: 'Home' },
    { to: '/all-items', label: 'All Items' },
    { to: '/all-reviews', label: 'All Reviews' },
    { to: '/about', label: 'About' },
    { to: '/auth/login', label: 'Login' },
    { to: '/auth/register', label: 'Register' },
  ];

  const dashboardLinks = [
    { to: '/dashboard/overview', label: 'Overview' },
    { to: '/dashboard/reviews', label: 'My Reviews' },
    { to: '/dashboard/reviews/add', label: 'Add Review' },
    { to: '/dashboard/favourites', label: 'My Favourites' },
    { to: '/my-downloads', label: 'My Downloads' },
    { to: '/profile', label: 'Profile' },
  ];


  return (
    <footer className="w-screen relative left-1/2 right-1/2 -mx-[50vw] overflow-hidden border-t border-(--border) bg-(--surface-1) text-(--text-primary) brand-mesh">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(226,98,73,0.10),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.08),transparent_26%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(226,98,73,0.16),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.10),transparent_26%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-(--border) to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.9fr_0.9fr_0.9fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[rgb(226,98,73)] shadow-sm backdrop-blur dark:bg-(--surface-2)">
              <img src="/lo.png" alt="FoodNest logo" className="h-4 w-auto object-contain" />
              FoodNest
            </div>
            <h3 className="max-w-sm text-3xl font-extrabold leading-tight text-(--text-primary) md:text-4xl">
              Discover, review, and save the best food in one place.
            </h3>
            <p className="max-w-md text-sm leading-7 text-(--text-muted)">
              FoodNest brings together food discovery, honest reviews, favourites, and personal dashboards in a single place.
            </p>
            <div className="flex items-center gap-3 text-(--text-muted)">
              <MapPin size={16} />
              <span className="text-sm">Bangladesh</span>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-(--text-muted)">Explore</h4>
            <ul className="space-y-3">
              {mainLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="group inline-flex items-center gap-2 text-sm text-(--text-muted) transition hover:text-[rgb(226,98,73)]">
                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-(--text-muted)">Dashboard</h4>
            <ul className="space-y-3">
              {dashboardLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="group inline-flex items-center gap-2 text-sm text-(--text-muted) transition hover:text-[rgb(226,98,73)]">
                    <ArrowUpRight size={14} className="opacity-0 transition group-hover:opacity-100" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-(--text-muted)">Connect</h4>
            <div className="flex items-center gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-white/90 text-(--text-muted) transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-[rgb(226,98,73)] hover:shadow-sm dark:bg-(--surface-2)">
                <Facebook size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-white/90 text-(--text-muted) transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-[rgb(226,98,73)] hover:shadow-sm dark:bg-(--surface-2)">
                <Twitter size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-white/90 text-(--text-muted) transition hover:-translate-y-0.5 hover:border-orange-200 hover:text-[rgb(226,98,73)] hover:shadow-sm dark:bg-(--surface-2)">
                <Instagram size={18} />
              </a>
            </div>

            <a
              href="mailto:foodnestsupport@gmail.com"
              className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-(--border) bg-white/90 px-4 py-3 text-sm text-(--text-muted) transition hover:border-orange-200 hover:text-[rgb(226,98,73)] hover:shadow-sm dark:bg-(--surface-2)"
            >
              <Mail size={16} />
              foodnestsupport@gmail.com
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-(--border) pt-6 text-sm text-(--text-muted) md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} FoodNest. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/about" className="transition hover:text-[rgb(226,98,73)]">About</Link>
            <Link to="/all-items" className="transition hover:text-[rgb(226,98,73)]">All Items</Link>
            <Link to="/all-reviews" className="transition hover:text-[rgb(226,98,73)]">Reviews</Link>
            <Link to="/auth/login" className="transition hover:text-[rgb(226,98,73)]">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;