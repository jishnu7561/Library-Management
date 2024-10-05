import React, { useState } from "react";
import { toast } from "sonner";
import request, { setAuthToken } from "../../APIs/userApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { initiateLogin, loginFailed, loginSuccessful } from "../../Redux/Slice/userSlice";

const Login = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {isLoading} = useSelector((state)=> state.user)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const validateForm = () => {

    if (!email.trim() || !password.trim()){
      toast.error('All fields must be filled')
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        // setError('Invalid email address')
        toast.error('Invalid email address')
      return false;
    }
  
    if (password.length < 4) {
        // setError('Password must be at least 4 characters')
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
    dispatch(initiateLogin())
    try {
      const response = await request("POST", "/api/auth/authenticate", {
        email: email,
        password: password,
      });
      console.log("login response : "+response.data);
      if (response.data.jwtToken) {
        toast.success("successfully logined")
        console.log("Login successful");
        dispatch(loginSuccessful(response.data.user))
        setAuthToken(response.data.jwtToken)
        response.data.user.role === 'ADMIN' ? navigate("/admin/user-management") : navigate("/");
      } else {
        dispatch(loginFailed(response.data.message))
        toast.error(response.data.message)
        setEmail("")
        setPassword("")
      }
    } catch (error) {
      toast.error(error.message)
      setEmail("")
      setPassword("")
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-200">
    <div className="w-10/12 md:w-8/12 lg:w-8/12 min-h-[200px] mx-auto my-10 bg-white flex shadow-2xl rounded-3xl">
      
      {/* Left side image */}
      <div className="w-1/2 hidden md:flex justify-center items-center bg-gray-100">
        <img src="./login.svg" alt="Login" className="w-10/12 h-auto" />
      </div>

      {/* Right side login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center  bg-white p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
          <form onSubmit={submitHandler}>
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

            <div className="flex items-center justify-end mb-4">
              <a href="#" className="text-sm text-indigo-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold text-base py-3 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
            >
             {isLoading ? (
                <img
                  src="./loader.svg" 
                  alt="Loading..."
                  className="w-5 h-5 mx-auto" 
                  />
              ) : (
              <span>LOGIN</span>
                )}
            </button>
          </form>
          <div className="flex gap-2 py-4">
            <p className="text-gray-400 text-sm font-medium">Doesn't have an account yet?</p>
            <p className="text-indigo-600 text-sm font-extrabold cursor-pointer" onClick={()=>navigate("/signup")}>Sign Up</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
