import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function View() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "bg-green-400";
      case "rented":
        return "bg-yellow-500";
      default:
        return "bg-red-500";
    }
  };

  const allRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:7000/api/room/properties`
      );
      setRooms(response.data.response || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allRooms();
  }, []);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {rooms.map((data, key) => (
        <div
          key={key}
          onClick={() => navigate(`/property/${data?._id}`)}
          className="h-[400px] w-[300px] cursor-pointer border-2 border-red-700 p-3 rounded shadow-md bg-white "
        >
          <div className="w-full h-[200px] overflow-hidden">
            <img
              src={data.image || "https://via.placeholder.com/300"}
              alt={data.title}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="mt-4">
            <h2 className="font-bold text-xl">{data.title}</h2>
            <p className="text-sm text-gray-600">
              {data.description?.length > 50
                ? data.description.substring(0, 50) + "..."
                : data.description}
            </p>
            <p className="text-2xl text-gray-500 font-bold ">
              Location : {data.state}
            </p>
            <div className="flex mt-4 gap-3 ">
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full text-white ${getStatusColor(
                  data.status
                )}`}
              >
                {data.status}
              </span>
              <span className="text-2xl text-gray-600 font-bold ">
                SqFt :{data.sqFt}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default View;
