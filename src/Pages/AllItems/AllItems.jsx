import { useLoaderData } from "react-router";
import { FoodCard } from "../../components/FoodCard";
import { useState } from "react";

const AllItems = () => {
  const data = useLoaderData();
  const [items, setItems] = useState(data)
  const [loading, setLoading] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    const search_text = e.target.search.value
    console.log(search_text)
    setLoading(true)

    fetch(`http://localhost:3000/search?search=${search_text}`)
    .then(res=> res.json())
    .then(data=> {
      console.log(data)
      setItems(data)
      setLoading(false)
    })
  }



  


  return (
    <div>
      <div className="text-2xl text-cyan-900 text-center font-bold"> All Foods</div>
      <p className=" text-center text-cyan-800">Explore Local Foods.</p>
     
     <form onSubmit={handleSearch} className=" mt-5 mb-10 flex gap-2 justify-center">
       <label className="input rounded-full ">
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
        <input name="search" type="search"  placeholder="Search" />
      </label>
      <button className="btn text-white bg-linear-to-r from-cyan-900 to-indigo-200 hover:from-cyan-900 hover:to-indigo-400  rounded-full">{loading ? "Searching...." : "Search"}</button>
     </form>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
        {items.map((item) => (
          <FoodCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default AllItems;