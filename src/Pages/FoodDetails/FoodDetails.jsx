import { Link, useLoaderData, useNavigate,  } from "react-router";
import Swal from "sweetalert2";


const FoodDetails = () => {
  const navigate=useNavigate()
  const data=useLoaderData();
  const handleDelete=()=>{
    Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {

    fetch(`http://localhost:3000/details/${data._id}`, {
       method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res => res.json())
    .then(data=> {
      navigate('/all-items')
      toast.success("Successfully added!")
      
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
      console.log(data)
    })
    .catch(err => {
      console.log(err)
    })
   

    
  }
});
  }
  
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
      <div className="card bg-base-100 shadow-xl border border-gray-200 rounded-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 p-6 md:p-8">
          <div className="shrink-0 w-full md:w-1/2">
            <img
              src={data.food_image}
              alt=""
              className="w-full object-cover rounded-xl shadow-md"
            />
          </div>

          <div className="flex flex-col justify-center space-y-4 w-full md:w-1/2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              {data.food_name}
            </h1>

            <div className="flex gap-3">
              <div className="badge badge-lg badge-outline text-cyan-900 border-indigo-300 font-medium">
                {data.location}
              </div>

              <div className="badge badge-lg badge-outline text-cyan-900 border-indigo-300 font-medium">
                Ratings: {data.star_rating}
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-base md:text-lg">
              {data.review_text}
            </p>

            <div className="flex gap-3 mt-6">
              <Link
                to={`/update-review/${data._id}`}
                className="btn btn-primary rounded-full bg-linear-to-r from-cyan-900 to-indigo-200 text-white border-0 hover:from-cyan-900 hover:to-indigo-400"
              >
                Edit Review
              </Link>
              <button
                className="btn btn-outline rounded-full border-indigo-300 hover:border-indigo-500 text-cyan-900"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;