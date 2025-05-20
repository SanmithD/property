import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-900 h-[50px] sm:h-[50px] md:h-[70px] lg:h-[100px] flex items-center justify-between p-[10px] sm:p-[20px] md:p-[50px] lg:p-[60px] " >
        <div>
            <Link to='/admin'><p className="text-white text-[18px] sm:text-2xl md:text-3xl lg:text-5xl font-bold " >ADMIN</p></Link>
        </div>
        <div className="flex w-fit gap-[10px] sm:gap-[10px] md:gap-[30px] lg:gap-[50px] text-2xl sm:text-[16px] md:text-2xl lg:text-4xl items-center text-white " >
            <Link to="/admin/postRoom" className="hover:text-blue-400 active:text-blue-800 " >Add Room</Link>
            <Link to="/admin/message" className="hover:text-blue-400 active:text-blue-800">Message</Link>
            <Link to="/admin/request" className="hover:text-blue-400 active:text-blue-800">Request</Link>
            <Link to="/admin/notification" className="hover:text-blue-400 active:text-blue-800">Notification</Link>
            <Link to="/admin/profile" className="hover:text-blue-400 active:text-blue-800"><FaRegUserCircle /></Link>
        </div>
    </div>
  )
}

export default Navbar