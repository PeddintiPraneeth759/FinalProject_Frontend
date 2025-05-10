import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctor = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const [filterDoc, setFilterDoc] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [specialityFilter, setSpecialityFilter] = useState(speciality || "");

  useEffect(() => {
    applyFilter();
  }, [speciality, doctors, nameFilter, specialityFilter]);

  const applyFilter = () => {
    let filtered = doctors;

    if (specialityFilter) {
      filtered = filtered.filter((doc) =>
        doc.speciality.toLowerCase().includes(specialityFilter.toLowerCase())
      );
    }

    if (nameFilter) {
      filtered = filtered.filter((doc) =>
        doc.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    setFilterDoc(filtered);
  };

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  return (
    <div>
      <p className="text-gray-600">Search through the doctors specialist</p>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mt-4">
        <input
          type="text"
          placeholder="Search by doctor name"
          className="px-4 py-2 border border-gray-300 rounded"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />

        <input
          type="text"
          placeholder="Search by speciality"
          className="px-4 py-2 border border-gray-300 rounded"
          value={specialityFilter}
          onChange={(e) => setSpecialityFilter(e.target.value)}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Speciality Quick Filter */}
        <div className="flex flex-col gap-4 text-sm text-gray-600">
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() => {
                setSpecialityFilter(spec);
                navigate(`/doctors/${spec}`);
              }}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? "bg-indigo-400 text-white" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors List */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterDoc.length > 0 ? (
            filterDoc.map((item, index) => (
              <div
                key={index}
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img className="bg-blue-50" src={item.image} alt="" />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">
                    {item.name}
                  </p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              No doctors found matching your criteria.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
