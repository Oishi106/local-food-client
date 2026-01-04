import { useEffect, useState } from "react";
import { NavLink, useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { FoodCard } from "../../components/FoodCard";
import Reveal from "../../components/Reveal";

const SectionHeading = ({ title, description, align = "left" }) => (
    <header className={`space-y-2 ${align === "center" ? "text-center" : "text-left"}`}>
        <h2 className="text-3xl font-extrabold leading-tight text-[#EB4949] md:text-4xl">{title}</h2>
        {description ? (
            <p className="text-sm text-base-content/70 md:text-base">{description}</p>
        ) : null}
    </header>
);

const Carousel = () => {
    const reviews = [
        {
            name: "Rafiul Karim",
            location: "Dhaka, Bangladesh",
            text: "FoodNest keeps listings fresh, reviews honest, and the experience smooth—my go-to for discovering local favourites across Dhaka.",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
        },
        {
            name: "Sumaiya Akter",
            location: "Chattogram, Bangladesh",
            text: "I trust the ratings and photos here. Finding great food and saving favourites makes re-ordering super easy.",
            avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=300&fit=crop",
        },
        {
            name: "Jahid Hasan",
            location: "Sylhet, Bangladesh",
            text: "Adding reviews is simple and the community feedback is real. Best way to spot hidden gems near me.",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=300&fit=crop",
        },
    ];

    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setIndex((prev) => (prev + 1) % reviews.length);
        }, 4500);
        return () => clearInterval(id);
    }, [reviews.length]);

    const active = reviews[index];

    return (
        <div className="mt-10 rounded-3xl bg-white/80 p-8 md:p-10 shadow-lg relative overflow-hidden">
            <div className="absolute inset-y-0 right-6 hidden h-full w-32 items-center justify-center opacity-15 lg:flex">
                <span className="text-6xl">🍕</span>
            </div>
            <div className="grid gap-8 lg:grid-cols-[220px_1fr] items-center">
                <div className="flex justify-center lg:justify-start">
                    <img
                        src={active.avatar}
                        alt={active.name}
                        className="h-32 w-32 rounded-full object-cover shadow-md"
                        loading="lazy"
                    />
                </div>
                <div className="space-y-4">
                    <p className="text-lg leading-relaxed text-gray-800">“{active.text}”</p>
                    <div className="space-y-1 text-gray-800">
                        <div className="font-bold text-lg">{active.name}</div>
                        <div className="text-sm text-gray-600">{active.location}</div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-start">
                <div className="flex items-center gap-2">
                    {reviews.map((_, idx) => (
                        <button
                            key={idx}
                            aria-label={`Go to testimonial ${idx + 1}`}
                            onClick={() => setIndex(idx)}
                            className={`h-2.5 w-6 rounded-full transition-all ${idx === index ? "bg-[rgb(226,98,73)]" : "bg-gray-300"}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const data = useLoaderData() || [];

    const hotFoods = [
        {
            title: "Biryani",
            category: "Rice",
            image: "https://unsplash.com/photos/a-white-bowl-filled-with-rice-and-meat-ysmeQt1dzcw",
            benefits: "Aromatic basmati rice with spiced meat. Bangladeshi classic favorite.",
        },
        {
            title: "Samosa",
            category: "Fried Snack",
            image: "https://images.unsplash.com/photo-1601050915597-edc2aa6eae97?w=600&h=400&fit=crop",
            benefits: "Crispy pastry with savory potato & meat filling. Street food favorite.",
        },
        {
            title: "Shami Kebab",
            category: "Meat Patty",
            image: "https://images.unsplash.com/photo-1585937421945-7ab554e49957?w=600&h=400&fit=crop",
            benefits: "Spiced minced meat patties. Cheap and delicious Bangladeshi snack.",
        },
        {
            title: "Jhalmuri",
            category: "Street Food",
            image: "https://images.unsplash.com/photo-1599599810694-b3fa7849f565?w=600&h=400&fit=crop",
            benefits: "Spicy puffed rice mix with peanuts. Popular street food delight.",
        },
    ];

    const [hotIndex, setHotIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(() => {
            setHotIndex((prev) => (prev + 2) % hotFoods.length);
        }, 5000);
        return () => clearInterval(id);
    }, [hotFoods.length]);

    const visibleHot = [
        hotFoods[hotIndex],
        hotFoods[(hotIndex + 1) % hotFoods.length],
    ];

    return (
        <main>
            <Banner />

            {/* 1) Intro */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-14">
                <section
                    id="intro"
                    className="rounded-2xl border border-base-200 bg-base-100/70 p-8 text-center shadow-sm backdrop-blur"
                >
                    <div className="mx-auto max-w-3xl space-y-4">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold text-[#AD4444] md:text-5xl">
                                Welcome to FoodNest
                            </h1>
                            <p className="text-base text-base-content/70 md:text-lg">
                                Your gateway to authentic local flavors and culinary experiences.
                            </p>
                        </div>
                        <div className="grid gap-3 md:grid-cols-3">
                            {["Curated local dishes", "Transparent community reviews", "Save your favourites"].map(
                                (badge) => (
                                    <span
                                        key={badge}
                                        className="rounded-full border border-base-200 bg-[rgb(226,98,73)]/10 px-4 py-2 text-xs font-semibold text-[rgb(226,98,73)]"
                                    >
                                        {badge}
                                    </span>
                                ),
                            )}
                        </div>
                    </div>
                </section>
            </Reveal>

            {/* 15) Top rated */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-6 pb-14">
                <section id="top-rated" aria-label="Top rated foods" className=" bg-base-100/70 p-8 ">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl font-extrabold leading-tight text-[#2D3748] md:text-4xl">Top Rated This Week</h2>
                        <p className="text-sm text-base-content/70 md:text-base">Community favorites with the highest ratings.</p>
                    </div>

                    <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3">
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

            {/* 2) Why Choose FoodNest */}
            <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[rgb(226,98,73)]/5 py-10 md:py-14">
                <Reveal className="mx-auto max-w-6xl px-4">
                    <div className="rounded-2xl border border-base-200 bg-base-100/60 p-10 shadow-sm backdrop-blur">
                        <div className="text-center max-w-3xl mx-auto mb-10">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D3748] mb-3">
                                Why Choose FoodNest?
                            </h2>
                            <p className="text-base text-base-content/70 leading-relaxed">
                                FoodNest connects you with authentic local cuisines and passionate home cooks. Browse diverse food listings, read trusted community reviews, save your favorites, and discover hidden culinary gems—all in one seamless platform designed for food lovers.
                            </p>
                        </div>

                        <div className="grid gap-10 lg:grid-cols-2 items-center">
                            {/* Left: Image */}
                            <div className="relative overflow-hidden rounded-2xl shadow-xl order-2 lg:order-1">
                                <img
                                    src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop"
                                    alt="Fresh vegetables and food preparation"
                                    className="w-full h-full object-cover aspect-4/3"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                            </div>

                            {/* Right: Feature Cards */}
                            <div className="space-y-5 order-1 lg:order-2">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div className="group rounded-2xl border border-base-200 bg-linear-to-br from-pink-50 to-rose-50 p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-pink-500 to-rose-500 shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Browse Food Items</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Explore hundreds of local dishes with detailed descriptions, ratings, and photos.
                                        </p>
                                    </div>

                                    <div className="group rounded-2xl border border-base-200 bg-linear-to-br from-emerald-50 to-teal-50 p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Add Reviews</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Share your experience and help others discover great food with honest reviews.
                                        </p>
                                    </div>

                                    <div className="group rounded-2xl border border-base-200 bg-linear-to-br from-green-50 to-lime-50 p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-green-500 to-lime-500 shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Save Favorites</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Create your personal collection of favorite dishes for quick access anytime.
                                        </p>
                                    </div>

                                    <div className="group rounded-2xl border border-base-200 bg-linear-to-br from-blue-50 to-indigo-50 p-6 text-center shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                        <div className="flex justify-center mb-4">
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-indigo-500 shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">Manage Profile</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            Track your reviews, favorites, and downloads all in your personal dashboard.
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 text-center">
                                    <NavLink
                                        to="/auth/login"
                                        className="inline-flex items-center justify-center border border-[rgb(226,98,73)] rounded-full text-[rgb(226,98,73)] px-10 py-4  text-lg font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 transform hover:-translate-y-0.5"
                                    >
                                        Get Started
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </section>


            
            {/* Getting Started Guide - 4 Steps */}
            <Reveal className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-gray-50 py-16 md:py-20 overflow-hidden">
                <div className="mx-auto max-w-6xl px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[rgb(226,98,73)] mb-2">
                            Quick Start
                        </p>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
                            How to Get Started with FoodNest
                        </h2>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Join our food community in four simple steps and start discovering amazing local dishes today.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-4">
                        {/* Step 1 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-blue-500 to-blue-300"></div>
                            <div className="absolute inset-0 bg-linear-to-br from-blue-50/0 to-blue-50/0 group-hover:from-blue-50 group-hover:to-blue-100/20 transition-all duration-300"></div>
                            <div className="relative z-10">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-blue-600 text-white font-bold text-lg mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    01
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Create Account</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Sign up with your email and password. It takes less than a minute to join our food community.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-purple-500 to-purple-300"></div>
                            <div className="absolute inset-0 bg-linear-to-br from-purple-50/0 to-purple-50/0 group-hover:from-purple-50 group-hover:to-purple-100/20 transition-all duration-300"></div>
                            <div className="relative z-10">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-purple-600 text-white font-bold text-lg mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    02
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Explore Foods</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Browse through hundreds of local dishes with detailed descriptions, ratings, and photos.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-green-500 to-green-300"></div>
                            <div className="absolute inset-0 bg-linear-to-br from-green-50/0 to-green-50/0 group-hover:from-green-50 group-hover:to-green-100/20 transition-all duration-300"></div>
                            <div className="relative z-10">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-green-600 text-white font-bold text-lg mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    03
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Share Reviews</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Post your honest reviews and ratings. Help the community discover their next favorite meal!
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-orange-500 to-orange-300"></div>
                            <div className="absolute inset-0 bg-linear-to-br from-orange-50/0 to-orange-50/0 group-hover:from-orange-50 group-hover:to-orange-100/20 transition-all duration-300"></div>
                            <div className="relative z-10">
                                <div className="inline-flex h-14 w-14 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-orange-600 text-white font-bold text-lg mb-5 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300">
                                    04
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Save Favorites</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Build your collection of favorite dishes for quick access anytime you want to order again.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <div className="mt-12 text-center">
                        <NavLink
                            to="/auth/login"
                            className="inline-flex items-center justify-center bg-linear-to-r from-[rgb(226,98,73)] to-[#EB4949] text-white font-bold rounded-full px-12 py-4 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            Start Your Journey
                        </NavLink>
                    </div>
                </div>
            </Reveal>

            {/* 3) Features */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-6">
                <section
                    aria-label="Features"
                    className="relative overflow-hidden  md:p-10"
                >
                   

                    <div className="relative ">
                        <SectionHeading
                            title="Core Features"
                            description="Everything you need to explore local food confidently—fast browsing, trusted reviews, and personal collections."
                            align="center"
                        />

                        <div className="mt-10 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
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
                                    className="group relative overflow-hidden rounded-2xl border border-base-200 bg-base-100 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                                >
                                    <div className="absolute inset-x-0 top-0 h-1 bg-[rgb(226,98,73)]/70" />
                                    <div className="absolute inset-0 bg-[rgb(226,98,73)]/0 transition-colors duration-300 group-hover:bg-[rgb(226,98,73)]/5" />

                                    <div className="relative">
                                        <div className="flex items-center justify-center">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[rgb(226,98,73)]/12 text-2xl ring-1 ring-[rgb(226,98,73)]/15 transition-transform duration-300 group-hover:scale-110">
                                                {f.icon}
                                            </div>
                                        </div>

                                        <h3 className="mt-5 text-center text-lg font-extrabold text-base-content">
                                            {f.title}
                                        </h3>
                                        <p className="mt-2 text-center text-sm leading-relaxed text-base-content/70">
                                            {f.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </Reveal>

           

            {/* 5) Categories */}
            <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[rgb(226,98,73)]/10 via-base-100 to-base-100 py-10 md:py-14">
                
                {/* 10) Blog */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-6">
                <section aria-label="Categories" className=" p-8 ">
                    <SectionHeading
                        title="Popular Categories"
                        description="Quickly jump into the cuisines people search for most."
                    />
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {[
                            {
                                name: "Burgers",
                                img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&h=360&fit=crop&auto=format",
                            },
                            {
                                name: "BBQ",
                                img: "https://t4.ftcdn.net/jpg/03/36/59/67/360_F_336596714_KYxkCzJK686f0lon80WIeHOecR3OIy5S.jpg",
                            },
                            {
                                name: "Seafood",
                                img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&h=360&fit=crop&auto=format",
                            },
                            {
                                name: "Vegan",
                                img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=560&fit=crop&auto=format",
                            },
                            {
                                name: "Desserts",
                                img: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg",
                            },
                            {
                                name: "Street Food",
                                img: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=500&h=360&fit=crop&auto=format",
                            },
                            {
                                name: "Biryani",
                                img: "https://images.unsplash.com/photo-1546069901-eacef0df6022?w=500&h=360&fit=crop&auto=format",
                            },
                            {
                                name: "Snacks",
                                img: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=500&h=360&fit=crop&auto=format",
                            },
                        ].map((c) => (
                            <div
                                key={c.name}
                                className="group relative overflow-hidden rounded-2xl border border-white/70 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <img
                                    src={c.img}
                                    alt={c.name}
                                    className="h-40 w-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black/35 via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-gray-900 shadow">
                                        <span className="h-2.5 w-2.5 rounded-full bg-[#AD4444]"></span>
                                        {c.name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>
                
                
                
               
            </section>


         


            {/* 8) Testimonials - Full width carousel */}
            <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#F7F0E8] py-14 md:py-16 overflow-hidden">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="space-y-3 max-w-3xl">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-[#2D3748] leading-tight">
                                Discover Our Satisfied Customers
                            </h2>
                            <p className="text-base text-gray-700">
                                Hear from food lovers who explore, review, and save their favourites on FoodNest. Real stories, real trust.
                            </p>
                        </div>

                        <NavLink
                            to="/all-reviews"
                            className="btn btn-outline border-[rgb(226,98,73)] text-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)] hover:text-white"
                        >
                            All Reviews
                        </NavLink>
                    </div>

                    <Carousel />
                </div>
            </section>

            

            {/* 12) FAQ */}
            <Reveal className="mx-auto max-w-6xl px-4 pt-6">
                <section aria-label="FAQ" className="py-12">
                    <div className="text-center mb-12 space-y-4">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
                            Have any <span className="text-[#EB4949]">questions?</span>
                        </h2>
                        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                            Everything you need to know about using FoodNest. Can't find the answer you're looking for? Chat with our team.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-4">
                        {[{
                            q: "How do I create an account on FoodNest?",
                            a: "Click the 'Sign Up' button in the navigation bar, fill in your details including name, email, and password, and you'll be ready to explore all features.",
                        }, {
                            q: "Do I need an account to browse foods?",
                            a: "No. You can explore the public listings anytime. Login is required for protected actions like adding reviews and managing your profile.",
                        }, {
                            q: "Is there a fee for using FoodNest?",
                            a: "FoodNest is completely free to use. Browse foods, read reviews, save favourites, and manage your profile at no cost.",
                        }, {
                            q: "Can I manage my reviews from my phone?",
                            a: "Yes! FoodNest is fully responsive and works seamlessly on mobile devices, tablets, and desktops.",
                        }, {
                            q: "How do favourites work?",
                            a: "After login, you can save foods to your favourites list so you can find them quickly later. Just click the heart icon on any food item.",
                        }].map((faq, idx) => (
                            <div
                                key={idx}
                                className="group bg-gray-50 hover:bg-white border border-gray-200 rounded-2xl transition-all duration-300 hover:shadow-lg"
                            >
                                <details className="overflow-hidden">
                                    <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-bold text-lg text-gray-900 list-none">
                                        <span className="flex-1">{faq.q}</span>
                                        <span className="ml-4 shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 group-hover:bg-[#EB4949] group-hover:text-white transition-colors">
                                            <svg className="w-5 h-5 transform transition-transform duration-300 group-open:rotate-45" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                        </span>
                                    </summary>
                                    <div className="px-6 pb-5 pt-2">
                                        <p className="text-gray-600 leading-relaxed">{faq.a}</p>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>
                </section>
            </Reveal>

            {/* 6) Statistics - Full Width */}
            <section className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-linear-to-br from-[#FFB8A6] via-[#FFCAB8] to-[#FFD4C4] py-20 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

                <div className="mx-auto max-w-7xl px-4 relative z-10">
                    <div className="text-center mb-16 space-y-5">

                        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                            Join Our Growing <span className="text-[#EB4949]">Food Community</span>
                        </h2>
                        <p className="text-gray-800 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
                            Discover authentic local flavors, share your experiences, and connect with passionate food lovers.
                            <span className="text-gray-900 font-bold"> Together, we explore delicious stories!</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            { label: "Happy Customers", value: "12,500+", icon: "😊", color: "from-orange-400 to-red-400" },
                            { label: "Food Items Listed", value: "3,850", icon: "🍽️", color: "from-blue-400 to-indigo-400" },
                            { label: "Reviews Posted", value: "25,000+", icon: "⭐", color: "from-green-400 to-emerald-400" },
                        ].map((stat) => (
                            <div
                                key={stat.label}
                                className="group relative bg-white/70 backdrop-blur-md rounded-3xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 overflow-hidden"
                            >
                                {/* Background Gradient on Hover */}
                                <div className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>

                                    {/* Number */}
                                    <div className="text-6xl md:text-7xl font-black text-gray-900 mb-4 tracking-tight">
                                        {stat.value}
                                    </div>

                                    {/* Label */}
                                    <div className="text-lg md:text-xl font-bold text-gray-700">
                                        {stat.label}
                                    </div>
                                </div>

                                {/* Decorative Corner */}
                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/20 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        ))}
                    </div>

                    {/* Bottom Text */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-700 text-base md:text-lg font-medium">
                            Join thousands of food lovers exploring authentic local flavors! 🍴
                        </p>
                    </div>
                </div>
            </section>


            {/* 13) Download App Section - Full Width */}
            <section className="w-screen relative left-[50%] right-[50%] -mx-[50vw] bg-linear-to-br from-yellow-100 via-yellow-200 to-amber-200 py-16 overflow-hidden">
                {/* Food Pattern Background */}
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="food-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                                <text x="10" y="30" fontSize="30" fill="currentColor" opacity="0.3">🍕</text>
                                <text x="60" y="60" fontSize="25" fill="currentColor" opacity="0.3">🍔</text>
                                <text x="20" y="80" fontSize="20" fill="currentColor" opacity="0.3">🥗</text>
                                <text x="75" y="25" fontSize="22" fill="currentColor" opacity="0.3">🍜</text>
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#food-pattern)" />
                    </svg>
                </div>

                <div className="mx-auto max-w-7xl px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Content */}
                        <div className="text-left space-y-6">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                Download The FoodNest App Now!
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-800">
                                Get <span className="font-bold text-gray-900">5% off</span> on your first order through the FoodNest app and make your food discovery experience even smoother!
                            </p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="https://www.apple.com/app-store/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs">Download on the</div>
                                        <div className="text-lg font-semibold">App Store</div>
                                    </div>
                                </a>

                                <a
                                    href="https://play.google.com/store"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                                >
                                    <svg className="w-8 h-8 mr-3" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs">GET IT ON</div>
                                        <div className="text-lg font-semibold">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Right: Phone Mockups */}
                        <div className="relative lg:block hidden">
                            <div className="relative w-full h-[500px]">
                                {/* Phone 1 */}
                                <div className="absolute right-32 top-0 w-64 h-[500px] transform rotate-3 transition-transform hover:rotate-0">
                                    <div className="w-full h-full bg-gray-900 rounded-[3rem] shadow-2xl p-3">
                                        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=800&fit=crop"
                                                alt="Food app screen"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Phone 2 */}
                                <div className="absolute right-0 top-12 w-64 h-[500px] transform -rotate-3 transition-transform hover:rotate-0">
                                    <div className="w-full h-full bg-gray-900 rounded-[3rem] shadow-2xl p-3">
                                        <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                                            <img
                                                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=800&fit=crop"
                                                alt="Food app screen"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




        </main>
    );
};

export default Home;