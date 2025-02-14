import React, { useContext, useState } from 'react'
import loginIcons from "../assest/login.gif"
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';
import { MdEmail } from "react-icons/md";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa6";
const Login = () => {
    const [showPassword,setShowPassword] = useState(false)
    const [data,setData] = useState({
        email : "",
        password : ""
    })

    const navigate = useNavigate()
    const { fetchUserDetails, fetchUserAddToCart } = useContext(Context)
    const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }
    const handleSubmit = async(e) =>{
        e.preventDefault()

        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }

    }

    console.log("data login",data)
  return (
    <section id='login'>
     <div className='mx-auto container p-4'>
        
        <div className='bg-white p-5 w-full max-w-sm mx-auto'>
        <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icons'/>
                    </div>

                <h2 className="text-2xl font-semibold text-center text-gray-700 mt-4">Welcome Back</h2>
                <p className="text-sm text-gray-500 text-center">Sign in to continue</p>

                <form className="mt-6 space-y-4" onSubmit={handleSubmit}>

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
    <Link to={'/forgot-password'} className="text-sm text-blue-500 hover:underline mt-2 inline-block">
        Forgot password?
    </Link>
</div>

{/* Login Button */}
<button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md transition font-medium">
    Login
</button>
</form>
<p className="text-center text-gray-600 text-sm mt-4">
                    Don't have an account? 
                    <Link to={"/sign-up"} className="text-blue-500 hover:underline ml-1">
                        Sign up
                    </Link>
                </p>
        </div>
     </div>

    </section>
  )
}

export default Login