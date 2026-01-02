import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <NavBar />

      <div className="max-w-7xl mx-auto">
        <div className="mt-4">
          <Outlet />
        </div>
        <Footer />
      </div>

      <Toaster />
    </div>
  );
};

export default MainLayout;
