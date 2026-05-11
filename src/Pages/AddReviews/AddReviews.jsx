import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";
import { DashboardDataContext } from "../../context/DashboardDataContext";

const AddReviews = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { refresh } = useContext(DashboardDataContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      food_name: e.target.name.value,
      food_image: e.target.image.value,
      restaurant_name: e.target.restaurant.value,
      location: e.target.location.value,
      star_rating: e.target.rating.value,
      review_text: e.target.review.value,
      date: new Date(),
      user: user.email,
    };

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
  };


  return (
    <div className="relative overflow-hidden rounded-3xl border border-base-200 bg-base-100/70 backdrop-blur-sm shadow-2xl">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 0% 0%, rgba(226,98,73,0.10), transparent 22%), radial-gradient(circle at 100% 0%, rgba(99,102,241,0.08), transparent 20%), radial-gradient(circle at 50% 100%, rgba(212,175,55,0.08), transparent 22%)",
        }}
      />

      <div className="relative grid lg:grid-cols-[0.9fr_1.1fr] gap-0">
        <div className="relative overflow-hidden p-6 md:p-10 lg:p-12 border-b lg:border-b-0 lg:border-r border-base-200 flex flex-col justify-between min-h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=1400&fit=crop"
            alt="Food review inspiration"
            className="absolute inset-0 h-full w-full object-cover opacity-55 dark:opacity-40 scale-105"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(15,18,24,0.72) 0%, rgba(15,18,24,0.60) 38%, rgba(15,18,24,0.84) 100%), radial-gradient(circle at top left, rgba(226,98,73,0.18), transparent 34%), radial-gradient(circle at bottom right, rgba(99,102,241,0.10), transparent 30%)",
            }}
          />
          <div className="absolute top-6 right-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full" style={{ background: "rgb(226,98,73)" }} />
            Featured Taste Journal
          </div>

          <div className="relative z-10">
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] border border-white/10 bg-white/5 text-white/80 backdrop-blur-sm"
            >
              ✍️ Share Your Taste
            </span>

            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-white drop-shadow-sm max-w-xl">
              Share a review and help others choose better.
            </h2>

            <p className="mt-4 text-white/72 leading-relaxed max-w-xl">
              Keep it short, honest, and useful for the next food lover.
            </p>
          </div>

          <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Fast</div>
              <div className="font-semibold text-white">Quick and simple</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Clean</div>
              <div className="font-semibold text-white">Matches your theme</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Helpful</div>
              <div className="font-semibold text-white">Helps others decide</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="text-xs uppercase tracking-widest text-white/45 mb-1">Trusted</div>
              <div className="font-semibold text-white">Built for community</div>
            </div>
          </div>

          <div className="relative z-10 mt-8 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-md shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1547592180-85f173990554?w=300&h=300&fit=crop"
                  alt="Food closeup"
                  className="h-16 w-16 rounded-2xl object-cover ring-2 ring-white/10"
                />
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border border-white/10" style={{ background: "rgb(226,98,73)" }} />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-white">Community favorite</div>
                <div className="text-xs text-white/60 leading-relaxed">
                  Short notes, strong taste, quick feedback.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-10 lg:p-12 bg-base-100/90 dark:bg-base-100/5">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <h3 className="text-2xl font-bold text-heading">Add New Review</h3>
              <p className="text-sm text-muted mt-1">Write something useful for others.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 rounded-full border border-base-200 px-3 py-2 text-xs font-semibold text-muted">
              <span className="w-2 h-2 rounded-full" style={{ background: "rgb(226,98,73)" }} />
              Food Review Mode
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-base-200/70 bg-base-100/70 dark:bg-base-100/10 p-5 md:p-6 shadow-lg backdrop-blur-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Food Name</label>
                <input
                  type="text"
                  name="name"
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
                  required
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="label font-semibold text-sm text-heading mb-1">Location</label>
                <input
                  type="text"
                  name="location"
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
                  required
                  min="1"
                  max="5"
                  step="0.1"
                  className="input input-bordered w-full h-12 rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)]"
                  placeholder="1 - 5"
                />
              </div>

              <div className="md:pt-0">
                <label className="label font-semibold text-sm text-heading mb-1">Add Review</label>
                <textarea
                  name="review"
                  required
                  rows="9"
                  className="textarea textarea-bordered w-full rounded-2xl bg-base-200/70 dark:bg-base-100/10 text-heading placeholder:text-muted/70 border-base-300/70 dark:border-white/10 focus:outline-none focus:border-[rgb(226,98,73)] min-h-60"
                  placeholder="Write your quick opinion about taste, service, and overall experience"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: "rgb(226,98,73)" }}
              >
                Publish Review
              </button>
              <div className="text-xs text-muted text-center sm:text-left">
                Your review will appear in the community feed after publishing.
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddReviews;