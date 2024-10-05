import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserProtect from '../Pages/Common/userProtect'
import UserManagement from '../Pages/Admin/User-Management/userManagement'
import BooksManagement from '../Pages/Admin/Book-Management/booksManagement'
import NotFound from '../Pages/notFound'
import BorrowedHistory from '../Pages/Admin/User-Management/borrowedHistory'

function AdminRouter() {
  return (
    <Routes>
      <Route element={<UserProtect />} >
        <Route path='/users-management' element={<UserManagement />}/>
        <Route path='/books-management' element={<BooksManagement />} />
        <Route path='/borrowed-history/:userId' element={<BorrowedHistory />} />
      </Route>
      <Route path='/*' element={<NotFound />} />
    </Routes>
  )
}

export default AdminRouter