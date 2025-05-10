import React from 'react'
import { assets } from '../assets/assets'
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          CONTACT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:w-[360px]"
          src={assets.contact_image}
          alt=""
        />
        <div className="flex  flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 ">
          <p className="text-gray-600 font-bold text-2xl">OUR OFFICE</p>
          <p>
            {" "}
            Near bridge at bank <br /> location: Ravulapalem{" "}
          </p>
          <p> Email: HealthCareHospital05@gmail.com </p>

          <p>Learn more about our teams and job openings.</p>
        </div>
      </div>
      <div className="my-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30610.990642178585!2d80.6215802!3d16.456598049999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35f0a2a7d81943%3A0x8ba5d78f65df94b8!2sKL%20University!5e0!3m2!1sen!2sin!4v1746891441999!5m2!1sen!2sin"
          width="600"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

export default Contact
