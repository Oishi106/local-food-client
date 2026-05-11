import { useState } from "react";
import { Link } from "react-router-dom";
import { IoLocationOutline, IoStarSharp, IoHeartOutline, IoHeart } from "react-icons/io5";

const LS_KEY = "fn_favourites";

const getFavs = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};

const isFaved = (id) => getFavs().some(f => f._id === id);

const toggleFav = (item) => {
  const favs = getFavs();
  const exists = favs.some(f => f._id === item._id);
  const next = exists
    ? favs.filter(f => f._id !== item._id)
    : [...favs, { ...item, savedAt: new Date().toISOString() }];
  localStorage.setItem(LS_KEY, JSON.stringify(next));
  window.dispatchEvent(new Event("fn:favourites-changed"));
  return !exists;
};

export const FoodCard = ({ item }) => {
  const {
    food_name, food_image, restaurant_name,
    star_rating, review_text, _id, location, price, category,
  } = item;

  const [liked, setLiked] = useState(() => isFaved(_id));
  const [imgErr, setImgErr] = useState(false);

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleFav(item);
    setLiked(result);
  };

  const stars = parseFloat(star_rating) || 0;
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-base-200 bg-base-100 shadow-sm hover:shadow-2xl transition-all duration-350 hover:-translate-y-1.5">

      {/* ── Image ── */}
      <div className="relative h-48 overflow-hidden shrink-0 bg-base-200">
        {!imgErr ? (
          <img src={food_image} alt={food_name}
            onError={() => setImgErr(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">🍽️</div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {category && (
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/50 backdrop-blur text-white border border-white/20">
              {category}
            </span>
          </div>
        )}

        {/* ── Heart button ── */}
        <button
          type="button"
          aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          onClick={handleLike}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur border transition-all duration-200 hover:scale-110"
          style={{
            background: liked ? "rgba(239,68,68,0.85)" : "rgba(0,0,0,0.40)",
            borderColor: liked ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.2)",
          }}
        >
          {liked
            ? <IoHeart size={15} className="text-white" />
            : <IoHeartOutline size={15} className="text-white" />}
        </button>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur border border-white/15 text-white text-xs font-bold">
          <IoStarSharp size={11} className="text-amber-400" />
          {stars > 0 ? stars.toFixed(1) : "New"}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col flex-1 p-4 gap-2.5">
        <h2 className="font-bold text-base leading-snug line-clamp-1 text-heading group-hover:text-accent transition-colors duration-200">
          {food_name || "Food Item"}
        </h2>

        <div className="flex items-center justify-between gap-2 flex-wrap">
          {restaurant_name && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
              🍴 {restaurant_name}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1 text-[11px] text-muted font-medium">
              <IoLocationOutline size={12} /> {location}
            </span>
          )}
        </div>

        {stars > 0 && (
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoStarSharp key={i} size={13}
                className={i < fullStars ? "text-amber-400" : i === fullStars && hasHalf ? "text-amber-300" : "text-base-200"} />
            ))}
            <span className="ml-1.5 text-[11px] text-muted font-medium">{stars.toFixed(1)}</span>
          </div>
        )}

        {review_text && (
          <p className="text-xs text-muted leading-relaxed line-clamp-2 flex-1">{review_text}</p>
        )}

        <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-base-200">
          {price
            ? <span className="font-extrabold text-base text-heading">৳{price}</span>
            : <span className="text-xs text-muted italic">Price on request</span>}
          <Link to={`/item-details/${_id}`}
            className="flex-1 text-center text-xs font-bold py-2 px-4 rounded-xl text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "rgb(226,98,73)" }}>
            View Details
          </Link>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left"
        style={{ background: "rgb(226,98,73)" }} />
    </article>
  );
};