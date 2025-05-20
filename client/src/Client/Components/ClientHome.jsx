import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ClientHome() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <div className=" flex justify-center items-center bg-gray-800">
      <div className="h-screen w-[50%] flex flex-col justify-center items-center gap-5 " >
        <h1 className="text-2xl md:text-5xl lg:text-7xl text-white " >Welcome to</h1>
        <p className="text-2xl md:text-4xl lg:text-5xl text-white " >FIND PROPERTY</p>
        <div>
          <button onClick={() => navigate("/view")}
          className="h-[fit] text-red-800 bg-red-100 hover:bg-red-400 w-fit text-2xl md:text-4xl lg:text-5xl font-bold cursor-pointer px-3 py-2 rounded-2xl "
            >VIEW PROPERTIES</button>
        </div>
      </div>
    </div>
  );
}

export default ClientHome;
