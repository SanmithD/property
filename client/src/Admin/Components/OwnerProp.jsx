import axios from "axios";
import { useEffect, useState } from "react";

function OwnerProp() {
  const [availableProps, setAvailableProps] = useState([]);
  const [bookedProps, setBookedProps] = useState([]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(`http://localhost:7000/api/auth/owner`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = response.data;
      setAvailableProps(data.availableProps || []);
      setBookedProps(data.properties || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div className="">
      <h2 className="text-3xl font-bold">All Rooms</h2>
      <div className="p-2 grid grid-cols-2 gap-2 ">
        {availableProps.length === 0 ? (
          <p>No available rooms found.</p>
        ) : (
          availableProps.map((room) => (
            <div key={room._id} className="border-2 ">
              <h3 className="text-2xl font-bold">{room.title}</h3>
              <p>
                <strong>Price:</strong> ₹{room.price.toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {room.street}, {room.city},{" "}
                {room.state}
              </p>
              <p>
                <strong>Status:</strong> {room.status}
              </p>
              {room.image && room.image.length > 0 && (
                <img
                  src={room.image[0]}
                  alt="Available Room"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    marginTop: "1rem",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>

      <h2 className="text-3xl font-bold">Booked Rooms</h2>
      <div className="grid grid-cols-2 p-2">
        {bookedProps.length === 0 ? (
          <p>No booked rooms found.</p>
        ) : (
          bookedProps.map((booking) => (
            <div key={booking._id} className="p-2 border-2">
              <h3 className="text-2xl font-bold">{booking.property?.title}</h3>
              <p>
                <strong>Price:</strong> ₹
                {booking.property?.price.toLocaleString()}
              </p>
              <p>
                <strong>Location:</strong> {booking.property?.street},{" "}
                {booking.property?.city}, {booking.property?.state}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>
              <div>
                <strong>Booked By:</strong>
                <p>Name: {booking.customer?.name}</p>
                <p>Email: {booking.customer?.email}</p>
                <p>Phone: {booking.customer?.phone}</p>
              </div>

              {booking.property?.image && booking.property.image.length > 0 && (
                <img
                  src={booking.property.image[0]}
                  alt="Booked Room"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    marginTop: "1rem",
                  }}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default OwnerProp;
