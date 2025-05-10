import React, { useContext, useState } from "react";
import { assets } from "./../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const DoctorNavbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setUserRole } = useContext(AppContext); // Ensure user role is set

  const handleLogout = () => {
    setIsLoggedIn(false); // Set logged-in state to false
    setUserRole(""); // Clear user role
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-20 cursor-pointer"
        src={assets.h}
        alt=""
      />
      <ul className="hidden md:flex items-start gap-5 font-medium">
        {/* Show Doctor Home and Appointments links if logged in */}
        {isLoggedIn && (
          <>
            <NavLink to="/doctor-home">
              <li className="py-1">ADMIN HOME</li>
            </NavLink>
            <NavLink to="/my-appointments">
              <li className="py-1">APPOINTMENTS</li>
            </NavLink>
          </>
        )}
      </ul>
      <div className="flex items-center gap-4">
        {isLoggedIn ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={assets.upload_area} alt="" />
            <img className="w-2.5" src={assets.dropdown_icon} alt="" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 flex flex-col gap-4 p-4">
              
                <p
                  onClick={handleLogout}
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
      </div>
    </div>
  );
};

export default DoctorNavbar;
