import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import './App.css'
import Home from './components/Home';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {

  return (
    <div>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  )
}

export default App
