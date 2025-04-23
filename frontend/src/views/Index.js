/*eslint-disable*/ 
import React from "react";
import { Link } from "react-router-dom";

import IndexNavbar from "components/Navbars/IndexNavbar.js";
import Footer from "components/Footers/Footer";

export default function Index() {
  return (
    <>
      <IndexNavbar fixed />

      <section className="relative pt-16 h-screen flex items-center justify-center">
        {/* Background image */}
         {/* <img
          className="fixed top-0 w-full h-full object-cover z-[-1]"
          src={require("assets/logo/cars.png").default}
          alt="background"
        /> */}

        <div className="z-50 mt-10 mb-24">
          <Link
            to="/auth/Login"
            className="flex gap-[20px] content-end items-end justify-end flex-wrap-reverse text-white font-bold px-6 py-4 rounded bg-lightBlue-500 active:bg-lightBlue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
          >
            Login
          </Link>
        </div>
      </section>

      {/* <Footer /> */}
    </>
  );
}
