import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

function Layout() {
  return (
    <>
      <div className='layout'>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
