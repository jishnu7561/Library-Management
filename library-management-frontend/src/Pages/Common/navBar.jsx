import React, { useDebugValue } from 'react'
import { useNavigate } from 'react-router-dom';
import { setAuthToken } from '../../APIs/userApi';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import CustomizedBreadcrumbs from './breadCrumbs';
import { logout } from '../../Redux/Slice/userSlice';

function NavBar() {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {loggedUser} = useSelector((state)=>state.user);
    const handleLogout = () => {
        setAuthToken(null);
        dispatch(logout())
        toast.success("logged-out successfully");
        navigate("/login",{replace:true})
      };

  return (
    <div className='w-full fixed top-0 z-10'>
    <nav className="w-full bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {loggedUser.role === "USER" ? (
          <h1 className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate("/")}>
            Library Management
          </h1>
        ) : (
          <h1 className="text-xl font-bold text-indigo-600 cursor-pointer" onClick={() => navigate("/admin/users-management")}>
            ADMIN - Library Management
          </h1>
        )}
        <div>
          <button className="text-indigo-600 hover:text-indigo-800 mr-4" onClick={() => navigate('/profile')}>
            Profile
          </button>
          <button className="text-indigo-600 hover:text-indigo-800" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
    {loggedUser.role === "USER" &&<div className='container mt-2 p-3'>
      <CustomizedBreadcrumbs />
    </div>}
  </div>
  )
}

export default NavBar