import { Route, Routes } from "react-router-dom";
import ClientHome from '../Components/ClientHome';
import Contact from '../Components/Contact';
import Navbar from "../Components/Navbar";
import Profile from '../Components/Profile';
import Property from '../Components/Property';
import View from '../Components/View';

function ClientRoute() {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path="/" element={<ClientHome/>}/>
      <Route path="/contact/:id" element={<Contact/>}/>
      <Route path="/view" element={<View/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/property/:id" element={<Property/>}/>
    </Routes>
    </>
  )
}

export default ClientRoute