import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Doctor from "./pages/Doctor";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./pages/MyProfile";
import MyAppointment from "./pages/MyAppointment";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DoctorLogin from "./pages/DoctorLogin";
import DoctorNavbar from "./components/DoctorNavbar"; // import DoctorNavbar
import { AppContext } from "./context/AppContext"; // import AppContext to check logged-in state
import DoctorHome from "./pages/DoctorHome"; // Add the DoctorHome page
import DoctorAppointment from "./pages/DoctorAppointment";

function App() {
  const { isLoggedIn, userRole } = useContext(AppContext); // Assuming the context holds isLoggedIn and userRole

  return (
    <div className="mx-4 sm:mx-[10%]">
      {/* Render the appropriate navbar */}
      {isLoggedIn && userRole === "doctor" ? <DoctorNavbar /> : <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctor />} />
        <Route path="/doctors/:speciality" element={<Doctor />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/my-appointment" element={<MyAppointment />} />
        <Route path="/appointments" element={<Appointment />} />
        <Route path="/appointment/:docId" element={<Appointment />} />

        {/* Routes for doctors (only visible if doctor is logged in) */}
        {isLoggedIn && userRole === "doctor" && (
          <>
            <Route path="/my-appointments" element={<DoctorAppointment />} />
            <Route path="/doctor-home" element={<DoctorHome />} />{" "}
            {/* Add doctor home page */}
          </>
        )}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
