import { useLoaderData } from "react-router-dom";
import { FoodCard } from "../../components/FoodCard";
import { useState } from "react";
import { IoSearchOutline, IoCloseOutline, IoStarOutline } from "react-icons/io5";

const AllItems = () => {
  const data = useLoaderData();
  const [items, setItems] = useState(data);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    const search_text = searchTerm.trim();
    
    if (!search_text) {
      setError("Please enter a food name to search");
      return;
    }

    setLoading(true);
    setError(null);
    setHasSearched(true);

    fetch(`https://local-food-server.onrender.com/search?search=${encodeURIComponent(search_text)}`)
      .then(res => {
        if (!res.ok) throw new Error("Search failed");
        return res.json();
      })
      .then(data => {
        setItems(data);
        setLoading(false);
        if (data.length === 0) {
          setError(`No foods found matching "${search_text}"`);
        }
      })
      .catch(err => {
        console.error("Search error:", err);
        setError("Error searching foods. Please try again.");
        setLoading(false);
      })
  }

  const handleClearSearch = () => {
    setItems(data);
    setSearchTerm("");
    setError(null);
    setHasSearched(false);
  }

  return (
    <div className="relative overflow-hidden">
      <div className="relative space-y-6">
        <section className="rounded-3xl border border-base-200 bg-base-100/80 backdrop-blur-sm shadow-lg p-5 md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted">All Foods</p>
              <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-heading">
                Explore available foods
              </h1>
              <p className="mt-1 text-sm text-muted">
                Search food items quickly and open details from the grid below.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              <IoStarOutline size={14} style={{ color: "rgb(226,98,73)" }} />
              {items.length} items available
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="rounded-3xl border border-base-200 bg-base-100/80 backdrop-blur-sm shadow-lg p-5 md:p-6">
          <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-3 lg:items-center">
            <label className="input input-bordered flex items-center gap-3 rounded-2xl bg-base-100/90 w-full lg:flex-1 h-14 px-4">
              <IoSearchOutline size={18} className="opacity-50 shrink-0" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by food name (e.g., Biryani, Pizza)"
                className="flex-1 bg-transparent outline-none text-heading placeholder:text-muted/70"
              />
            </label>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 h-14 rounded-2xl text-white font-semibold shadow-lg transition-transform hover:-translate-y-0.5"
                style={{ background: "rgb(226,98,73)" }}
                disabled={loading}
              >
                {loading ? "Searching..." : "Search Foods"}
              </button>

              {hasSearched && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="inline-flex items-center justify-center gap-2 px-5 h-14 rounded-2xl border border-base-200 bg-base-100/80 font-semibold hover:bg-base-200/70 transition-colors"
                >
                  <IoCloseOutline size={16} /> Clear
                </button>
              )}
            </div>
          </form>

          {error && (
            <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-red-700 text-sm font-semibold">
              {error}
            </div>
          )}
        </section>

       

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {items.map((item) => (
            <FoodCard key={item._id} item={item} />
          ))}
        </div>

        {items.length === 0 && !error && !loading && (
          <div className="rounded-3xl border border-dashed border-base-300 bg-base-100/70 p-12 text-center">
            <div className="text-5xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold text-heading">Nothing here yet</h3>
            <p className="text-sm text-muted mt-2">Try a different search term or explore the categories above.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllItems;
