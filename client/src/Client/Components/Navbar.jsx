import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="bg-gray-900 w-screen h-[50px] sm:h-[50px] md:h-[70px] lg:h-[100px] flex items-center justify-between p-[10px] sm:p-[20px] md:p-[50px] lg:p-[60px] " >
        <div>
            <Link to='/'><p className="text-white text-[18px] sm:text-2xl md:text-3xl lg:text-5xl font-bold " >FIND PROPERTY</p></Link>
        </div>
        <div className="flex w-fit gap-[10px] sm:gap-[10px] md:gap-[30px] lg:gap-[50px] text-2xl sm:text-[16px] md:text-2xl lg:text-4xl items-center text-white " >
            <Link to="/view" className="hover:text-blue-400 active:text-blue-800 " >View</Link>
            <Link to="/contact" className="hover:text-blue-400 active:text-blue-800">Contact</Link>
            <Link to="/profile" className="hover:text-blue-400 active:text-blue-800"><FaRegUserCircle /></Link>
        </div>
    </div>
  )
}

export default Navbar