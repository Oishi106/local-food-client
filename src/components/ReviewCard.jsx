
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

  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <div className="card bg-base-100 shadow-md border">

      <div className="card-body p-4">
        <h2 className="card-title text-base">{food_name}</h2>
        <p className="text-sm mt-2 line-clamp-3">{review_text}</p>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>⭐ {star_rating}</span>
          <span>{formattedDate}</span>
        </div>

        <div className="mt-1 text-xs text-gray-500">
          Reviewed by: <span className="font-medium">{user}</span>
        </div>
      </div>
    </div>
  );
};
