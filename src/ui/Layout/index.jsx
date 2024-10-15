import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

function Layout() {
  return (
    <>
      <div className='layout'>
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </>
  );
}

export default Layout;
