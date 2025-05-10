import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="flex bg-[#eff6ff] w-full rounded-lg px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:my-14 ">
      {/* Left Side */}
      <motion.div
        className="flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="text-xl sm:text-2xl md:text-3xl font-bold md:font-medium text-gray-600">
          <p>Book Appointment</p>
          <p className="mt-4">With 100+ Trusted Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="bg-white text-sm sm:text-base text-gray-600 px-8 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-500"
        >
          Create Account
        </button>
      </motion.div>

      {/* Right Side */}
      <motion.div
        className="hidden md:block md:w-1/2 lg:w-[370px] relative"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <img
          className="w-full absolute bottom-0 right-0 max-w-md"
          src={assets.appointment_img}
          alt=""
        />
      </motion.div>
    </div>
  );
};

export default Banner;
