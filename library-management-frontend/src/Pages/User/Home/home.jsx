import { AccountCircle } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import request, { setAuthToken } from '../../../APIs/userApi';
import NavBar from '../../Common/navBar';

const Home = () => {
  const navigate = useNavigate();

  // const handleSubmit =()=>{
  //   request("GET","/api/user/getAllUser",{})
  //     .then((response)=>{
  //       toast.success();
  //       console.log("response for apii: "+response)
  //     })
  //   }
  return (
    <div className="min-h-screen flex flex-col bg-gray-200">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center mt-32">
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 flex justify-center items-center mb-10 md:mb-0">
          <img src="./bookshelves.svg" alt="Reading" className="w-3/4 h-auto" />
        </div>

        {/* Right Side Text */}
        <div className="w-full md:w-1/2 flex flex-col items-center text-center md:text-left px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Library!</h2>
          <p className="text-gray-600 text-lg mb-6">
            Immerse yourself in the world of books. Explore a vast collection of literature and resources that will inspire and educate you.
          </p>
          <div className='flex gap-3'>
          <button
            className="bg-indigo-600 text-white font-bold text-lg py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            onClick={()=>navigate("/books")}
          >
            Explore Books
          </button>
          <button
            className="bg-indigo-900 text-white font-bold text-lg py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            onClick={() => navigate('/borrowed-books')}
          >
            Borrowed Books
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
