import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import config from "../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import { AppContext } from "../context/AppContext";

const Login = () => {
  const [state, setState] = useState("Login"); // Toggles between Login and Sign Up
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");

  // Function to generate a random 5-digit number
  const generateCaptcha = () => {
    const randomCaptcha = Math.floor(10000 + Math.random() * 90000).toString();
    setCaptcha(randomCaptcha);
  };

  useEffect(() => {
    generateCaptcha(); // Generate CAPTCHA on component mount
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Handle input changes for CAPTCHA
  const handleCaptchaChange = (e) => {
    setCaptchaInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setCaptchaError("");

    // Validate CAPTCHA
    if (captchaInput !== captcha) {
      setCaptchaError("Invalid CAPTCHA. Please try again.");
      generateCaptcha(); // Regenerate CAPTCHA on failure
      return;
    }

    try {
      const endpoint =
        state === "Login"
          ? `${config.url}/customer/checkcustomerlogin`
          : `${config.url}/customer/registration`;

      const response = await axios.post(endpoint, formData);

      if (response.status === 200) {
        setMessage(
          state === "Login" ? "Login Successful" : "Registration Successful"
        );
         if(state === "Login"){
          setIsLoggedIn(true);
         }
        toast.success(
          state === "Login" ? "Login Successful" : "Registration Successful",
          {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
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
        <p className="text-2xl font-semibold">
          {state === "Sign Up" ? "Create Account" : "Login"}
        </p>
        <p>
          Please {state === "Sign Up" ? "sign up" : "log in"} to book an
          appointment
        </p>

        {state === "Sign Up" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              id="name"
              className="border border-zinc-300 rounded w-full p-2 mt-1"
              type="text"
              onChange={handleChange}
              value={formData.name}
              required
            />
          </div>
        )}

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

        <div className="w-full">
          <p>CAPTCHA: {captcha}</p>
          <input
            id="captcha"
            className="border border-zinc-300 rounded w-full p-2 mt-1"
            type="text"
            onChange={handleCaptchaChange}
            value={captchaInput}
            required
          />
          {captchaError && <p className="text-red-500">{captchaError}</p>}
        </div>

        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}

        <button
          type="submit"
          className="bg-primary text-white w-full py-2 rounded-md text-base"
        >
          {state === "Sign Up" ? "Create Account" : "Login"}
        </button>

        {state === "Sign Up" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-primary underline cursor-pointer select-none"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-primary underline cursor-pointer select-none"
            >
              Click here
            </span>
          </p>
        )}
      </div>
      <ToastContainer />
    </form>
  );
};

export default Login;