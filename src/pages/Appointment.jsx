import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currency_symbol, isLoggedIn } = useContext(AppContext);
  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THR", "FIR", "SAT"];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const fetchDocInfo = async () => {
    if (Array.isArray(doctors)) {
      const docInfo = doctors.find((doc) => doc._id === docId);
      setDocInfo(docInfo);
      console.log(docInfo);
    }
  };

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (i === 0) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(currentDate),
          time: formattedTime,
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      slots.push(timeSlots);
    }

    setDocSlots(slots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  const handleAppointmentBooking = async () => {
    if (!docInfo || !slotTime || !docSlots[slotIndex]?.[0]) {
      alert("Please select a valid slot and time");
      return;
    }

    const selectedDateTime = docSlots[slotIndex][0].dateTime;

    const appointmentData = {
      doctorId: docInfo._id,
      doctorName: docInfo.name,
      speciality: docInfo.speciality,
      slotTime: slotTime,
      slotDateTime: selectedDateTime,
    };

    try {
      if(isLoggedIn){
      const response = await axios.post(
        "https://finalprojectbackend-production-bb71.up.railway.app/api/appointments/book",
        appointmentData
      );
   
      console.log("Appointment booked:", response.data);
      toast.success("Appointment booked successfully!");

    }else{
      toast.error("Please Login First!")
    }
    
     
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert("Something went wrong while booking.");
    }
  };

  return (
    <div>
      <ToastContainer/>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="sm:max-w-72 w-full">
          <img
            className="bg-primary w-full rounded-lg"
            src={docInfo?.image}
            alt=""
          />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white sm:mx-0 sm:mt-0">
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo?.name}
            <img src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1">
            <p>
              {docInfo?.degree} - {docInfo?.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">
              {docInfo?.experience}
            </button>
          </div>

          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700px] mt-1">
              {docInfo?.about}
            </p>
          </div>

          <p className="text-gray-500 font-medium mt-4">
            Appointment fee:{" "}
            <span className="text-gray-600">
              {currency_symbol} {docInfo?.fees}
            </span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className="sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700">
        <p>Booking Slots</p>
        <div className="flex gap-3 items-center w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots.map((item, index) => (
              <div
                onClick={() => setSlotIndex(index)}
                className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                  slotIndex === index
                    ? "bg-primary text-white"
                    : "border border-gray-200"
                }`}
                key={index}
              >
                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>
              </div>
            ))}
        </div>

        <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4">
          {docSlots.length > 0 &&
            docSlots[slotIndex].map((item, index) => (
              <p
                onClick={() => setSlotTime(item.time)}
                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${
                  item.time === slotTime
                    ? "bg-primary text-white"
                    : "text-gray-400 border border-gray-300"
                }`}
                key={index}
              >
                {item.time.toLowerCase()}
              </p>
            ))}
        </div>

        <button
          onClick={handleAppointmentBooking}
          className="bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6"
        >
          Book an appointment
        </button>
      </div>

      {/* Related doctors */}
      {docInfo && (
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      )}
    </div>
  );
};

export default Appointment;
