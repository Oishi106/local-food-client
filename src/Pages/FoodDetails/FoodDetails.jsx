import { useLoaderData } from "react-router-dom";
const FoodDetails = () => {
  const data=useLoaderData();

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={data.food_image}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {data.food_name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-cyan-900 border-indigo-300 font-medium">
                {data.location}
              </div>

              <div className="badge badge-lg badge-outline text-cyan-900 border-indigo-300 font-medium">
                Ratings: {data.star_rating}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {data.review_text}
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;