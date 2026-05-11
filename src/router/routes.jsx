import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Home from "../Pages/Home/Home";
import Profile from "../Pages/Profile/Profile";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Registration";
import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";
import MyDownloads from "../Pages/MyDownloads/MyDownloads";
import ErrorPage from "../components/ErrorPage";
import AllItems from "../Pages/AllItems/AllItems";
import FoodDetails from "../Pages/FoodDetails/FoodDetails";
import AllReviews from "../Pages/AllReviews";
import MyReviews from "../Pages/MyReviews/MyReviews";
import MyFavourites from "../Pages/MyFavourites/MyFavourites";
import About from "../Pages/About/About";
import Overview from "../Pages/Dashboard/Overview";
import MyBookings from "../Pages/Dashboard/MyBookings";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory";
import MyReviewsDashboard from "../Pages/Dashboard/MyReviewsDashboard";
import AddReviews from "../Pages/AddReviews/AddReviews";
import UpdateReview from "../Pages/UpdateReview/UpdateReview";
import AdminManageUsers from "../Pages/Dashboard/AdminManageUsers";
import AdminManageProducts from "../Pages/Dashboard/AdminManageProducts";
import AdminAllBookings from "../Pages/Dashboard/AdminAllBookings";

// ─── সব জায়গায় এই একটাই variable ব্যবহার হবে ───
const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
        loader: () => fetch(`${API}/details`).then(r => r.json()),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: "/all-items",
        element: <AllItems />,
        loader: () => fetch(`${API}/details`).then(r => r.json()),
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
        element: <AllReviews />,
        loader: () => fetch(`${API}/details`).then(r => r.json()),
      },
      {
        path: "/item-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetails />
          </PrivateRoute>
        ),
        loader: ({ params }) => fetch(`${API}/details/${params.id}`).then(r => r.json()),
      },
      {
        path: "/my-reviews",
        element: (
          <PrivateRoute>
            <MyReviews />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-favourites",
        element: (
          <PrivateRoute>
            <MyFavourites />
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
        element: (
          <RoleRoute allow={["user", "admin"]}>
            <Overview />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/bookings",
        element: (
          <RoleRoute allow={["user"]}>
            <MyBookings />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/payments",
        element: (
          <RoleRoute allow={["user"]}>
            <PaymentHistory />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/reviews",
        element: (
          <RoleRoute allow={["user"]}>
            <MyReviewsDashboard />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/favourites",
        element: (
          <RoleRoute allow={["user"]}>
            <MyFavourites />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/reviews/add",
        element: (
          <RoleRoute allow={["user"]}>
            <AddReviews />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/reviews/:id/edit",
        element: (
          <RoleRoute allow={["user"]}>
            <UpdateReview />
          </RoleRoute>
        ),
        loader: ({ params }) => fetch(`${API}/details/${params.id}`).then(r => r.json()),
      },
      {
        path: "/dashboard/manage-users",
        element: (
          <RoleRoute allow={["admin"]}>
            <AdminManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/manage-products",
        element: (
          <RoleRoute allow={["admin"]}>
            <AdminManageProducts />
          </RoleRoute>
        ),
      },
      {
        path: "/dashboard/all-bookings",
        element: (
          <RoleRoute allow={["admin"]}>
            <AdminAllBookings />
          </RoleRoute>
        ),
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);
