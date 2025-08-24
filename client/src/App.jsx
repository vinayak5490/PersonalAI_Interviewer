import { useState } from 'react'
import './App.css'
import HomePage from './components/Pages/HomePage'
import Navbar from './components/shared/Navbar'
import Footer from './components/shared/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <HomePage/>
      <Footer/>

    </>
  )
}

export default App
