import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle, FaShieldAlt, FaUser } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";

const Login = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("user"); // "user" | "admin"
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
        navigate(location.state?.from || (role === "admin" ? "/dashboard/manage-users" : "/dashboard/overview"));
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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, rgb(226,98,73), transparent)" }} />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, #D4AF37, transparent)" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo + Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
            style={{ background: "rgba(226,98,73,0.1)", border: "1px solid rgba(226,98,73,0.2)" }}>
            <IoRestaurantOutline size={28} style={{ color: "rgb(226,98,73)" }} />
          </div>
          <h1 className="font-display text-3xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm opacity-60">Sign in to your FoodNest account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl shadow-2xl border border-base-200 bg-base-100 overflow-hidden animate-fade-in-up stagger-1">
          {/* Role toggle header */}
          <div className="p-5 pb-0">
            <div className="role-toggle">
              <button
                type="button"
                className={`role-toggle-btn ${role === "user" ? "active" : ""}`}
                onClick={() => setRole("user")}
              >
                <span className="flex items-center justify-center gap-2">
                  <FaUser size={12} />
                  User Login
                </span>
              </button>
              <button
                type="button"
                className={`role-toggle-btn ${role === "admin" ? "active" : ""}`}
                onClick={() => setRole("admin")}
              >
                <span className="flex items-center justify-center gap-2">
                  <FaShieldAlt size={12} />
                  Admin Login
                </span>
              </button>
            </div>
          </div>

          {/* Role hint */}
          <div className="px-5 pt-3">
            <div className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${
              role === "admin"
                ? "bg-orange-50 text-orange-700 border border-orange-200"
                : "bg-blue-50 text-blue-700 border border-blue-200"
            }`}
              style={role === "admin"
                ? { background: "rgba(226,98,73,0.07)", color: "rgb(180,70,50)", borderColor: "rgba(226,98,73,0.2)" }
                : {}}>
              {role === "admin" ? <FaShieldAlt size={11} /> : <FaUser size={11} />}
              {role === "admin"
                ? "Admin credentials provide full dashboard access."
                : "Signing in as a regular user."}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleLogIn} className="p-5 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 opacity-80">Email address</label>
              <input
                type="email"
                name="email"
                className="input-premium"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
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
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button type="submit" className="btn-brand mt-2" disabled={loading}>
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in...
                </span>
              ) : (
                `Sign in as ${role === "admin" ? "Admin" : "User"}`
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="px-5 pb-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-base-200" />
              <span className="text-xs opacity-40 font-medium">or continue with</span>
              <div className="flex-1 h-px bg-base-200" />
            </div>
          </div>

          {/* Google */}
          <div className="px-5 pb-5">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-base-200 text-sm font-semibold hover:bg-base-200/50 transition-all duration-200 hover:-translate-y-0.5"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
          </div>

          {/* Footer */}
          <div className="border-t border-base-200 px-5 py-4 text-center text-sm">
            <span className="opacity-60">New to FoodNest? </span>
            <Link
              to="/auth/register"
              className="font-semibold hover:underline"
              style={{ color: "rgb(226,98,73)" }}
            >
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
