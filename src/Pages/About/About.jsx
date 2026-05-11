import { BadgeCheck, HeartHandshake, Target, Utensils, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";
import SectionHeader from "../../components/SectionHeader";

const About = () => {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-12">
      <section className="relative overflow-hidden rounded-3xl border border-base-200 bg-base-100/80 shadow-xl backdrop-blur-sm">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at top left, rgba(226,98,73,0.10), transparent 28%), radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 22%)",
          }}
        />

        <div className="relative grid gap-8 p-6 md:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:p-12">
          <div className="space-y-6">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-base-200 bg-base-100/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: "rgb(226,98,73)" }}
            >
              FoodNest • Local Food Network
            </span>

            <div className="space-y-4">
              <h1 className="text-3xl font-extrabold leading-tight text-heading md:text-5xl">
                About FoodNest
              </h1>
              <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
                FoodNest makes local food discovery simple, trustworthy, and enjoyable. Explore items, read real reviews,
                and find the dishes worth trying near you.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/all-items"
                className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: "rgb(226,98,73)" }}
              >
                Explore Foods
              </NavLink>
              <NavLink
                to="/auth/login"
                className="inline-flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100/70 px-6 py-3 text-sm font-semibold hover:bg-base-200/70 transition-colors"
              >
                Join the Community
              </NavLink>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {[
                "Local-first discovery",
                "Review-driven decisions",
                "Fast, clean UI",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-base-200 bg-base-100/70 px-4 py-3 text-sm font-semibold text-heading"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                  <Utensils className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-heading">Simple Discovery</h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Browse food cards with photos, ratings, restaurant names, and quick details all in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-heading">Trusted Reviews</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Real community feedback helps users make better choices quickly.
                </p>
              </div>

              <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[rgb(226,98,73)]/15 p-2 text-[rgb(226,98,73)]">
                    <HeartHandshake className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-heading">Community Focus</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Built to support food lovers and local vendors in one place.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 md:grid-cols-2">
        <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm md:p-8">
          <SectionHeader title="Our Mission" description="Keep food discovery fast, honest, and easy to understand." />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            We want people to find great local meals without friction. Every screen is designed to stay clear,
            responsive, and focused on the food.
          </p>
        </div>

        <div className="rounded-3xl border border-base-200 bg-base-100 p-6 shadow-sm md:p-8">
          <SectionHeader
            title="Our Vision"
            description="Build a trusted food ecosystem where reviews and discovery work together."
          />
          <p className="mt-4 text-sm leading-relaxed text-muted">
            FoodNest should feel like a clean, premium hub where every user can explore, review, and save great local
            dishes with confidence.
          </p>
        </div>
      </section>

      <section className="mt-12 rounded-3xl border border-base-200 bg-base-100/80 p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-extrabold text-heading">Ready to explore FoodNest?</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              Browse the latest dishes, check ratings, and jump into reviews from the community.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <NavLink
              to="/all-items"
              className="inline-flex items-center gap-2 rounded-2xl px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
              style={{ background: "rgb(226,98,73)" }}
            >
              Browse Foods
            </NavLink>
            <NavLink
              to="/all-reviews"
              className="inline-flex items-center gap-2 rounded-2xl border border-base-200 bg-base-100/70 px-6 py-3 text-sm font-semibold hover:bg-base-200/70 transition-colors"
            >
              View Reviews
            </NavLink>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
