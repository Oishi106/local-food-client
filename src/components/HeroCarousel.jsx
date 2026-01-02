import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const HeroCarousel = () => {
  const slides = useMemo(
    () => [
      {
        src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=2400&q=80",
        alt: "Fresh local ingredients and dishes",
        title: "Discover Local Food, Made With Love",
        subtitle:
          "Browse community-made dishes, read real reviews, and save your favourites—fast and easy.",
        cta: { label: "Explore Foods", to: "/all-items" },
      },
      {
        src: "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=2400&q=80",
        alt: "Top rated meals",
        title: "Top Rated This Week",
        subtitle:
          "See what’s trending near you and find the highest-rated meals from local food lovers.",
        cta: { label: "View Top Rated", to: "#top-rated" },
      },
      {
        src: "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=2400&q=80",
        alt: "Home cooks and local vendors",
        title: "From Home Cooks to Vendors",
        subtitle:
          "A modern platform to explore, review, and connect with the best local food in your area.",
        cta: { label: "Get Started", to: "/auth/login" },
      },
      {
        src: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=2400&q=80",
        alt: "Modern plated food presentation",
        title: "Modern, Clean & Fast Experience",
        subtitle:
          "A simple way to discover local favourites with a modern interface and smooth navigation.",
        cta: { label: "Learn More", to: "#intro" },
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(id);
  }, [slides.length]);

  const goPrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const goNext = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <section
      aria-roledescription="carousel"
      className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen overflow-hidden rounded-none"
      style={{ height: "82.5vh", minHeight: "77vh", maxHeight: "90vh" }}
    >
      <div className="absolute inset-0">
        {slides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1200 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
            referrerPolicy="no-referrer"
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-linear-to-r from-black/55 via-black/35 to-black/20" />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl items-center px-4">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-white/80">
            FoodNest • Local Food Network
          </p>
          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold text-white motion-safe:animate-[fade-in_700ms_ease-out]">
            {slides[index].title}
          </h1>
          <p className="mt-4 text-sm md:text-lg text-white/85">
            {slides[index].subtitle}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {slides[index].cta.to.startsWith("#") ? (
              <a
                href={slides[index].cta.to}
                className="btn border-none text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90"
              >
                {slides[index].cta.label}
              </a>
            ) : (
              <Link
                to={slides[index].cta.to}
                className="btn border-none text-white bg-[rgb(226,98,73)] hover:bg-[rgb(226,98,73)]/90"
              >
                {slides[index].cta.label}
              </Link>
            )}
            <a
              href="#intro"
              className="btn btn-outline border-white/40 text-white hover:bg-white/10"
            >
              Learn More
            </a>
          </div>

          <div className="mt-6 flex items-center gap-2" aria-label="Carousel controls">
            <button
              type="button"
              onClick={goPrev}
              className="btn btn-circle btn-sm bg-white/15 border-white/20 text-white hover:bg-white/25"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="btn btn-circle btn-sm bg-white/15 border-white/20 text-white hover:bg-white/25"
              aria-label="Next slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="ml-2 flex gap-2" aria-label="Slide indicators">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full transition-all ${
                    i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <a
        href="#intro"
        aria-label="Scroll down"
        className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full p-2 bg-white/15 border border-white/20 text-white hover:bg-white/25 motion-safe:animate-bounce"
      >
        <ChevronDown className="h-5 w-5" />
      </a>
    </section>
  );
};

export default HeroCarousel;
