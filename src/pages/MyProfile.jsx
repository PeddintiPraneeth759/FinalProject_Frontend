import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL =
  "https://finalprojectbackend-production-bb71.up.railway.app/api/users";

const ProfileManager = () => {
  // State for form data and UI mode
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "Male",
    dob: "",
    address: { line1: "", line2: "" },
  });
  const [mode, setMode] = useState("loading"); // 'loading', 'create', 'view', or 'edit'
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Check for existing profile on component mount
  useEffect(() => {
    const checkExistingProfile = async () => {
      try {
        // Get the most recently added profile
        const response = await axios.get(API_BASE_URL);
        const users = response.data;

        if (users && users.length > 0) {
          // Get the last user (most recently added)
          const lastUser = users[users.length - 1];
          setFormData({
            ...lastUser,
            address: lastUser.address || { line1: "", line2: "" },
          });
          setUserId(lastUser.id);
          setMode("view");
        } else {
          setMode("create");
        }
      } catch (error) {
        console.error("Error checking for profile:", error);
        setError("Failed to check for existing profile");
        setMode("create"); // Fallback to create mode
      }
    };

    checkExistingProfile();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle address field changes
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  // Submit handler for both create and update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "create") {
        // Create new profile
        const response = await axios.post(API_BASE_URL, formData);
        setUserId(response.data.id);
        toast.success("Profile created successfully!");
        setMode("view");
      } else if (mode === "edit") {
        // Update existing profile
        await axios.put(`${API_BASE_URL}/${userId}`, formData);
        toast.success("Profile updated successfully!");
        setMode("view");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setError(error.response?.data?.message || "Operation failed");
      toast.error("Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  // Reset form for new creation
  const handleCreateNew = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      gender: "Male",
      dob: "",
      address: { line1: "", line2: "" },
    });
    setUserId(null);
    setMode("create");
  };

  if (mode === "loading") {
    return (
      <div className="max-w-md mx-auto p-6 text-center">
        <p>Checking for existing profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-50 rounded-lg shadow-md">
      <h2 className="text-2xl text-primary font-bold mb-6 text-center">
        {mode === "create"
          ? "Create Profile"
          : mode === "edit"
          ? "Edit Profile"
          : "Your Profile"}
      </h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {mode === "view" ? (
        // VIEW MODE - Show existing profile
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-xl">{formData.name}</h3>
            <p className="text-gray-600">{formData.email}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className=" font-medium">Phone:</p>
              <p className="text-gray-500">
                {formData.phone || "Not provided"}
              </p>
            </div>
            <div>
              <p className=" font-medium">Gender:</p>
              <p className="text-gray-500">{formData.gender}</p>
            </div>
            <div>
              <p className=" font-medium">Date of Birth:</p>
              <p className="text-gray-500">{formData.dob || "Not provided"}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className=" font-medium">Address:</p>
            <p className="text-gray-500">
              {formData.address.line1 || "Not provided"}
              {formData.address.line2 && (
                <>
                  <br />
                  {formData.address.line2}
                </>
              )}
            </p>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => setMode("edit")}
              className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
            <button
              onClick={handleCreateNew}
              className="flex-1 bg-slate-50 text-black  border-primary border-[1.5px] p-2 rounded hover:bg-primary hover:text-white"
            >
              Create New Profile
            </button>
          </div>
        </div>
      ) : (
        // CREATE/EDIT MODE
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Full Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address Line 1</label>
            <input
              type="text"
              name="line1"
              value={formData.address.line1}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address Line 2</label>
            <input
              type="text"
              name="line2"
              value={formData.address.line2}
              onChange={handleAddressChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-gray-700">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          >
            {loading
              ? "Saving..."
              : mode === "create"
              ? "Create Profile"
              : "Save Changes"}
          </button>

          {mode === "edit" && (
            <button
              type="button"
              onClick={() => setMode("view")}
              className="w-full mt-2 bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </form>
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default ProfileManager;
