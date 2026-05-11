import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import MyDownloads from "../Pages/MyDownloads/MyDownloads";
import ErrorPage from "../components/ErrorPage";
import AllItems from "../Pages/AllItems/AllItems";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import AllReviews from "../Pages/AllReviews";
import MyReviews from "../Pages/MyReviews/MyReviews";
import MyFavourites from "../Pages/MyFavourites/MyFavourites";
import About from "../Pages/About/About";
import Overview from "../Pages/Dashboard/Overview";
import MyReviewsDashboard from "../Pages/Dashboard/MyReviewsDashboard";
import AddReviews from "../Pages/AddReviews/AddReviews";
import UpdateReview from "../Pages/UpdateReview/UpdateReview";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch('http://localhost:3000/details')
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
        path: "/about",
        element: <About />,
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
        element: <AllReviews></AllReviews>,
        loader: () => fetch('http://localhost:3000/details')
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
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard/overview" replace />,
      },
      {
        path: "/dashboard/overview",
        element: <Overview />,
      },
      {
        path: "/dashboard/reviews",
        element: <MyReviewsDashboard />,
      },
      {
        path: "/dashboard/reviews/add",
        element: <AddReviews />,
      },
      {
        path: "/dashboard/favourites",
        element: <MyFavourites />,
      },
      {
        path: "/dashboard/reviews/:id/edit",
        element: <UpdateReview />,
        loader: ({ params }) => fetch(`${API_BASE_URL}/details/${params.id}`),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
