import React from 'react'
import Header from './components/Header'
import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import CardDetails from './components/CardDetails';
import { Toaster } from 'react-hot-toast';
import Success from './components/Success';
import Cancel from './components/Cancel';


const App = () => {
  return (
    <div>
      <Header />
       <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cart' element={<CardDetails />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
       </Routes>
      <Toaster />
    </div>
  )
}

export default App
