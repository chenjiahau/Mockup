import React from "react";
import { Link, Outlet } from "react-router-dom";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

function Layout() {
  return (
    <>
      <div className='layout'>
        <Navbar />
        <main className='px-4 lg:px-8 md:px-8'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
