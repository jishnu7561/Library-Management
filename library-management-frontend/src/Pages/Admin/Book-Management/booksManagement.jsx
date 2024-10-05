import React from 'react'
import NavBar from '../../Common/navBar'
import Sidebar from '../User-Management/sideBar'
import BookTable from './booksTable'

function BooksManagement() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
        <NavBar />
        <div className="flex flex-1 w-full">
            <Sidebar /> {/* Add the Sidebar component here */}
        <div className='flex justify-center items-center w-full p-28'>
            <BookTable />
        </div>
        </div>
    </div>
  )
}

export default BooksManagement