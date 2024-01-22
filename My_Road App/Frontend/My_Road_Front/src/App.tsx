import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Accident from './Accident'
import Traffic from './Traffic'
import Navbar from './Navbar'
import RoadClosure  from './RoadClosure';
import Weather from './Weather';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className='move-right'>
        <Routes>
          <Route path='/accident' element={<Accident/>} />
          <Route path='/traffic' element={<Traffic/>} />
          <Route path='/roadclosure' element={<RoadClosure/>} />
          <Route path='/weather' element={<Weather/>} />
        </Routes>
        </div>
      </Router>
    </>
  );
}

export default App
