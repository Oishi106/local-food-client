import toast from "react-hot-toast";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import { use } from "react";

const UpdateReview = () => {
  const data = useLoaderData();
const {user}=use(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = {
     food_name: e.target.name.value,
      food_image: e.target.image.value,
      restaurant_name:e.target.restaurant.value,
      location: e.target.location.value,
      star_rating:e.target.rating.value,
      review_text: e.target.review.value,
      date: new Date(),
      user: user.email
    };

    fetch(`http://localhost:3000/items/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        toast.success("Successfully updated!");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="card bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-center text-cyan-900 mb-6">Update Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
         <div>
            <label className="label font-medium">Food Name</label>
            <input
              type="text"
              name="name"
              defaultValue={data.food_name}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Food name"
            />
          </div>

          

                <div>
            <label className="label font-medium">Restaurant  Name</label>
            <input
              type="text"
              name="restaurant"
              defaultValue={data.restaurant_name}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder=" Restaurant Name"
            />
          </div>
                <div>
            <label className="label font-medium">Location</label>
            <input
              type="text"
              name="location"
              defaultValue={data.location}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Location"
            />
          </div>
                <div>
            <label className="label font-medium">Rating</label>
            <input
              type="text"
              name="rating"
              defaultValue={data.star_rating}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Rating(1-5)"
            />
          </div>

       
          <div>
            <label className="label font-medium">Add Review</label>
            <textarea
              name="review"
              defaultValue={data.review_text}
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Tell how do you feel about the food"
            ></textarea>
          </div>

    
          <div>
            <label className="label font-medium">Food Image</label>
            <input
              type="url"
              name="image"
              defaultValue={data.food_image}
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Submit Button */}
          <button
       
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-cyan-900 to-indigo-200 hover:from-cyan-900 hover:to-indigo-400"
          >
            Update Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateReview;
