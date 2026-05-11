import { useContext, useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import {
  IoLocationOutline, IoRestaurantOutline, IoStarSharp,
  IoHeartOutline, IoHeart, IoArrowBackOutline,
  IoShareSocialOutline, IoCheckmarkCircleOutline, IoTimeOutline
} from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";

const BRAND = "rgb(226,98,73)";

const FoodDetails = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [copied, setCopied] = useState(false);

  const stars = parseFloat(data?.star_rating) || 0;
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">

      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 mb-6 text-sm font-semibold opacity-60 hover:opacity-100 transition-opacity"
      >
        <IoArrowBackOutline size={18} /> Back
      </button>

      <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-base-100 shadow-xl">
        {/* Ambient blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none opacity-40"
          style={{ background: `radial-gradient(circle, rgba(226,98,73,0.10), transparent 70%)` }} />
        <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none opacity-30"
          style={{ background: `radial-gradient(circle, rgba(212,175,55,0.10), transparent 70%)` }} />

        <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-0">

          {/* ── Left: Image ───────────────── */}
          <div className="lg:col-span-2 relative min-h-72 lg:min-h-full overflow-hidden">
            {!imgErr ? (
              <img
                src={data?.food_image}
                alt={data?.food_name}
                onError={() => setImgErr(true)}
                className="w-full h-full object-cover lg:absolute lg:inset-0 hover:scale-105 transition-transform duration-700"
                style={{ minHeight: "320px" }}
              />
            ) : (
              <div className="w-full h-80 lg:h-full flex items-center justify-center text-7xl bg-base-200">🍽️</div>
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10" />

            {/* Rating badge on image */}
            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white text-sm font-bold">
              <IoStarSharp size={14} className="text-amber-400" />
              {stars > 0 ? stars.toFixed(1) : "New"}
            </div>

            {/* Category on image */}
            {data?.category && (
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur border border-white/20 text-white text-xs font-bold uppercase tracking-wide">
                {data.category}
              </div>
            )}
          </div>

          {/* ── Right: Content ────────────── */}
          <div className="lg:col-span-3 p-7 md:p-10 flex flex-col gap-5">

            {/* Header row */}
            <div className="flex items-start gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="font-display text-2xl md:text-3xl font-extrabold leading-tight text-heading">
                  {data?.food_name || "Food Item"}
                </h1>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleShare}
                  title="Copy link"
                  className="w-9 h-9 rounded-xl border border-base-200 flex items-center justify-center hover:bg-base-200/60 transition-colors"
                >
                  {copied ? <IoCheckmarkCircleOutline size={18} style={{ color: BRAND }} /> : <IoShareSocialOutline size={17} className="opacity-60" />}
                </button>
                <button
                  type="button"
                  onClick={() => setLiked(v => !v)}
                  className="w-9 h-9 rounded-xl border border-base-200 flex items-center justify-center hover:bg-base-200/60 transition-colors"
                >
                  {liked
                    ? <IoHeart size={18} className="text-red-500" />
                    : <IoHeartOutline size={18} className="opacity-60" />}
                </button>
              </div>
            </div>

            {/* Meta pills */}
            <div className="flex flex-wrap gap-2">
              {data?.restaurant_name && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl"
                  style={{ background: "rgba(226,98,73,0.10)", color: BRAND }}>
                  <IoRestaurantOutline size={13} />
                  {data.restaurant_name}
                </span>
              )}
              {data?.location && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border border-base-200 text-muted">
                  <IoLocationOutline size={13} />
                  {data.location}
                </span>
              )}
              {data?.date && (
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-xl border border-base-200 text-muted">
                  <IoTimeOutline size={13} />
                  {new Date(data.date).toLocaleDateString("en-BD", { year: "numeric", month: "short", day: "numeric" })}
                </span>
              )}
            </div>

            {/* Star row */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IoStarSharp key={i} size={18}
                    className={i < fullStars ? "text-amber-400" : i === fullStars && hasHalf ? "text-amber-300" : "text-base-200"} />
                ))}
              </div>
              <span className="text-sm font-bold text-heading">{stars > 0 ? stars.toFixed(1) : "—"}</span>
              <span className="text-sm text-muted">/ 5.0</span>
            </div>

            {/* Divider */}
            <div className="h-px bg-base-200" />

            {/* Review text */}
            {data?.review_text && (
              <div>
                <div className="text-xs font-bold uppercase tracking-widest opacity-40 mb-2">Review</div>
                <p className="text-base text-muted leading-relaxed italic">
                  "{data.review_text}"
                </p>
              </div>
            )}

            {/* Reviewer */}
            {data?.user && (
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-base-200/40 border border-base-200">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                  style={{ background: BRAND }}>
                  {data.user[0].toUpperCase()}
                </div>
                <div>
                  <div className="text-xs opacity-50 font-medium">Reviewed by</div>
                  <div className="text-sm font-bold text-heading">{data.user}</div>
                </div>
              </div>
            )}

            {/* Feature badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🥬", label: "Fresh ingredients" },
                { icon: "⭐", label: "Community rated" },
                { icon: "📍", label: "Local pick" },
              ].map(f => (
                <div key={f.label} className="flex flex-col items-center gap-1.5 p-3 rounded-2xl border border-base-200 bg-base-100/60 text-center">
                  <span className="text-xl">{f.icon}</span>
                  <span className="text-[11px] font-semibold text-muted leading-tight">{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              {user ? (
                <Link
                  to="/dashboard/reviews/add"
                  className="flex-1 text-center py-3 px-6 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: BRAND }}
                >
                  ✍️ Write a Review
                </Link>
              ) : (
                <Link
                  to="/auth/login"
                  className="flex-1 text-center py-3 px-6 rounded-2xl text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  style={{ background: BRAND }}
                >
                  Login to Review
                </Link>
              )}
              <Link
                to="/all-items"
                className="py-3 px-6 rounded-2xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors"
              >
                Browse More
              </Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
