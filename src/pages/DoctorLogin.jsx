import React, { useContext, useState } from "react";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const DoctorLogin = () => {
  const { setIsLoggedIn, setUserRole } = useContext(AppContext); // Get context to manage login state
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${config.url}/doctor/login`, formData);

      if (response.status === 200) {
        setMessage("Doctor Login Successful");
        setIsLoggedIn(true); // Set user as logged in
        setUserRole('doctor'); // Set the user role as doctor
        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        // Redirect to the Doctor Home Page
        navigate("/doctor-home"); // Redirect to the new doctor home page
      } else {
        setMessage(response.data);
      }
    } catch (e) {
      if (e.response) {
        setError(e.response.data || "An error occurred.");
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <form className="min-h-[80vh] flex items-center" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg">
        <p className="text-2xl font-semibold">Admin Login</p>
        <p>Please log in to access the Admin dashboard</p>

        <div className="w-full">
          <p>Email</p>
          <input
            id="email"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="email"
            onChange={handleChange}
            value={formData.email}
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            id="password"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="password"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default DoctorLogin;