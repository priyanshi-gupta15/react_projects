import { useState, useEffect } from "react";
import Resturant_Card from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { useOnline } from "../utils/useOnline";

const Body = () => {
  const [restaurantlist, setRestaurantList] = useState([]);
  const onlineStatus = useOnline();
  const [filterRestaurantlist, setfilterRestaurantList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // NEW STATE

  // useEffect(() => {
  //   fetchdata();
  // }, []);

  // This prevents unnecessary fetch attempts when offline.

  useEffect(() => {
    if (onlineStatus) {
      fetchdata();
    }
  }, [onlineStatus]);

  const fetchdata = async () => {
    const data = await fetch(
      "https://corsproxy.io/https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
   

    const restaurantCard = json?.data?.cards.find(
      (c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
if (!restaurantCard) {
  console.error("Restaurants not found in response", json);
}

    const restaurants =
      restaurantCard?.card?.card?.gridElements?.infoWithStyle?.restaurants ||
      [];

    setRestaurantList(restaurants || []);
    setfilterRestaurantList(restaurants || []);
    setLoading(false); // Set loading to false after data is fetched
  };

  const filterDatalist = () => {
    let filteredlist = restaurantlist.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setfilterRestaurantList(filteredlist);
    setSearchText("");
  };
  

  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        {/* //search */}
        {!onlineStatus && (
          <div className="text-center text-red-600 font-bold p-4">
            Opps! Looks like you're offline!
          </div>
        )}

        {loading ? (
          <Shimmer />
        ) : (
          <>
            <div className="max-w-3xl mx-auto py-4 px-3">
              <div className="flex w-full items-center gap-2 border border-gray-300 rounded-lg shadow-md bg-white p-2">
                <input
                  type="text"
                  value={searchText}
                  placeholder="Search for restaurants..."
                  className="flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  onChange={(e) => {
                    setSearchText(e.target.value);
                  }}
                  //enter key press search
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      filterDatalist();
                    }
                  }}
                />
                <div>
                  <button
                    className="px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600 transition-colors"
                    onClick={() => {
                      filterDatalist();
                    }}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="gap-4 flex flex-wrap justify-center">
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 "
                  onClick={() => {
  
                    setfilterRestaurantList(restaurantlist);
                    
                  }}
                >
                  All Resataurant
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                  onClick={() => {
                    let topreslist = restaurantlist.filter(
                      (res) => res.info.avgRating >= 4.4
                    );
                    setfilterRestaurantList(topreslist);
                    
                  }}
                >
                  ⭐Top Rated Restaurants
                </button>
            
            </div>
            {/* card */}
            {/* restaurant-container */}
            <div className="border-t border-gray-200 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {filterRestaurantlist.length === 0 ? (
                <div className="col-span-6 text-center text-gray-500">
                  No restaurants found
                </div>
              ) : (
                    filterRestaurantlist.map((res, index) => (
                      
                      
                  <Resturant_Card
                    resProp={res.info}
                    key={`${res.info.id}-${index}`}
                  />
                ))
              )}
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Body;
