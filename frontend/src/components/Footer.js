import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-6 lg:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Company Info */}
        <div>
          <h2 className="text-xl font-bold">Company Name</h2>
          <p className="text-gray-400 mt-2">
            Your trusted brand for quality products & services. Stay connected with us!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-xl font-bold">Quick Links</h2>
          <ul className="mt-2 space-y-2">
            <li><a href="/" className="text-gray-400 hover:text-gray-200">Home</a></li>
            <li><a href="/about" className="text-gray-400 hover:text-gray-200">About</a></li>
            <li><a href="/services" className="text-gray-400 hover:text-gray-200">Services</a></li>
            <li><a href="/contact" className="text-gray-400 hover:text-gray-200">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h2 className="text-xl font-bold">Follow Us</h2>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-gray-200 text-2xl">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 text-2xl">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 text-2xl">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-200 text-2xl">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Company Name. All rights reserved.
      </div>
    </div>
  </footer>
  )
}

export default Footer