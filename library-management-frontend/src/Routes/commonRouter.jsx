import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Pages/Common/login'
import Signup from '../Pages/Common/signup'
import UserProtect from '../Pages/Common/userProtect'
import NotFound from '../Pages/notFound'
import Home from '../Pages/User/Home/home'
import BooksExplore from '../Pages/User/Books/booksExplore'
import Profile from '../Pages/User/Profile/profile'
import BorrowedBooks from '../Pages/User/BorrowedBooks/borrowedBooks'

function CommonRouter() {
  return (
    <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route element={<UserProtect />} >
            <Route path='/' element={<Home />} />
            <Route path='/books' element={<BooksExplore />} />
            <Route path='/borrowed-books' element={<BorrowedBooks />} />
            <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/*' element={<NotFound />}  />
    </Routes>
  )
}

export default CommonRouter