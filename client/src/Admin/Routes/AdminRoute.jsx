import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import AdminHome from '../Components/AdminHome';
import AdminChat from "../Components/Messages";
import Navbar from "../Components/Navbar";
import Notification from "../Components/Notification";
import PostRoom from "../Components/PostRoom";
import AdminProfile from "../Components/Profile";
import Request from "../Components/Request";

function AdminRoute() {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if(!token && role == "admin" ){
      navigate('/login')
    }
  },[]);

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/profile" element={<AdminProfile/>}/>
      <Route path="/postRoom" element={<PostRoom/>}/>
      <Route path="/request" element={<Request/>}/>
      <Route path="/message" element={<AdminChat/>}/>
      <Route path="/notification" element={<Notification/>}/>
    </Routes>
    </>
  )
}

export default AdminRoute