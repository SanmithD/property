import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ user: {}, properties: [] });

  const userProfile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/auth/profile`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setProfile({
        user: response.data.user,
        properties: response.data.properties,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    let status = window.confirm("Confirm Logout ?");
    if (status) {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
    }
  };

  useEffect(() => {
    userProfile();
  }, []);

  return (
    <>
      <div className="flex">
        <div className="h-screen w-[50%] bg-gray-800 flex flex-col justify-center items-center gap-1 md:gap-7 lg:gap-[40px]">
          <h1 className="text-[20px] md:text-4xl lg:text-5xl text-white font-bold font-sans -mt-[200px]">
            Profile
          </h1>
          <div className="flex flex-col gap-1 md:gap-[30px] lg:gap-[50px]">
            <div className="flex flex-col justify-center items-center gap-1 mb-3">
              <p className="text-2xl md:text-7xl lg:text-9xl hover:text-gray-900">
                <FaRegUserCircle />
              </p>
              <p className="text-[20px] md:text-4xl lg:text-5xl text-white font-sans">
                {profile.user.name}
              </p>
            </div>
            <div className="flex flex-col gap-1 md:gap-3 lg:gap-4 text-[16px] md:text-2xl lg:text-2xl text-gray-400">
              <p>Email: {profile.user.email}</p>
              <p>Phone Number: {profile.user.phone}</p>
              <p>
                Account created:{" "}
                {new Date(profile.user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="h-fit w-fit p-2 border-2 border-red-500 bg-red-400 hover:bg-red-700 cursor-pointer rounded-2xl text-2xl md:text-3xl lg:text-4xl font-bold text-white"
          >
            Logout
          </button>
        </div>

        <div className="h-screen w-[50%] overflow-y-auto p-6 bg-gray-100">
          <h2 className="text-3xl font-bold mb-4">Properties</h2>
          {profile.properties.length === 0 ? (
            <p>No properties found.</p>
          ) : (
            profile.properties.map((item, index) => (
              <div
                key={index}
                className="border p-4 rounded-lg mb-4 shadow-md bg-white"
              >
                <h3 className="text-xl font-semibold">
                  {item.property?.title}
                </h3>
                <p>
                  <strong>City:</strong> {item.property?.city}
                </p>
                <p>
                  <strong>State:</strong> {item.property?.state}
                </p>
                <p>
                  <strong>Street:</strong> {item.property?.street}
                </p>
                <p>
                  <strong>Price:</strong> ₹{item.property?.price}
                </p>
                <p>
                  <strong>Bedrooms:</strong> {item.property?.bedroom}
                </p>
                <p>
                  <strong>Bathrooms:</strong> {item.property?.bathroom}
                </p>
                <p>
                  <strong>SqFt:</strong> {item.property?.sqFt}
                </p>
                <p>
                  <strong>Status:</strong> {item.status}
                </p>
                <p>
                  <strong>Purchased on:</strong>{" "}
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Profile;
