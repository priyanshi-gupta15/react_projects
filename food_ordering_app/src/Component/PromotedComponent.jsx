import React from "react";
import Resturant_Card from "./RestaurantCard";

const PromotedComponent = () => {
  return (
    <>
      <div className="absolute top-0">
        <div className="font-bold bg-red-500 rounded-lg text-white">Promoted</div>
        <Resturant_Card/>
      </div>
    </>
  )
  
}


export default PromotedComponent