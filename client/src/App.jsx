import { Route, Routes } from 'react-router-dom';
import AdminRoute from './Admin/Routes/AdminRoute';
import './App.css';
import Login from './Auth/Login';
import PageNot from './Auth/PageNot';
import Signup from './Auth/Signup';
import ClientRoute from './Client/Routes/ClientRoute';

function App() {

  return (
    <>
    <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/*' element={<ClientRoute/>}/>
      <Route path='/admin/*' element={<AdminRoute/>}/>
      <Route path='*' element={<PageNot/>}/>
    </Routes>
    </>
  )
}

export default App
