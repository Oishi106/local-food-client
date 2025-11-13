import { Link } from "react-router";

export const FoodCard = ({ item }) => {
  const { food_name, food_image, restaurant_name, star_rating, review_text, _id, location } = item
  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <figure className="h-48 overflow-hidden">
        <img
          src={food_image}
          alt={food_name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title ">{food_name}</h2>

        <div className="flex justify-between items-center">
          <div className="badge text-xs badge-xs font-semibold bg-cyan-500 py-2.5 rounded-full">{restaurant_name}</div>
          <div className="font-semibold">Rating :⭐ {star_rating}</div>
        </div>
        <div className="text-xs text-cyan-600 ">{location}</div>
        <p className="line-clamp-1">
          {review_text}
        </p>
        {/* <p className="text-sm text-base-content/70">by {author}</p> */}
        <div className="card-actions justify-between items-center mt-4">
          <div className="flex gap-4 text-sm text-base-content/60">
            {/* <span className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {views}
            </span> */}
            {/* <span className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              {likes}
            </span> */}
          </div>

          <Link to={`/item-details/${_id}`} className="btn rounded-full bg-linear-to-r from-cyan-900 to-indigo-200 hover:from-cyan-900 hover:to-indigo-400 text-white w-full btn-sm">View Details</Link>
        </div>
      </div>
    </div>
  );
};