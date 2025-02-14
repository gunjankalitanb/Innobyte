import React, { useContext, useState } from 'react'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Login from '../pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import SummaryApi from '../common/index';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
import logo from "../assest/logo.png"
const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)


  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }

  }

  const handleSearch = (e)=>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }


  return (
    <header className="h-16 shadow-md bg-gradient-to-r from-blue-500 via-purple-700 to-pink-500 text-white z-50 relative">
    <div className="h-full container mx-auto flex items-center px-4 justify-between">
      
      {/* Logo */}
      <Link to={"/"}>
        <img src={logo} alt="Logo" className="w-24 h-auto opacity-100 brightness-125 contrast-125" />
      </Link>

      {/* Search Bar */}
      <div className="hidden lg:flex items-center w-full max-w-md border border-gray-300 rounded-full focus-within:shadow-md bg-white bg-opacity-30 backdrop-blur-md pl-3">
        <input 
          type="text" 
          placeholder="Search product here..." 
          className="w-full py-2 px-3 text-black placeholder-gray-500 outline-none bg-transparent"
          onChange={handleSearch} 
          value={search} 
        />
        <button className="text-lg w-12 h-10 bg-white flex items-center justify-center rounded-r-full hover:bg-gray-200 transition">
          <GrSearch className="text-gray-700" />
        </button>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-6">
        
        {/* Profile Section */}
        {user?._id && (
          <div className="relative">
            <div 
              className="text-3xl cursor-pointer flex items-center" 
              onClick={() => setMenuDisplay(prev => !prev)}
            >
              {user?.profilePic ? (
                <img src={user?.profilePic} className="w-10 h-10 rounded-full border border-white" alt={user?.name} />
              ) : (
                <FaRegCircleUser className="text-white hover:text-gray-300 transition" />
              )}
            </div>

            {/* Dropdown Menu */}
            {menuDisplay && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 border shadow-md rounded-lg p-2 z-50">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link 
                      to={"/admin-panel/all-products"} 
                      className="block px-4 py-2 hover:bg-gray-100 rounded"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>
        )}

        {/* Cart Icon */}
        {user?._id && (
          <Link to={"/cart"} className="relative text-2xl text-white hover:text-gray-300 transition">
            <FaShoppingCart />
            {context?.cartProductCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {context?.cartProductCount}
              </span>
            )}
          </Link>
        )}

        {/* Login / Logout Button */}
        <div>
          {user?._id ? (
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          ) : (
            <Link 
              to={"/login"} 
              className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition"
            >
              Login
            </Link>
          )}
        </div>

      </div>
    </div>
  </header>
  )
}

export default Header