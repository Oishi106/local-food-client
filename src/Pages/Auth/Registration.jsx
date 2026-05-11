import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { IoRestaurantOutline, IoSparklesOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const Registration = () => {
  const { createUser, signInWithGoogle, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photo = e.target.photo.value;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then((result) => {
        return updateUserProfile(name, photo).then(() => {
          navigate("/dashboard/overview");
        });
      })
      .catch((err) => {
        setError(err.message || "Registration failed. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogle = () => {
    signInWithGoogle()
      .then(() => navigate("/dashboard/overview"))
      .catch(() => setError("Google sign-in failed."));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] relative overflow-hidden bg-linear-to-br from-[#fffaf4] via-[#fffdfb] to-[#f6eee4] dark:from-[#120f0d] dark:via-[#181410] dark:to-[#0f0d0b]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-24 h-[420px] w-[420px] rounded-full bg-[rgba(226,98,73,0.14)] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-[rgba(212,175,55,0.14)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[0.95fr_1.05fr] lg:px-6">
        <div className="order-2 lg:order-1">
          <div className="rounded-4xl border border-base-200/70 bg-white/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:bg-[rgba(24,20,16,0.88)] sm:p-8">
            <div className="mb-8 text-center lg:text-left">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[rgba(226,98,73,0.18)] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[rgb(226,98,73)] shadow-sm backdrop-blur dark:bg-[rgba(24,20,16,0.75)]">
                <img src="/lo.png" alt="FoodNest logo" className="h-4 w-auto object-contain" /> Create account
              </div>
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Join FoodNest</h1>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Build your profile, save favourites, and start sharing the foods you love with the community.
              </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {[
                { name: "name", label: "Full name", type: "text", placeholder: "Rafiul Karim" },
                { name: "email", label: "Email address", type: "email", placeholder: "you@example.com" },
                { name: "photo", label: "Photo URL (optional)", type: "url", placeholder: "https://..." },
                { name: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
              ].map((f) => (
                <div key={f.name}>
                  <label className="mb-1.5 block text-sm font-medium opacity-80">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    placeholder={f.placeholder}
                    className="input-premium"
                    required={f.name !== "photo"}
                  />
                </div>
              ))}

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-brand mt-2 w-full" disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <div className="px-1 py-5">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-base-200" />
                <span className="text-xs font-medium uppercase tracking-[0.22em] opacity-40">or</span>
                <div className="h-px flex-1 bg-base-200" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogle}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-base-200 px-4 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(226,98,73)]/40 hover:bg-base-200/50 hover:text-[rgb(226,98,73)] hover:shadow-md"
            >
              <FaGoogle className="text-red-500 transition-colors duration-200 group-hover:text-[rgb(226,98,73)]" />
              Continue with Google
            </button>

            <div className="mt-6 border-t border-base-200 pt-4 text-center text-sm">
              <span className="opacity-60">Already have an account? </span>
              <Link to="/auth/login" className="font-semibold hover:underline" style={{ color: "rgb(226,98,73)" }}>
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative overflow-hidden rounded-4xl border border-white/40 bg-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <img
              src="/login.jpg"
              alt="Food inspiration"
              className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[720px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/78 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] backdrop-blur">
                <IoRestaurantOutline size={14} /> FoodNest Community
              </div>
              <h2 className="font-display mt-4 max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
                A prettier way to join the local food community.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                Create an account in a space that feels warm, modern, and delicious from the first glance.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Save favourites instantly",
                  "Write and edit reviews later",
                  "Get a polished dashboard",
                  "Friendly on every screen size",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-sm backdrop-blur">
                    <IoCheckmarkCircleOutline className="text-[rgb(212,175,55)]" size={18} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
