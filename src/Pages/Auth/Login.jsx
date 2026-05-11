import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { IoRestaurantOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogIn = (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    const email = event.target.email.value;
    const password = event.target.password.value;

    signInUser(email, password)
      .then((result) => {
        event.target.reset();
        navigate(location.state?.from || "/dashboard/overview");
      })
      .catch((err) => {
        setError("Invalid email or password. Please try again.");
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    signInWithGoogle()
      .then(() => {
        navigate(location?.state?.from || "/dashboard/overview");
      })
      .catch(() => {
        setError("Google sign-in failed. Please try again.");
      });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] relative overflow-hidden bg-linear-to-br from-[#fff8f1] via-[#fffdfb] to-[#f5efe7] dark:from-[#120f0d] dark:via-[#181410] dark:to-[#0f0d0b]">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-24 h-[420px] w-[420px] rounded-full bg-[rgba(226,98,73,0.16)] blur-3xl" />
        <div className="absolute bottom-0 left-0 h-[320px] w-[320px] rounded-full bg-[rgba(212,175,55,0.14)] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] w-full max-w-6xl items-center gap-8 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-6">
        <div className="order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/40 bg-black/10 shadow-[0_30px_80px_rgba(0,0,0,0.12)]">
            <img
              src="/login.jpg"
              alt="Beautiful food spread"
              className="h-[260px] w-full object-cover sm:h-[360px] lg:h-[720px]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/78 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 text-white">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.24em] backdrop-blur">
                <IoRestaurantOutline size={14} /> FoodNest
              </div>
              <h2 className="font-display mt-4 max-w-lg text-3xl font-bold leading-tight sm:text-4xl">
                Discover, save, and review the foods you actually crave.
              </h2>
              <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
                A warm, premium space for food lovers to sign in and continue exploring local dishes, honest reviews, and favourites.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "Fast access to your dashboard",
                  "Save favourites and write reviews",
                  "Beautiful food discovery experience",
                  "Responsive on mobile and desktop",
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

        <div className="order-1 lg:order-2">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(226,98,73,0.18)] bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[rgb(226,98,73)] shadow-sm backdrop-blur dark:bg-[rgba(24,20,16,0.75)]">
            <IoRestaurantOutline size={14} /> Welcome back
          </div>

          <div className="rounded-[2rem] border border-base-200/70 bg-white/80 p-5 shadow-[0_24px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl dark:bg-[rgba(24,20,16,0.88)] sm:p-8">
            <div className="mb-8 text-center lg:text-left">
              <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Sign in to FoodNest</h1>
              <p className="mt-2 text-sm text-muted sm:text-base">
                Jump back in to explore local foods, keep your favourites, and manage your reviews.
              </p>
            </div>

            <form onSubmit={handleLogIn} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium opacity-80">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="input-premium"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-medium opacity-80">Password</label>
                  <a href="#" className="text-xs font-medium" style={{ color: "rgb(226,98,73)" }}>
                    Forgot password?
                  </a>
                </div>
                <input
                  type="password"
                  name="password"
                  className="input-premium"
                  placeholder="••••••••"
                  required
                />
              </div>

              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <button type="submit" className="btn-brand mt-2 w-full" disabled={loading}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            <div className="px-1 py-5">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-base-200" />
                <span className="text-xs font-medium uppercase tracking-[0.22em] opacity-40">or continue with</span>
                <div className="h-px flex-1 bg-base-200" />
              </div>
            </div>

            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-base-200 px-4 py-3 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgb(226,98,73)]/40 hover:bg-base-200/50 hover:text-[rgb(226,98,73)] hover:shadow-md"
            >
              <FaGoogle className="text-red-500 transition-colors duration-200 group-hover:text-[rgb(226,98,73)]" />
              Continue with Google
            </button>

            <div className="mt-6 border-t border-base-200 pt-4 text-center text-sm">
              <span className="opacity-60">New to FoodNest? </span>
              <Link to="/auth/register" className="font-semibold hover:underline" style={{ color: "rgb(226,98,73)" }}>
                Create an account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
