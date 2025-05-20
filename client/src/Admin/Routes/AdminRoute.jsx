import { Route, Routes } from "react-router-dom";
import AdminHome from '../Components/AdminHome';
import Message from "../Components/Message";
import Navbar from "../Components/Navbar";
import Notification from "../Components/Notification";
import PostRoom from "../Components/PostRoom";
import AdminProfile from "../Components/Profile";
import Request from "../Components/Request";

function AdminRoute() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/admin" element={<AdminHome/>}/>
      <Route path="/profile" element={<AdminProfile/>}/>
      <Route path="/postRoom" element={<PostRoom/>}/>
      <Route path="/message" element={<Message/>}/>
      <Route path="/request" element={<Request/>}/>
      <Route path="/notification" element={<Notification/>}/>
    </Routes>
    </>
  )
}

export default AdminRoute