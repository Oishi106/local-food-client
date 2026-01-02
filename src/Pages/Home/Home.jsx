import { NavLink, useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { FoodCard } from "../../components/FoodCard";
import Reveal from "../../components/Reveal";
import SectionHeader from "../../components/SectionHeader";

const Home = () => {
    const data = useLoaderData();

    return (
        <main>
            <Banner />

            {/* 1) Intro */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-14" >
                <section id="intro" className="text-center">
                    <SectionHeader
                        title="Welcome to FoodNest"
                        description="Discover authentic local cuisines, connect with passionate home cooks, and experience food like never before."
                        align="center"
                    />
                </section>
            </Reveal>

            {/* 2) Features */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Features">
                    <SectionHeader
                        title="Core Features"
                        description="Everything you need to explore local food confidently—fast browsing, trusted reviews, and personal collections."
                    />
                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            {
                                icon: "🍅",
                                title: "Fresh Local Ingredients",
                                desc: "Sourced daily from nearby farms and vendors.",
                            },
                            {
                                icon: "👨‍🍳",
                                title: "Top Rated Chefs",
                                desc: "Curated dishes from community-favorite cooks.",
                            },
                            {
                                icon: "⚡",
                                title: "Fast Discovery",
                                desc: "Find great food quickly with smart listings.",
                            },
                            {
                                icon: "⭐",
                                title: "Community Reviews",
                                desc: "Real feedback from local food lovers.",
                            },
                        ].map((f) => (
                            <div
                                key={f.title}
                                className="rounded-lg border border-base-200 bg-base-100 p-4 shadow-sm"
                            >
                                <div className="flex items-start gap-3">
                                    <div className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[rgb(226,98,73)]/15 text-xl">
                                        {f.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-base-content">{f.title}</h3>
                                        <p className="mt-1 text-xs text-base-content/70">{f.desc}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 3) Services */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Services">
                    <SectionHeader
                        title="What You Can Do"
                        description="Explore foods, read reviews, save favourites, and manage your personal dashboard after login."
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[{
                            title: "Browse Available Foods",
                            desc: "Explore listings with details, ratings, and photos.",
                            cta: "Explore",
                            to: "/all-items",
                        }, {
                            title: "Read Trusted Reviews",
                            desc: "See what people love and why—ratings included.",
                            cta: "See Reviews",
                            to: "/auth/login",
                        }, {
                            title: "Save Your Favourites",
                            desc: "Keep a personal list so you can order again.",
                            cta: "Get Started",
                            to: "/auth/login",
                        }].map((s) => (
                            <div key={s.title} className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
                                <h3 className="text-lg font-bold text-base-content">{s.title}</h3>
                                <p className="mt-2 text-sm text-base-content/70">{s.desc}</p>
                                <NavLink
                                    to={s.to}
                                    className="mt-4 inline-flex items-center rounded-full bg-[rgb(226,98,73)] px-5 py-2 text-white hover:bg-[rgb(226,98,73)]/90"
                                >
                                    {s.cta}
                                </NavLink>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 4) Categories */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Categories">
                    <SectionHeader
                        title="Popular Categories"
                        description="Quickly jump into the cuisines people search for most."
                    />
                    <div className="mt-6 flex flex-wrap gap-3">
                        {["Burgers", "BBQ", "Seafood", "Vegan", "Desserts", "Street Food", "Biryani", "Snacks"].map((c) => (
                            <span
                                key={c}
                                className="rounded-full border border-base-200 bg-base-100 px-4 py-2 text-sm text-base-content hover:bg-[rgb(226,98,73)]/10"
                            >
                                {c}
                            </span>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 5) Highlights */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Highlights" className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
                    <SectionHeader
                        title="Why FoodNest"
                        description="Designed for clean discovery, clear reviews, and a better local food experience."
                    />
                    <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {[
                            { title: "Modern UI", desc: "Clean layout and readable typography." },
                            { title: "Secure Access", desc: "Protected features appear after login." },
                            { title: "Fast Navigation", desc: "Smooth scroll and organized sections." },
                        ].map((h) => (
                            <div key={h.title} className="rounded-lg bg-base-200/30 p-4">
                                <h3 className="font-bold text-base-content">{h.title}</h3>
                                <p className="mt-1 text-sm text-base-content/70">{h.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 6) Statistics */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Statistics">
                    <SectionHeader
                        title="Community Stats"
                        description="A quick look at what’s happening across the platform."
                    />
                    <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                        {[
                            { label: "Active Users", value: "12k+" },
                            { label: "Foods Listed", value: "3.8k" },
                            { label: "Reviews", value: "25k+" },
                            { label: "Avg Rating", value: "4.7" },
                        ].map((s) => (
                            <div key={s.label} className="rounded-xl border border-base-200 bg-base-100 p-5 text-center shadow-sm">
                                <div className="text-3xl font-extrabold text-[rgb(226,98,73)]">{s.value}</div>
                                <div className="mt-1 text-sm text-base-content/70">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 7) How it works */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="How it works">
                    <SectionHeader
                        title="How It Works"
                        description="Three simple steps to find and enjoy great local food."
                    />
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {[{
                            step: "1",
                            title: "Browse Local Dishes",
                            desc: "Explore foods posted by nearby cooks and vendors.",
                        }, {
                            step: "2",
                            title: "Read Reviews & Ratings",
                            desc: "Use community feedback to pick confidently.",
                        }, {
                            step: "3",
                            title: "Save & Share",
                            desc: "Keep favourites and share great finds with friends.",
                        }].map((i) => (
                            <div key={i.step} className="rounded-lg border border-base-200 bg-base-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(226,98,73)] text-white font-extrabold">
                                    {i.step}
                                </div>
                                <h3 className="mt-4 font-bold text-base-content">{i.title}</h3>
                                <p className="mt-2 text-sm text-base-content/70">{i.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 8) Testimonials */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Testimonials">
                    <SectionHeader
                        title="What People Say"
                        description="Real feedback from our local food community."
                    />
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {[{
                            name: "Ashiqur Rahman",
                            text: "Hands down the juiciest burger I have had in town. Highly recommend!",
                            rating: 4.9,
                        }, {
                            name: "Sara K",
                            text: "Loved the fresh ingredients and speedy discovery experience.",
                            rating: 4.7,
                        }, {
                            name: "Rafi",
                            text: "Great platform to discover hidden local gems.",
                            rating: 4.8,
                        }].map((t) => (
                            <div key={t.name} className="rounded-lg border border-base-200 bg-base-100 p-6 shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(226,98,73)]/15 text-[rgb(226,98,73)] font-extrabold">
                                        {t.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .slice(0, 2)
                                            .join("")}
                                    </div>
                                    <div>
                                        <div className="font-bold text-base-content">{t.name}</div>
                                        <div className="text-sm text-base-content/70">⭐ {t.rating}</div>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm text-base-content/70">“{t.text}”</p>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 9) Blog */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Articles">
                    <SectionHeader
                        title="Latest Articles"
                        description="Quick reads for food lovers—tips, highlights, and community stories."
                    />
                    <div className="mt-8 grid gap-4 md:grid-cols-3">
                        {[{
                            title: "How to Spot a Truly Great Local Dish",
                            desc: "A short guide to reading ratings, photos, and reviews like a pro.",
                        }, {
                            title: "Top 5 Comfort Foods This Season",
                            desc: "From spicy favourites to sweet desserts—what people love right now.",
                        }, {
                            title: "Supporting Home Cooks & Small Vendors",
                            desc: "Why local food communities matter—and how you can help.",
                        }].map((a) => (
                            <article key={a.title} className="rounded-lg border border-base-200 bg-base-100 p-6 shadow-sm">
                                <h3 className="font-bold text-base-content">{a.title}</h3>
                                <p className="mt-2 text-sm text-base-content/70">{a.desc}</p>
                                <div className="mt-4 text-sm font-semibold text-[rgb(226,98,73)]">Read more →</div>
                            </article>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 10) Newsletter */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Newsletter" className="rounded-xl border border-base-200 bg-base-100 p-6 shadow-sm">
                    <SectionHeader
                        title="Newsletter"
                        description="Get weekly updates on top-rated foods and community highlights."
                    />
                    <form className="mt-6 flex flex-col gap-3 md:flex-row">
                        <label className="flex-1">
                            <span className="sr-only">Email</span>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                required
                            />
                        </label>
                        <button
                            type="submit"
                            className="btn border-none text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90"
                        >
                            Subscribe
                        </button>
                    </form>
                </section>
            </Reveal>

            {/* 11) FAQ */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="FAQ">
                    <SectionHeader
                        title="FAQ"
                        description="Answers to common questions about FoodNest."
                    />
                    <div className="mt-6 space-y-3">
                        {[{
                            q: "Do I need an account to browse foods?",
                            a: "No. You can explore the public listings anytime. Login is required for protected actions like adding reviews and managing your profile.",
                        }, {
                            q: "Why are some features protected?",
                            a: "Protected features help keep reviews and user data secure and trustworthy.",
                        }, {
                            q: "How do favourites work?",
                            a: "After login, you can save foods to your favourites list so you can find them quickly later.",
                        }].map((f) => (
                            <div key={f.q} className="collapse collapse-arrow border border-base-200 bg-base-100">
                                <input type="checkbox" />
                                <div className="collapse-title font-bold text-base-content">{f.q}</div>
                                <div className="collapse-content text-base-content/70">
                                    <p>{f.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 12) CTA */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12">
                <section aria-label="Call to action" className="rounded-xl bg-[rgb(226,98,73)] p-8 text-white shadow-sm">
                    <h2 className="text-2xl md:text-3xl font-extrabold">Ready to discover your next favourite?</h2>
                    <p className="mt-2 text-white/90 max-w-2xl">
                        Explore the latest foods today, then log in to save favourites and access your dashboard.
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                        <NavLink to={"/all-items"} className="btn bg-white text-[rgb(226,98,73)] border-none hover:bg-white/90">
                            Explore Foods
                        </NavLink>
                        <NavLink to={"/auth/login"} className="btn btn-outline border-white/60 text-white hover:bg-white/10">
                            Login
                        </NavLink>
                    </div>
                </section>
            </Reveal>

            {/* 13) Top rated */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-12 pb-14">
                <section id="top-rated" aria-label="Top rated foods">
                    <SectionHeader
                        title="Top Rated This Week"
                        description="Community favorites with the highest ratings."
                    />

                    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
                        {Array.isArray(data)
                            ? data.map((item) => <FoodCard key={item._id} item={item} />)
                            : null}
                    </div>

                    <div className="mt-8 text-center">
                        <NavLink
                            to={"/all-items"}
                            className="btn border-none text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90"
                        >
                            Show All
                        </NavLink>
                    </div>
                </section>
            </Reveal>
        </main>
    );
};

export default Home;