import React from 'react'
import NavBar from '../../Common/navBar'
import BasicTable from './table'
import Sidebar from './sideBar'


function UserManagement() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
        <NavBar />
        <div className="flex flex-1 w-full">
            <Sidebar /> {/* Add the Sidebar component here */}
        <div className='flex justify-center items-center w-full p-28'>
            <BasicTable />
        </div>
        </div>
    </div>
  )
}

export default UserManagement