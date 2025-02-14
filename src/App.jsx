import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Events from './pages/Events'
import About from './pages/About'
import Tickets from './pages/Tickets'
import Attendee from './components/Attendee'

function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<Events/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/ticket' element={<Tickets/>}/>
      <Route path='/attendee' element={<Attendee/>}/>
     </Routes>
    </>
  )
}

export default App
