import React, { useState } from 'react'
import axios from "axios";
import SummaryApi from '../common/index';
import { useNavigate } from "react-router-dom";
import loginIcons from "../assest/signin.gif"
import { Link } from 'react-router-dom'
import { MdEmail } from "react-icons/md";
import { FaUser, FaKey, FaLock, FaEye, FaEyeSlash } from "react-icons/fa6";

import imageTobase64 from "../helpers/imageTobase64"
import { toast } from 'react-toastify';
const SignUp = () => {
   
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
    const navigate = useNavigate();

        const [data,setData] = useState({
            email : "",
            password : "",
            name: "",
            confirmPassword:"",
            profilePic: ""
        })
    
        const handleOnChange = (e) =>{
            const { name , value } = e.target
    
            setData((preve)=>{
                return{
                    ...preve,
                    [name] : value
                }
            })
        }

        const handleUploadPic =async(e) =>{
            const file = e.target.files[0]
    
            const imagePic = await imageTobase64(file)
            
            setData((preve)=>{
              return{
                ...preve,
                profilePic : imagePic
              }
            })
        }
    
        const handleSubmit = async(e) =>{
            e.preventDefault()
      
            if(data.password === data.confirmPassword){
      
              const dataResponse = await fetch(SummaryApi.signUP.url,{
                  method : SummaryApi.signUP.method,
                  headers : {
                      "content-type" : "application/json"
                  },
                  body : JSON.stringify(data)
                })
          
                const dataApi = await dataResponse.json()
      
                if(dataApi.success){
                 toast.success(dataApi.message)
                  navigate("/login")
                }
      
                if(dataApi.error){
                  toast.error(dataApi.message)
                }
          
            }else{
              toast.error("Please check password and confirm password")
            }
      
        }
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
   
        {/* Profile Picture Upload */}
        <div className="w-24 h-24 mx-auto relative rounded-full border-2 border-gray-300 overflow-hidden">
            <img src={data.profilePic || loginIcons} alt="Profile" className="w-full h-full object-cover" />
            <label className="absolute bottom-0 bg-black bg-opacity-60 text-white text-xs text-center w-full py-2 cursor-pointer">
                Upload Photo
                <input type="file" className="hidden" onChange={handleUploadPic} />
            </label>
        </div>

        {/* Form Heading */}
        <h2 className="text-2xl font-semibold text-center text-gray-700 mt-4">Create an Account</h2>
        <p className="text-sm text-gray-500 text-center">Join us today</p>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

            {/* Name Field */}
            <div>
                <label className="block text-gray-600 text-sm font-medium flex items-center gap-2">
                    <FaUser className="text-lg text-gray-500" />
                    Name
                </label>
                <div className="relative">
                    <input
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleOnChange}
                        required
                        placeholder="Enter your name"
                    />
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Email Field */}
            <div>
                <label className="block text-gray-600 text-sm font-medium flex items-center gap-2">
                    <MdEmail className="text-lg text-gray-500" />
                    Email
                </label>
                <div className="relative">
                    <input
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                        required
                        placeholder="Enter your email"
                    />
                    <MdEmail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            {/* Password Field */}
            <div>
                <label className="block text-gray-600 text-sm font-medium flex items-center gap-2">
                    <FaKey className="text-lg text-gray-500" />
                    Password
                </label>
                <div className="relative">
                    <input
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 pr-10"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                        required
                        placeholder="Enter your password"
                    />
                    <FaKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowPassword(prev => !prev)}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>

            {/* Confirm Password Field */}
            <div>
                <label className="block text-gray-600 text-sm font-medium flex items-center gap-2">
                    <FaLock className="text-lg text-gray-500" />
                    Confirm Password
                </label>
                <div className="relative">
                    <input
                        className="w-full p-3 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 pl-10 pr-10"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={data.confirmPassword}
                        onChange={handleOnChange}
                        required
                        placeholder="Confirm your password"
                    />
                    <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500" onClick={() => setShowConfirmPassword(prev => !prev)}>
                        {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                </div>
            </div>

            {/* Signup Button */}
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition font-medium">
                Signup
            </button>
        </form>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?
            <Link to={"/login"} className="text-blue-500 hover:underline ml-1">
                Login
            </Link>
        </p>
    </div>
</section>
  )
}

export default SignUp