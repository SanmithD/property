import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Buy from "./Buy";
import Owner from "./Owner";

function Property() {
  let owner;
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  if (!token) {
    setError("Token not found. Please log in.");
    return;
  }
  const fetchProperty = async () => {
    try {

      const response = await axios.get(`http://localhost:7000/api/room/room/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      owner = response.data.response.owner;
      setProperty(response.data.response);
    } catch (err) {
      console.error("Error fetching property:", err);
      setError("Failed to load property details.");
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;
  if (!property) return <p className="text-center mt-10">Loading property details...</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{property.title}</h1>

      <img
        src={property.image || "https://via.placeholder.com/600x400"}
        alt={property.title}
        className="w-full h-[400px] object-cover rounded-xl mb-6 shadow"
      />

      <p className="text-gray-600 text-lg mb-6">{property.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-800 font-medium"> Location:</p>
          <p className="text-gray-600">{property.city}, {property.state}</p>
        </div>
        <div>
          <p className="text-gray-800 font-medium"> Price:</p>
          <p className="text-green-600 font-bold text-xl">${property.price}</p>
        </div>
        <div>
          <p className="text-gray-800 font-medium"> Square Feet:</p>
          <p className="text-gray-600">{property.sqFt} sq ft</p>
        </div>
        <div>
          <p className="text-gray-800 font-medium"> Bedrooms:</p>
          <p className="text-gray-600">{property.bedroom}</p>
        </div>
        <div>
          <p className="text-gray-800 font-medium"> Bathrooms:</p>
          <p className="text-gray-600">{property.bathroom}</p>
        </div>
        <div>
          <p className="text-gray-800 font-medium"> Status:</p>
          <span
            className={`inline-block px-3 py-1 rounded-full text-white font-semibold ${
              property.status === "available"
                ? "bg-green-500"
                : property.status === "rented"
                ? "bg-yellow-500"
                : "bg-gray-500"
            }`}
          >
            {property.status}
          </span>
        </div>
        <Buy id={property._id}/>
        <Owner id={owner}/>
      </div>
    </div>
  );
}

export default Property;
