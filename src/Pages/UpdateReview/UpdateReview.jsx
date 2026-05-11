import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { DashboardDataContext } from "../../context/DashboardDataContext";

const accent = "rgb(226,98,73)";

const UpdateReview = () => {
  const data = useLoaderData();
  const { user } = useContext(AuthContext);
  const { refresh } = useContext(DashboardDataContext);
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(data.food_image || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!data?._id) throw new Error("Missing review id");

      const formData = {
        food_name: e.target.name.value,
        food_image: imageUrl || e.target.image.value,
        restaurant_name: e.target.restaurant.value,
        location: e.target.location.value,
        star_rating: e.target.rating.value,
        review_text: e.target.review.value,
        date: new Date(),
        user: user.email,
      };

      try {
        await apiFetch(`/details/${data._id}`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
      } catch (putError) {
        const message = String(putError?.message || putError || "");
        if (!message.includes("Cannot PUT") && !message.includes("404") && !message.includes("405")) {
          throw putError;
        }

        // Backend does not expose an update route, so fall back to
        // creating a fresh record and removing the old one.
        await apiFetch("/details", {
          method: "POST",
          body: JSON.stringify(formData),
        });

        await apiFetch(`/details/${data._id}`, {
          method: "DELETE",
        });
      }

      toast.success("Successfully updated!");
      refresh?.();
      navigate("/dashboard/reviews");
    } catch (err) {
      console.log(err);
      toast.error(err.message || "Failed to update");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-base-100/80 backdrop-blur-sm shadow-2xl">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(226,98,73,0.12), transparent 24%), radial-gradient(circle at 100% 0%, rgba(99,102,241,0.08), transparent 20%), radial-gradient(circle at 50% 100%, rgba(212,175,55,0.08), transparent 22%)",
        }}
      />

      <div className="relative grid lg:grid-cols-[0.92fr_1.08fr] min-h-[680px]">
        <div className="relative overflow-hidden border-b lg:border-b-0 lg:border-r border-base-200 p-6 md:p-10 lg:p-12 flex flex-col justify-between min-h-80">
          <img
            src={imageUrl || data.food_image}
            alt={data.food_name}
            className="absolute inset-0 h-full w-full object-cover opacity-45 scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,18,24,0.55) 0%, rgba(15,18,24,0.70) 45%, rgba(15,18,24,0.90) 100%), radial-gradient(circle at top left, rgba(226,98,73,0.18), transparent 32%)",
            }}
          />

          <div className="relative z-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-white/80 backdrop-blur-sm">
              ✎ Update Your Taste Note
            </span>

            <h2 className="mt-4 max-w-xl text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-sm">
              Give your review a better version.
            </h2>

            <p className="mt-4 max-w-xl text-white/75 leading-relaxed">
              Fine-tune the food name, rating, and feedback so the community gets the clearest version of your experience.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Current Dish</div>
              <div className="font-semibold text-white line-clamp-1">{data.food_name || "—"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Location</div>
              <div className="font-semibold text-white line-clamp-1">{data.location || "—"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Restaurant</div>
              <div className="font-semibold text-white line-clamp-1">{data.restaurant_name || "—"}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Rating</div>
              <div className="font-semibold text-white">{data.star_rating || "—"} / 5</div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-12 bg-base-100/95 dark:bg-base-100/10">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold text-heading">Update Review</h3>
              <p className="text-sm text-muted mt-1">Refine your existing review.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-base-200 px-3 py-2 text-xs font-semibold text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: accent }} />
              Edit Mode
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-base-200/70 bg-base-100/70 dark:bg-base-100/10 p-5 md:p-6 shadow-lg backdrop-blur-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Food Name</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={data.food_name}
                  required
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="Enter food name"
                />
              </div>

              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Restaurant Name</label>
                <input
                  type="text"
                  name="restaurant"
                  defaultValue={data.restaurant_name}
                  required
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="Restaurant name"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Food Image</label>
                <input
                  type="url"
                  name="image"
                  defaultValue={data.food_image}
                  onChange={(e) => setImageUrl(e.target.value)}
                  required
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="mt-2 text-xs text-white/60 lg:text-muted">
                  Live preview updates as you change the image URL.
                </p>
              </div>

              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  defaultValue={data.location}
                  required
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="Enter location"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-[180px_1fr] items-start">
              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Rating</label>
                <input
                  type="number"
                  name="rating"
                  defaultValue={data.star_rating}
                  required
                  min="1"
                  max="5"
                  step="0.1"
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="1 - 5"
                />
              </div>

              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Add Review</label>
                <textarea
                  name="review"
                  defaultValue={data.review_text}
                  required
                  rows="9"
                  className="textarea textarea-bordered w-full rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)] min-h-60"
                  placeholder="Tell how you feel about the food"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: accent }}
              >
                Save Changes
              </button>
              <div className="text-xs text-muted text-center sm:text-left">
                Keep the update short and accurate for better community trust.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateReview;
