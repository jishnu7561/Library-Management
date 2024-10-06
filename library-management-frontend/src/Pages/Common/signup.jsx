import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import request from '../../APIs/userApi'

function Signup() {

  const navigate = useNavigate()
  const {isLoading} = useSelector((state)=> state.user)

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const validateForm = () => {

    if (!email.trim() || !password.trim() || !number.trim() || !name.trim()){
      toast.error('All fields must be filled')
      return false;
    }

    if (name.length < 4 || !/^[a-zA-Z]+$/.test(name)) {
      toast.error('Name must be at least 4 characters long and contain only letters');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast.error('Invalid email address')
      return false;
    }

    if (number.length != 10) {
      toast.error('Invalid mobile number')
      return false;
    }
  
    if (password.length < 4) {
        toast.error('Password must be at least 4 characters')
      return false;
    }
    return true;
  };


  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    try {
      const response = await request("POST", "/api/auth/register", {
        name,
        email,
        number,
        password,
      });
      console.log("login response : "+response.data);
      if (response.data.status == 200) {
        toast.success("Account created successfully")
        console.log("Account created successfully");
        navigate("/login");
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
    <div className="w-10/12 md:w-8/12 lg:w-8/12 min-h-[200px] mx-auto my-10 bg-white flex shadow-2xl rounded-3xl">
      
      {/* Left side image */}
      <div className="w-1/2 hidden md:flex justify-center items-center bg-gray-100">
        <img src="./signup.svg" alt="Login" className="w-10/12 h-auto" />
      </div>

      {/* Right side login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center  bg-white p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Singup</h2>
          <form onSubmit={submitHandler}>
          <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                type="test"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Enter name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="your@example.com"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="number"
              >
                Phone Number
              </label>
              <input
                id="number"
                type="text"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Enter number"
                value={number}
                onChange={(e)=>setNumber(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 text-sm border text-indigo-400 border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-500"
                placeholder="Enter 4 characters or more"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold text-base py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
             {isLoading ? (
                <img
                  src="./loader.svg" // Replace with your loading image path
                  alt="Loading..."
                  className="w-5 h-5 mx-auto" // Adjust image size and position as needed
                  />
              ) : (
              <span>SINGUP</span>
                )}
            </button>
          </form>
          <div className="flex gap-2 py-4">
            <p className="text-gray-400 text-sm font-medium">Already have an account?</p>
            <p className="text-indigo-600 text-sm font-extrabold cursor-pointer" onClick={()=>navigate("/login")}>Log in</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Signup