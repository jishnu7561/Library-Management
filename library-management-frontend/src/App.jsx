import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CommonRouter from './Routes/commonRouter'
import AdminRouter from './Routes/adminRouter'
// import "./output.css"

function App() {

  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/*' element={<CommonRouter/>} />
          <Route path='/admin/*' element={<AdminRouter/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
