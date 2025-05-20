import { useNavigate } from "react-router-dom";

function AdminHome() {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-700 h-screen flex justify-center items-center ">
      <div className="flex justify-center items-center flex-col gap-3.5 ">
        <p className="text-6xl text-white font-extrabold  ">
          Welcome To FIND PROPERTY
        </p>
        <p className="text-4xl text-white font-extrabold  ">
          PUT YOUR PROPERTY
        </p>
        <button
          onClick={() => navigate("/admin/postRoom")}
          className="h-fit w-fit px-3.5 py-1 rounded text-3xl font-bold cursor-pointer text-white hover:bg-gray-500 border-2 "
        >
          PUT
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
