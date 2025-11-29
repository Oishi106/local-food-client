import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import MyModels from "../Pages/MyReviews/MyReviews";
import MyDownloads from "../Pages/MyDownloads/MyDownloads";
import ErrorPage from "../components/ErrorPage ";
import AddReviews from "../Pages/AddReviews/AddReviews";
import AllItems from "../Pages/AllItems/AllItems";
import UpdateReview from "../Pages/UpdateReview/UpdateReview";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import AllReviews from "../Pages/AllReviews";
import MyReviews from "../Pages/MyReviews/MyReviews";
import MyFavourites from "../Pages/MyFavourites/MyFavourites";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('http://localhost:3000/top_rated-items')
      },
      {
        path: "*",
        element: <ErrorPage></ErrorPage>,
      },
      {
        path: "/all-items",
        element: <AllItems></AllItems>,
        loader: () => fetch('http://localhost:3000/details')
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "/all-reviews",
        element: (
          <PrivateRoute>
           <AllReviews></AllReviews>
          </PrivateRoute>
        ),
        loader: () => fetch('http://localhost:3000/details')
      },
      {
        path: "/add-Review",
        element: (
          <PrivateRoute>
           <AddReviews></AddReviews>
          </PrivateRoute>
        ),
      },
      {
        path: "/item-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        loader:({params})=>fetch(`http://localhost:3000/details/${params.id}`)
      },

       {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews></MyReviews>
          </PrivateRoute>
        ),
      },
       {
        path: "/my-favourites",
        element: (
          <PrivateRoute>
            <MyFavourites></MyFavourites>
          </PrivateRoute>
        ),
      },

       {
        path: "/my-downloads",
        element: (
          <PrivateRoute>
            <MyDownloads />
          </PrivateRoute>
        ),
      },

        {
        path: "/update-review/:id",
        element: (
          <PrivateRoute>
            <UpdateReview></UpdateReview>
          </PrivateRoute>
        ),
          loader: ({params}) => fetch(`http://localhost:3000/details/${params.id}`)
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
]);
