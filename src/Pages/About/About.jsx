import {
  BadgeCheck,
  CreditCard,
  Eye,
  HeartHandshake,
  MapPin,
  MessageSquareText,
  ShieldCheck,
  ShoppingBag,
  Target,
  Truck,
  Utensils,
} from "lucide-react";
import { NavLink } from "react-router";
import SectionHeader from "../../components/SectionHeader";

const About = () => {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* 1) Hero */}
      <section
        aria-label="About FoodNest hero"
        className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm md:p-10"
      >
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold text-base-content/70">FoodNest • Local Food Network</p>
            <h1 className="mt-3 text-3xl font-extrabold text-[rgb(226,98,73)] md:text-5xl">About FoodNest</h1>
            <p className="mt-4 max-w-xl text-sm text-base-content/70 md:text-base">
              FoodNest helps people discover local food, explore items from home cooks and vendors, and make confident
              choices using real community reviews.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <NavLink
                to={"/all-items"}
                className="btn border-none text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90"
              >
                Explore Foods
              </NavLink>
              <NavLink to={"/auth/login"} className="btn btn-outline">
                Start Ordering
              </NavLink>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src="/about/foodnest-hero.svg"
              alt="FoodNest illustration"
              className="w-full max-w-md rounded-2xl"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* 2) Who We Are */}
      <section
        aria-label="Who we are"
        className="mt-12 rounded-2xl border border-base-200 bg-linear-to-r from-[rgb(226,98,73)]/6 via-base-200/30 to-base-200/10 p-6 shadow-sm md:p-10"
      >
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-5">
            <SectionHeader
              title="Who We Are"
              description="FoodNest is built with a simple goal: make local food discovery feel effortless, reliable, and enjoyable."
            />

            <p className="mt-6 text-sm text-base-content/80 md:text-base">
              <span className="font-semibold text-[rgb(226,98,73)]">FoodNest</span> brings local food closer to you—highlighting
              home cooks and vendors, showcasing real reviews, and keeping the experience clean and fast on mobile, tablet,
              and desktop.
            </p>

            <div className="mt-6 rounded-xl border border-base-200 bg-base-100 p-5 shadow-sm">
              <h3 className="text-sm font-extrabold text-[rgb(226,98,73)]">What we value</h3>
              <ul className="mt-4 space-y-3">
                {[
                  "Clear information and trustworthy listings",
                  "Smooth navigation with consistent UI patterns",
                  "Accessibility-friendly design in light and dark mode",
                ].map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <span className="mt-0.5 rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                      <BadgeCheck className="h-4 w-4" />
                    </span>
                    <span className="text-sm text-base-content/80">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {["Local-first", "Review-driven", "Fast UI", "Mobile-ready"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-[rgb(226,98,73)]/20 bg-base-100 px-3 py-1.5 text-xs font-semibold text-base-content/80"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[rgb(226,98,73)]/40">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                    <Utensils className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-base-content">Simple Discovery</h3>
                </div>
                <p className="mt-3 text-sm text-base-content/80">
                  Explore available foods with clear details, photos, and ratings—so you can decide quickly.
                </p>
              </div>

              <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[rgb(226,98,73)]/40">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-base-content">Quality & Trust</h3>
                </div>
                <p className="mt-3 text-sm text-base-content/80">
                  Review-first experience with transparent information to help you choose confidently.
                </p>
              </div>

              <div className="sm:col-span-2 rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-[rgb(226,98,73)]/40">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold text-base-content">Modern User Experience</h3>
                </div>
                <p className="mt-3 text-sm text-base-content/80">
                  A professional UI with consistent spacing, soft shadows, and responsive layouts—built to feel smooth and
                  production-ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3) Mission & Vision */}
      <section
        aria-label="Mission and vision"
        className="mt-12 rounded-2xl border border-base-200 bg-[rgb(226,98,73)]/5 p-6 shadow-sm md:p-10"
      >
        <SectionHeader
          title="Our Mission & Vision"
          description="We focus on speed, convenience, and trust—supporting users and local restaurants together."
          align="center"
        />

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-base-content">Mission</h3>
            </div>
            <p className="mt-3 text-sm text-base-content/70">
              Deliver quality food with speed and convenience—helping users place orders confidently in minutes.
            </p>
          </div>

          <div className="rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                <Eye className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-bold text-base-content">Vision</h3>
            </div>
            <p className="mt-3 text-sm text-base-content/70">
              Build a trusted digital food ecosystem that supports local restaurants and keeps pricing and information transparent.
            </p>
          </div>
        </div>
      </section>

     

      

     

      {/* 8) CTA */}
      <section
        aria-label="Call to action"
        className="mt-12 rounded-2xl border border-base-200 bg-base-200/10 p-6 shadow-sm md:p-10"
      >
        <div className="rounded-2xl border border-base-200 bg-base-100 p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-3 md:items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-extrabold text-base-content">Ready to explore FoodNest?</h2>
              <p className="mt-2 max-w-2xl text-sm text-base-content/70">
                Explore local food items, check ratings, and start your journey with a smooth and reliable experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <NavLink
                to={"/all-items"}
                className="btn border-none text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90"
              >
                Browse Foods
              </NavLink>
              <NavLink to={"/auth/login"} className="btn btn-outline">
                Login
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
