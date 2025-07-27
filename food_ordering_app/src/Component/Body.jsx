import React, { useEffect } from "react";
import {
  reslist
} from "../utils/Data";
 import Resturant_Card from "./RestaurantCard";

const Body = () => {
  const [restaurantlist, setRestaurantList] = React.useState(reslist);

  useEffect(() => { fetchdata(); } ,[])
  
  const fetchdata =  async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    // console.log(json);
    setRestaurantList(json?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    
  }
  return (
    <main className="bg-gray-100 min-h-screen">
      {/* //search */}
      <div className="max-w-4xl mx-auto p-6">
        <input
          type="text"
          placeholder="Search for restaurants..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>
      {/* top rated restaurants button */}
      <div className="m-2">
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300" onClick={() => {

          let topreslist = reslist.filter((res) => res.info.avgRating >= 4.4);
          setRestaurantList(topreslist);

          console.log(topreslist);

          
        }
        }>
          Top Rated Restaurants
        </button>
      </div>
      {/* card */}
      {/* restaurant-container */}
      <div className="border-t border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Card */}
        {restaurantlist.map((res) => (
          <Resturant_Card resProp={res.info} key={res.info.id}/>
        ))}
      </div>
    </main>
  );
};

export default Body