import { IoStarSharp, IoLocationOutline, IoPersonOutline, IoCalendarOutline } from "react-icons/io5";

export const ReviewCard = ({ review }) => {
  const {
    food_name,
    food_image,
    restaurant_name,
    location,
    star_rating,
    review_text,
    date,
    user,
  } = review;

  const stars = parseFloat(star_rating) || 0;
  const fullStars = Math.floor(stars);
  const hasHalf = stars - fullStars >= 0.5;
  const formattedDate = date ? new Date(date).toLocaleDateString("en-BD", { day: "numeric", month: "short", year: "numeric" }) : null;
  const initials = (user || "?")[0].toUpperCase();

  return (
    <article className="group relative flex flex-col rounded-2xl overflow-hidden border border-base-200 bg-base-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      
      {/* ── Top accent ───────────── */}
      <div className="absolute inset-x-0 top-0 h-0.5 opacity-60 scale-x-0 group-hover:scale-x-100 transition-transform duration-350 origin-left"
        style={{ background: "rgb(226,98,73)" }} />

      {/* ── Food image strip ─────── */}
      {food_image && (
        <div className="h-36 overflow-hidden shrink-0 bg-base-200 relative">
          <img
            src={food_image}
            alt={food_name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {food_name && (
            <div className="absolute bottom-2.5 left-3 right-3">
              <span className="text-white text-sm font-bold drop-shadow line-clamp-1">{food_name}</span>
            </div>
          )}
        </div>
      )}

      {/* ── Body ─────────────────── */}
      <div className="flex flex-col flex-1 p-4 gap-3">

        {/* Food name (if no image) */}
        {!food_image && food_name && (
          <h3 className="font-bold text-base text-heading line-clamp-1">{food_name}</h3>
        )}

        {/* Stars */}
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <IoStarSharp
              key={i}
              size={14}
              className={
                i < fullStars
                  ? "text-amber-400"
                  : i === fullStars && hasHalf
                    ? "text-amber-300"
                    : "text-base-200"
              }
            />
          ))}
          <span className="ml-1.5 text-xs text-muted font-semibold">{stars > 0 ? stars.toFixed(1) : "—"} / 5</span>
        </div>

        {/* Review text */}
        {review_text && (
          <p className="text-xs text-muted leading-relaxed line-clamp-3 flex-1 italic">
            "{review_text}"
          </p>
        )}

        {/* Meta: restaurant + location */}
        <div className="flex flex-wrap gap-2">
          {restaurant_name && (
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
              style={{ background: "rgba(226,98,73,0.1)", color: "rgb(226,98,73)" }}>
              🍴 {restaurant_name}
            </span>
          )}
          {location && (
            <span className="inline-flex items-center gap-1 text-[11px] text-muted font-medium">
              <IoLocationOutline size={11} />
              {location}
            </span>
          )}
        </div>

        {/* Divider */}
        <div className="h-px bg-base-200" />

        {/* Footer: avatar + user + date */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
              style={{ background: "rgb(226,98,73)" }}>
              {initials}
            </div>
            <span className="text-xs font-semibold text-heading truncate">{user || "Anonymous"}</span>
          </div>
          {formattedDate && (
            <span className="flex items-center gap-1 text-[10px] text-muted shrink-0">
              <IoCalendarOutline size={11} />
              {formattedDate}
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
