import { useLoaderData } from "react-router";
import { ReviewCard } from "../components/ReviewCard";


const AllReviews = () => {
  const loadedReviews = useLoaderData();
  const mdata=loadedReviews

  return (
    <div>
      <div className="text-2xl text-center text-cyan-900 font-bold">All Reviews</div>
      <p className="text-center text-cyan-800 pb-7">See what people are saying about the food.</p>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {loadedReviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default AllReviews;
