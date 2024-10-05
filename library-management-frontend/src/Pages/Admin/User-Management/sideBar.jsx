import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../../Redux/Slice/userSlice';
import { toast } from 'sonner';

function Sidebar() {
//   const navigate = useNavigate();
  const {pathname} = useLocation()
  const dispatch = useDispatch();
 const count = 0;
 const logoutHandle =()=>{
    dispatch(logout())
    toast.success("logout ..")
 }

  return (
    <div className="w-64 h-screen bg-white text-black top-18  flex flex-col fixed">
      <nav className="flex flex-col content-between mx-10 pt-36 ">
        <ul className='flex flex-col gap-8 font-sans  text-black'>
            <NavLink to={"/admin/users-management"}>
            <li className={`py-2 group rounded-md hover:bg-indigo-500 flex md:justify-center lg:justify-start items-center ${pathname === '/admin/users-management' ? 'bg-indigo-500' : ''} cursor-pointer`}>
                <i className={`fa-regular fa-house px-5 group-hover:text-white ${pathname === '/admin/users-management' ? 'text-white' : 'text-indigo-500'} `}></i>
                <p className="md:hidden lg:block">Users</p>
            </li>
            </NavLink>
            <NavLink to={"/admin/books-management"}>
            <li className={`py-2 group rounded-md hover:bg-indigo-500 flex md:justify-center lg:justify-start items-center ${pathname === '/admin/books-management' ? 'bg-indigo-500' : ''} cursor-pointer`}>
                <i className={`fa-regular fa-house px-5 group-hover:text-white ${pathname === '/admin/books-management' ? 'text-white' : 'text-indigo-500'} `}></i>
                <p className="md:hidden lg:block">Books</p>
            </li>
            </NavLink>
            {/* <NavLink to={"/admin/users-management"}>
            <li className={`py-2 group rounded-md hover:bg-indigo-500 flex md:justify-center lg:justify-start items-center ${pathname === '/admin/users-management' ? 'bg-indigo-500' : ''} cursor-pointer`}>
                <i className={`fa-regular fa-house px-5 group-hover:text-white ${pathname === '/admin/users-management' ? 'text-white' : 'text-indigo-500'} `}></i>
                <p className="md:hidden lg:block">User Management</p>
            </li>
            </NavLink> */}
            <NavLink to={"/login"} onClick={logoutHandle}>
            <li className='py-2 mt-4 cursor-pointer text-sm'>
                <i className="fa-regular fa-right-from-bracket text-red-600 px-5"></i>Logout</li>
            </NavLink>
            </ul>
        </nav>
    </div>
  );
}

export default Sidebar;
