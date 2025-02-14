import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
     
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30 z-0"></div>


 <div className="relative z-10 p-4">
        <CategoryList />
        <BannerProduct />

        <HorizontalCardProduct category={"airpodes"} heading={"Top's Airpodes"} />
        <HorizontalCardProduct category={"watches"} heading={"Popular's Watches"} />

        <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
        <VerticalCardProduct category={"Mouse"} heading={"Mouse"} />
        <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
        <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
        <VerticalCardProduct category={"earphones"} heading={"Wired Earphones"} />
        <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />
        <VerticalCardProduct category={"refrigerator"} heading={"Refrigerator"} />
        <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
      </div>
    </div>
  )
}

export default Home