import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import OwnerProp from "./OwnerProp";

function Profile() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const userProfile = async() =>{
    try {
      const response = await axios.get(`http://localhost:7000/api/auth/profile`,{
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setData(response.data.user || []);
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogout = () =>{
    let status = window.confirm("Confirm Logout ?");
    if(status){
      localStorage.removeItem('token');
      navigate('/login');
    }
  }

  useEffect(()=>{
    userProfile();
  },[]);

  return (
    <>
    <div className="flex" >
      <div className="h-screen w-[50%] bg-gray-800 flex flex-col justify-center items-center gap-1 md:gap-7 lg:gap-[40px] " >
      <h1 className="text-[20px] md:text-4xl lg:text-5xl text-white font-bold font-sans -mt-[200px] " >Profile</h1>
        <div className="flex flex-col gap-1 md:gap-[30px] lg:gap-[50px] " >
          <div className="flex flex-col justify-center items-center gap-1 mb-3" >
            <p className="text-2xl md:text-7xl lg:text-9xl hover:text-gray-900 " ><FaRegUserCircle /></p>
            <p className="text-[20px] md:text-4xl lg:text-5xl text-white font-sans " >{data.name} </p>
          </div>
          <div className="flex flex-col gap-1 md:gap-3 lg:gap-4 text-[16px] md:text-2xl lg:text-2xl text-gray-400" >
            <p>Email : {data.email} </p>
            <p>Phone Number : {data.phone} </p>
            <p>Account created :{data.createdAt} </p>
          </div>
        </div>
        <button onClick={handleLogout} className="h-fit w-fit p-2 border-2 border-red-500 bg-red-400 hover:bg-red-700 cursor-pointer rounded-2xl text-2xl md:text-3xl lg:text-4xl font-bold text-white " >Logout</button>
      </div>
      <div>
        <OwnerProp/>
      </div>
    </div>
    </>
  )
}

export default Profile