import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import './index.css'
import App from './App.jsx'
import Home from './components/Home.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    {/* <Routes>
      <Route path="/" element={<App />} />
      <Route path='/home' element={<Home/>}/>
    </Routes> */}
    <App/>

    </BrowserRouter>
  </StrictMode>,
)
