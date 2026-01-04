import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const displayName = user?.displayName || "Anonymous Foodie";
  const email = user?.email || "No email provided";
  const photoURL =
    user?.photoURL ||
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400";

  return (
    <div className="min-h-[calc(100vh-80px)] bg-linear-to-br from-cyan-50 via-white to-indigo-50 py-10 px-4">
   
      <div className="max-w-5xl mx-auto mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-cyan-900 mb-2">
          My Profile
        </h1>
        <p className="text-cyan-800/80">
          Manage your account, see your activity and personalize your food
          journey.
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 lg:grid-cols-[1.4fr,1fr]">

        <div className="bg-white/90 backdrop-blur-lg shadow-xl rounded-3xl p-6 md:p-8 border border-cyan-100">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
    
            <div className="relative">
              <img
                src={photoURL}
                alt="User avatar"
                className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500 shadow-lg"
              />
              <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-md">
                Online
              </span>
            </div>

            <div className="flex-1 text-center md:text-left">
              <h2 className="text-2xl font-bold text-cyan-900">
                {displayName}
              </h2>
              <p className="text-cyan-700 flex items-center justify-center md:justify-start gap-2 mt-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                Food Lover • Verified Member
              </p>

              <p className="mt-3 text-sm text-cyan-800/80 break-all">
                {email}
              </p>

          
              <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                <span className="px-3 py-1 text-xs rounded-full bg-cyan-100 text-cyan-900 font-medium">
                  Top Reviewer
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-900 font-medium">
                  Local Food Explorer
                </span>
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-900 font-medium">
                  Trusted Member
                </span>
              </div>

       
              <div className="flex flex-wrap gap-3 mt-6 justify-center md:justify-start">
                <Link to={"/my-reviews"} className="btn btn-outline border-cyan-500 text-cyan-900 rounded-full px-6">
                  View My Reviews
                </Link>
                <Link to={"/my-favorite"} className="btn btn-outline border-cyan-500 text-cyan-900 rounded-full px-6">
                  My Favorites
                </Link>
              </div>
            </div>
          </div>
      
        </div>


        <div className="space-y-6">
          <div className="bg-linear-to-r from-cyan-900 to-indigo-500 text-white rounded-3xl p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Taste Profile</h3>
            <p className="text-sm text-white/90 mb-4">
              We use your reviews & favorites to understand what you love.
            </p>
            <div className="flex flex-wrap gap-2 text-xs">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🌶 Spicy Foods
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🍜 Asian Cuisine
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                🍔 Street Food
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20">
                ☕ Cafés & Desserts
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;