import React, { useEffect, useRef } from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';

const SpecialComponent = () => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    console.log(container)
  
    const cloneItems = () => {
      const items = container.querySelectorAll('.duplicate-item');
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      });
    };

    cloneItems();

  
    let scrollInterval;
    const startScroll = () => {
      scrollInterval = setInterval(() => {
        container.scrollLeft += 1;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0; 
        }
      }, 20); 
    };

    startScroll();


    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-600" id="speciality">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>
      <p className="sm:w-2/3 w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors, schedule your appointment
        hassle-free.
      </p>
      <div ref={scrollContainerRef} className="flex sm:justify-start gap-2 pt-5 w-full overflow-x-hidden whitespace-nowrap">
        {specialityData.map((item, index) => (
          <Link onClick={()=>scrollTo(0,0)} key={index} to={`/doctors/${item.speciality}`} className="duplicate-item flex-shrink-0 w-40 flex flex-col items-center text-center" >
            <img
              className="w-24 h-24 object-cover rounded-full hover:translate-y-[-10px] transition-all duration-500"
              src={item.image}
              alt={item.speciality}
            />
            <p className="mt-2 text-sm font-medium">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SpecialComponent;
