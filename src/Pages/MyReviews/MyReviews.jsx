import { use, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { FoodCard } from "../../components/FoodCard";
const MyReviews = () => {
    const {user} = use(AuthContext)
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=> {

        fetch(`http://localhost:3000/my-reviews?email=${user.email}`)
        .then(res=> res.json())
        .then(data=> {
            setItems(data)
            setLoading(false)
        })

    }, [user])


    if(loading) {
        return <div> Please wait ... Loading...</div>
    }

    return (
        <div>
              <div className="grid grid-cols-3 lg:grid-cols-4 gap-3">
                     {items.map(item => <FoodCard key={item._id} item={item}/>)}
                  </div>
            
        </div>
    );
};

export default MyReviews;