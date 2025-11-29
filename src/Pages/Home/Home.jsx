import { NavLink, useLoaderData } from "react-router";
import Banner from "../../components/Banner";
import { FoodCard } from "../../components/FoodCard";
const Home = () => {
    const data = useLoaderData()
    console.log(data)
    return (
        <div>
            <Banner />

            {/* intro section */}
            <section className="max-w-6xl mx-auto mt-24 px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-green-600 bg-clip-text text-transparent mb-3 animate-pulse">
                    Welcome to Local Food Lovers Network
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-2 animate-fade-in">
                    Discover authentic local cuisines, connect with passionate home cooks, and experience food like never before.
                </p>
                <div className="h-1 mt-5 w-32 bg-gradient-to-r from-orange-400 to-green-400 mx-auto rounded-full"></div>
            </section>

            {/* Features  */}
            <section className="max-w-6xl mx-auto mt-12 mb-28 px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-rose-50 via-amber-50 to-green-50 border border-gray-100 shadow-sm">
                        <div className="flex-none w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white text-xl">🍅</div>
                        <div>
                            <h4 className="text-sm font-semibold text-cyan-900">Fresh Local Ingredients</h4>
                            <p className="text-xs text-gray-600">Sourced daily from nearby farms and vendors.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-indigo-50 via-cyan-50 to-sky-50 border border-gray-100 shadow-sm">
                        <div className="flex-none w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-xl">👨‍🍳</div>
                        <div>
                            <h4 className="text-sm font-semibold text-cyan-900">Top Rated Chefs</h4>
                            <p className="text-xs text-gray-600">Curated dishes from community-favorite cooks.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-yellow-50 via-amber-50 to-orange-50 border border-gray-100 shadow-sm">
                        <div className="flex-none w-12 h-12 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-xl">⚡</div>
                        <div>
                            <h4 className="text-sm font-semibold text-cyan-900">Fast Delivery</h4>
                            <p className="text-xs text-gray-600">Reliable delivery across the neighborhood.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-r from-emerald-50 via-green-50 to-lime-50 border border-gray-100 shadow-sm">
                        <div className="flex-none w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-lime-500 flex items-center justify-center text-white text-xl">⭐</div>
                        <div>
                            <h4 className="text-sm font-semibold text-cyan-900">Community Reviews</h4>
                            <p className="text-xs text-gray-600">Real feedback from local food lovers.</p>
                        </div>
                    </div>
                </div>
            </section>



            
            
            {/* How it works */}
            <section className="max-w-6xl mx-auto mt-12 px-4">
                <h2 className="text-3xl font-bold text-cyan-900 mb-6">How It Works :</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-r from-white to-cyan-50 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">1</div>
                        <h4 className="font-semibold text-cyan-900 mb-2 transition-colors duration-300 group-hover:text-cyan-700">Browse Local Dishes</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Explore dishes posted by nearby cooks and vendors.</p>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-white to-amber-50 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">2</div>
                        <h4 className="font-semibold text-cyan-900 mb-2 transition-colors duration-300 group-hover:text-cyan-700">Read Reviews & Ratings</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">See community feedback to pick the best dishes.</p>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-white to-green-50 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer group">
                        <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">3</div>
                        <h4 className="font-semibold text-cyan-900 mb-2 transition-colors duration-300 group-hover:text-cyan-700">Order or Visit</h4>
                        <p className="text-sm text-gray-600 transition-colors duration-300 group-hover:text-gray-700">Order delivery or visit the vendor to taste for yourself.</p>
                    </div>
                </div>
            </section>

            {/* Popular Cuisines */}
            <section className="max-w-6xl mx-auto mt-12 px-4">
                <h3 className="text-2xl font-semibold text-cyan-900 mb-4">Popular Cuisines</h3>
                <div className="flex gap-3 flex-wrap">
                    {['Burgers', 'BBQ', 'Seafood', 'Vegan', 'Desserts', 'Street Food'].map(c => (
                        <span key={c} className="px-4 py-2 bg-gradient-to-r from-cyan-50 to-white border border-gray-200 rounded-full text-sm text-cyan-900">{c}</span>
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <section className="max-w-6xl mx-auto mt-12 px-4">
                <h3 className="text-2xl font-semibold text-cyan-900 mb-6">What People Say</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[{
                        name: 'Ashiqur Rahman', text: 'Hands down the juiciest burger I have had in town. Highly recommend!', rating: 4.9
                    }, {
                        name: 'Sara K', text: 'Loved the fresh ingredients and speedy delivery.', rating: 4.7
                    }, {
                        name: 'Rafi', text: 'Great community platform to discover hidden local gems.', rating: 4.8
                    }].map((t, i) => (
                        <div key={i} className="p-6 bg-white rounded-lg shadow-md">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">{t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</div>
                                <div>
                                    <div className="font-semibold text-cyan-900">{t.name}</div>
                                    <div className="text-yellow-500 font-bold">⭐ {t.rating}</div>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm">"{t.text}"</p>
                        </div>
                    ))}
                </div>
            </section>



            <div className="text-center text-4xl md:text-4xl font-black mt-10 mb-3 bg-gradient-to-r from-red-600 via-orange-500 to-amber-600 bg-clip-text text-transparent pt-[70px] md:pt-[360px] lg:pt-[50px] drop-shadow-lg">Latest Food</div>

            <h2 className="text-2xl text-center  font-bold text-cyan-900 mb-0.5">Top Rated This Week</h2>
            <p className="text-sm text-gray-600 text-center  mb-6">Community favorites with the highest ratings</p>


            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-10">
                {data.map(item => <FoodCard key={item._id} item={item} />)}
            </div>

            <div>
                <button className="btn btn-wide ml-22 md:ml-[250px] lg:ml-[520px] mt-9 bg-linear-to-r from-cyan-900 to-indigo-200  hover:from-cyan-900 hover:to-indigo-400 text-white"><NavLink to={"all-items"}>Show All</NavLink> </button>
            </div>

        </div>
    );
};

export default Home;