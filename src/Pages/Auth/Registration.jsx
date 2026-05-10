import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaGoogle } from "react-icons/fa";
import { IoRestaurantOutline } from "react-icons/io5";

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
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, rgb(226,98,73), transparent)" }} />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
            style={{ background: "rgba(226,98,73,0.1)", border: "1px solid rgba(226,98,73,0.2)" }}>
            <IoRestaurantOutline size={28} style={{ color: "rgb(226,98,73)" }} />
          </div>
          <h1 className="font-display text-3xl font-bold mb-1">Join FoodNest</h1>
          <p className="text-sm opacity-60">Create your account to get started</p>
        </div>

        <div className="rounded-2xl shadow-2xl border border-base-200 bg-base-100 overflow-hidden animate-fade-in-up stagger-1">
          <form onSubmit={handleRegister} className="p-6 space-y-4">
            {[
              { name: "name", label: "Full name", type: "text", placeholder: "Rafiul Karim" },
              { name: "email", label: "Email address", type: "email", placeholder: "you@example.com" },
              { name: "photo", label: "Photo URL (optional)", type: "url", placeholder: "https://..." },
              { name: "password", label: "Password", type: "password", placeholder: "Min. 6 characters" },
            ].map(f => (
              <div key={f.name}>
                <label className="block text-sm font-medium mb-1.5 opacity-80">{f.label}</label>
                <input type={f.type} name={f.name} placeholder={f.placeholder}
                  className="input-premium" required={f.name !== "photo"} />
              </div>
            ))}

            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            <button type="submit" className="btn-brand mt-2" disabled={loading}>
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="px-6 pb-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-base-200" />
              <span className="text-xs opacity-40 font-medium">or</span>
              <div className="flex-1 h-px bg-base-200" />
            </div>
          </div>

          <div className="px-6 pb-5">
            <button type="button" onClick={handleGoogle}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-base-200 text-sm font-semibold hover:bg-base-200/50 transition-all hover:-translate-y-0.5 duration-200">
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
          </div>

          <div className="border-t border-base-200 px-6 py-4 text-center text-sm">
            <span className="opacity-60">Already have an account? </span>
            <Link to="/auth/login" className="font-semibold hover:underline" style={{ color: "rgb(226,98,73)" }}>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
