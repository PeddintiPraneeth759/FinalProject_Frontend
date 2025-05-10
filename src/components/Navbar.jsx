import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={assets.h}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium ">
        <NavLink to="/">
          <li className="py-1">HOME</li>
          <hr className="border-none outline-none h-0.5 bg-slate-800 w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1">ALL DOCTORS</li>
          <hr className="border-none outline-none h-0.5 bg-slate-800 w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li className="py-1">ABOUT</li>
          <hr className="border-none outline-none h-0.5 bg-slate-800 w-4/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li className="py-1">CONTACT</li>
          <hr className="border-none outline-none h-0.5 bg-slate-800 w-4/5 m-auto hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.upload_area} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
                <p
                  onClick={() => navigate("my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("my-appointment")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => navigate("/doctor-login")}
                  className="hover:text-black cursor-pointer"
                >
                  Admin Login
                </p>
                <p
                  onClick={() => setIsLoggedIn(false)}
                  className="hover:text-black cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-normal hidden md:block"
          >
            Create Account
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt=""
        />
        {/* ----------mobile menu ------ */}
        <div
          className={`fixed top-0 right-[-10px] bottom-0 z-20 w-56 bg-primary/20 backdrop-blur-md rounded-lg shadow-lg transition-transform duration-300 ${
            showMenu ? "translate-x-0" : "translate-x-[calc(100%+10px)]"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-[20px]">
            <img className="w-36" src={assets.logo} alt="" />
            <img
              className="w-7 "
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt=""
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-3 px-5 text-lg font-medium">
            <NavLink
              className="Nav-color px-4 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/"
            >
              HOME
            </NavLink>
            <NavLink
              className="Nav-color px-4 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/doctors"
            >
              ALL DOCTORS
            </NavLink>
            <NavLink
              className="Nav-color px-4 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/about"
            >
              ABOUT
            </NavLink>
            <NavLink
              className="Nav-color px-4 rounded inline-block"
              onClick={() => setShowMenu(false)}
              to="/contact"
            >
              CONTACT
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
