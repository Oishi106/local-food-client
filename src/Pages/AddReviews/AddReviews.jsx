import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { DashboardDataContext } from "../../context/DashboardDataContext";

const AddReviews = () => {

  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  const { refresh } = useContext(DashboardDataContext);


  const handleSubmit = (e) => {
    e.preventDefault()

    const formData = {
      food_name: e.target.name.value,
      food_image: e.target.image.value,
      restaurant_name:e.target.restaurant.value,
      location: e.target.location.value,
      star_rating:e.target.rating.value,
      review_text: e.target.review.value,
      date: new Date(),
      user: user.email
    }

    apiFetch('/details', {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then(() => {
        toast.success("Successfully added!");
        refresh();
        navigate("/dashboard/reviews");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to add review");
      });
   

  }


  return (
    <div className="card border border-gray-200 bg-base-100 w-full max-w-md mx-auto shadow-2xl rounded-2xl">
      <div className="card-body p-6 relative">
        <h2 className="text-2xl font-bold text-cyan-900 text-center mb-6">Add New Review</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
     
          <div>
            <label className="label font-medium">Food Name</label>
            <input
              type="text"
              name="name"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Food name"
            />
          </div>

          
          <div>
            <label className="label font-medium">Food Image</label>
            <input
              type="url"
              name="image"
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="https://example.com/image.jpg"
            />
          </div>

                <div>
            <label className="label font-medium">Restaurant  Name</label>
            <input
              type="text"
              name="restaurant"
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
              required
              className="input w-full rounded-full focus:border-0 focus:outline-gray-200"
              placeholder="Enter Rating(1-5)"
            />
          </div>

       
          <div>
            <label className="label  font-medium">Add Review</label>
            <textarea
              name="review"
              required
              rows="3"
             className="textarea w-full rounded-2xl focus:border-0 focus:outline-gray-200 h-[250px]"
              placeholder="Tell how do you feel about the food"
            ></textarea>
          </div>
                <button
            type="submit"
            className="btn w-full text-white mt-6 rounded-full bg-linear-to-r from-cyan-900 to-indigo-200 hover:from-cyan-900 hover:to-indigo-400"
          >
            Add Reviews
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddReviews;