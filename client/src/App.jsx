import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import UploadResume from './components/UploadResume';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
function App() {

  return (
    <div className="w-full min-h-screen bg-transparent">
     <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path='/upload'
          element={
            <PrivateRoute>
              <UploadResume/>
            </PrivateRoute>
          }
         />
         <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile/>
            </PrivateRoute>
          }
         />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
