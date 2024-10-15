import "./module.css";

import { Outlet } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

function Layout() {
  return (
    <>
      <div className='layout'>
        <Navbar />
        <div className='main-content'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
