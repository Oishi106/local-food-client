import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { IoHeartOutline, IoHeart, IoLocationOutline, IoStarSharp, IoRestaurantOutline } from "react-icons/io5";

const BRAND = "rgb(226,98,73)";
const LS_KEY = "fn_favourites";

const getFavs = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "[]"); }
  catch { return []; }
};

export default function MyFavourites() {
  const { user } = useContext(AuthContext);
  const [favs, setFavs] = useState([]);

  useEffect(() => { setFavs(getFavs()); }, []);

  const remove = (id) => {
    const next = favs.filter(f => f._id !== id);
    setFavs(next);
    localStorage.setItem(LS_KEY, JSON.stringify(next));
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(226,98,73,0.1)", color: BRAND }}>
            <IoHeart size={20} />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">My Favourites</h1>
            <p className="text-xs opacity-50">{favs.length} saved items</p>
          </div>
        </div>
        <Link to="/all-items"
          className="px-4 py-2 rounded-xl text-sm font-semibold border border-base-200 hover:bg-base-200/60 transition-colors">
          Browse Foods →
        </Link>
      </div>

      {favs.length === 0 ? (
        <div className="bg-base-100 rounded-2xl border border-base-200 p-14 text-center animate-fade-in-up stagger-1">
          <div className="text-5xl mb-4">❤️</div>
          <div className="font-bold text-base mb-1">No favourites yet</div>
          <p className="text-sm text-muted mb-5">
            Like a food item while browsing to save it here.
          </p>
          <Link to="/all-items"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-white"
            style={{ background: BRAND }}>
            Explore Foods
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 animate-fade-in-up stagger-1">
          {favs.map(item => {
            const stars = parseFloat(item.star_rating) || 0;
            return (
              <div key={item._id}
                className="group bg-base-100 rounded-2xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden relative">
                <div className="absolute inset-x-0 top-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: BRAND }} />

                {/* Image */}
                <div className="h-44 overflow-hidden bg-base-200 relative">
                  {item.food_image ? (
                    <img src={item.food_image} alt={item.food_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-5xl opacity-30">🍽️</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                  {/* Rating on image */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur text-white text-xs font-bold">
                    <IoStarSharp size={11} className="text-amber-400" />
                    {stars > 0 ? stars.toFixed(1) : "New"}
                  </div>

                  {/* Remove heart */}
                  <button
                    type="button"
                    onClick={() => remove(item._id)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur flex items-center justify-center hover:bg-red-500 transition-colors"
                    title="Remove from favourites"
                  >
                    <IoHeart size={15} className="text-red-400 hover:text-white" />
                  </button>
                </div>

                <div className="p-4 flex flex-col gap-2.5">
                  <h3 className="font-bold text-base text-heading line-clamp-1">{item.food_name || "—"}</h3>

                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <IoStarSharp key={i} size={12}
                        className={i < Math.floor(stars) ? "text-amber-400" : "text-base-200"} />
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {item.restaurant_name && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg"
                        style={{ background: "rgba(226,98,73,0.1)", color: BRAND }}>
                        <IoRestaurantOutline size={11} /> {item.restaurant_name}
                      </span>
                    )}
                    {item.location && (
                      <span className="inline-flex items-center gap-1 text-[11px] text-muted font-medium">
                        <IoLocationOutline size={11} /> {item.location}
                      </span>
                    )}
                  </div>

                  {item.review_text && (
                    <p className="text-xs text-muted leading-relaxed line-clamp-2 italic">"{item.review_text}"</p>
                  )}

                  <div className="h-px bg-base-200" />

                  <Link to={`/item-details/${item._id}`}
                    className="w-full text-center py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:-translate-y-0.5"
                    style={{ background: BRAND }}>
                    View Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
