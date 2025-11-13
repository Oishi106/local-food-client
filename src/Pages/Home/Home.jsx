import { NavLink, useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { FoodCard } from "../../components/FoodCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner />

            

            <div className="text-center text-4xl font-bold  text-cyan-900 mt-[20px] md:pt-[30px] lg:pt-[40px]">Latest Food</div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 mt-10">
                {data.map(item => <FoodCard key={item._id} item={item} />)}
            </div>

            <div>
                <button className="btn btn-wide ml-22 md:ml-[250px] lg:ml-[520px] mt-9 bg-linear-to-r from-cyan-900 to-indigo-200  hover:from-cyan-900 hover:to-indigo-400 text-white"><NavLink to={"all-items"}>Show All</NavLink> </button>
            </div>

        </div>
    );
};

export default Home;