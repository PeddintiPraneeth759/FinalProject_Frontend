import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const DoctorAppointment = ({ doctorId }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:2006/api/appointments"
      );
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const handlePayment = async (amount, doctorName) => {
    try {
      const response = await axios.post(
        "http://localhost:2006/api/payment/create-order",
        null,
        {
          params: { amount },
        }
      );

      const orderData = response.data;

      const options = {
        key: "RAZORPAY_KEY_ID", // Replace with your Razorpay Key ID
        amount: orderData.amount,
        currency: orderData.currency,
        name: "HealthCare System",
        description: `Appointment with Dr. ${doctorName}`,
        order_id: orderData.id,
        handler: function (response) {
          alert("Payment successful!");
          console.log(response);
        },
        prefill: {
          name: "Praneeth",
          email: "praneeth@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#0f172a",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error in payment:", error);
      alert("Payment failed");
    }
  };


  const handleCancel = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to cancel this appointment?"
    );
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:2006/api/appointments/${id}`);
      // filter out the cancelled appointment
      setAppointments((prev) => prev.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  return (
    <div>
      <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">
        My appointments
      </p>
      <div>
        {appointments.map((item, index) => {
          const fullDate = new Date(item.slotDateTime);
          const formattedDate = fullDate.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });

          return (
            <div
              className="grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b"
              key={index}
            >

              <div className="flex-1 text-sm text-zinc-600">
                <p className="text-neutral-800 font-semibold">
                  {item.doctorName}
                </p>
                <p>{item.speciality}</p>
                <p className="text-zinc-700 font-medium mt-1">Date & Time:</p>
                <p className="text-xs">
                  <span className="text-sm text-neutral-700 font-medium">
                    {formattedDate} | {item.slotTime}
                  </span>
                </p>
              </div>

              <div className="flex flex-col gap-2 justify-end">
                <button
                  onClick={() => handleCancel(item.id)}
                  className="text-sm text-stone-500 text-center sm:min-w-48 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  Cancel appointment
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DoctorAppointment;