import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Owner({ id }) {
    const navigate = useNavigate();
    const [owner, setOwner] = useState([]);
    const fetchOwner = async() =>{
        try {
            const response = await axios.get(`http://localhost:7000/api/auth/user/${id}`);
            setOwner(response.data.response || [])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        fetchOwner();
    },[])

  return (
    <div>
        <div>
            <p className="text-3xl font-bold " >Owner</p>
            <p className="text-2xl font-bold text-gray-600 " >{owner.name} </p>
            <p className="text-[20px] text-gray-800" >{owner.email} </p>
            <p className="text-[20px] text-gray-800">{owner.phone} </p>
        </div>
        <button onClick={()=>navigate(`/contact/${id}`)} className="text-gray-800 text-2xl border-2 px-2 cursor-pointer hover:bg-gray-300 rounded" >Message </button>
    </div>
  )
}

export default Owner