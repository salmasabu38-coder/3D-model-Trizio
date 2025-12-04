import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Dashboard from './Dashboard'
import Navbar from './Navbar'
import Display from './Display'
import Register from './Register'
import Login from './Login'
import LandingPage from './LandingPage'
import HomePage from './Homepage'
import ModelPage from './ModelPage'
import MyUploads from './MyUploads'
import Footer from './Footer'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/upload" element={<Dashboard/>}/>
        <Route path="/navbar" element={<Navbar/>}/>
        <Route path="/display" element={<Display/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/model/:id" element={<ModelPage/>} />
        <Route path="/myuploads" element={<MyUploads/>} />
        <Route path="/footer" element={<Footer/>}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
