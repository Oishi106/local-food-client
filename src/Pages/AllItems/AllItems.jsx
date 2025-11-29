import { useLoaderData } from "react-router";
import { FoodCard } from "../../components/FoodCard";
import { useState } from "react";

const AllItems = () => {
  const data = useLoaderData();
  const [items, setItems] = useState(data)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const search_text = e.target.search.value.trim()
    
    if (!search_text) {
      setError('Please enter a food name to search')
      return
    }

    setLoading(true)
    setError(null)
    setHasSearched(true)

    fetch(`http://localhost:3000/search?search=${encodeURIComponent(search_text)}`)
      .then(res => {
        if (!res.ok) throw new Error('Search failed')
        return res.json()
      })
      .then(data => {
        console.log('Search result:', data)
        setItems(data)
        setLoading(false)
        if (data.length === 0) {
          setError(`No foods found matching "${search_text}"`)
        }
      })
      .catch(err => {
        console.error('Search error:', err)
        setError('Error searching foods. Please try again.')
        setLoading(false)
      })
  }

  const handleClearSearch = () => {
    setItems(data)
    setError(null)
    setHasSearched(false)
    const searchInput = document.querySelector('input[name="search"]')
    if (searchInput) searchInput.value = ''
  }

  return (
    <div>
      <div className="text-2xl text-cyan-900 text-center font-bold"> All Foods</div>
      <p className=" text-center text-cyan-800">Explore Local Foods.</p>
     
     <form onSubmit={handleSearch} className="mt-5 mb-6 flex gap-2 justify-center flex-wrap">
       <label className="input rounded-full">
        <svg
          className="h-[1em] opacity-50"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <g
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2.5"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </g>
        </svg>
        <input 
          name="search" 
          type="text"  
          placeholder="Search by food name (e.g., Biryani, Pizza)" 
          className="w-48"
        />
      </label>
      <button 
        type="submit"
        className="btn text-white bg-gradient-to-r from-cyan-900 to-indigo-600 hover:from-cyan-800 hover:to-indigo-700 rounded-full"
        disabled={loading}
      >
        {loading ? "Searching..." : "Search"}
      </button>
      {hasSearched && (
        <button 
          type="button"
          onClick={handleClearSearch}
          className="btn text-white bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 rounded-full"
        >
          Clear
        </button>
      )}
     </form>

     {error && (
       <div className="text-center mb-6 text-red-600 font-semibold text-sm">
         {error}
       </div>
     )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllItems;
