import React, { useEffect } from "react";
import RestaurantShimer from "./RestaurantShimer";
import { useParams } from "react-router-dom";
import { restaurant } from "../utils/Link";


const RestaurantMenu = () => {
  const [resinfo, setResInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [menulist, setMenuList] = React.useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetchRestaurantMenu();
  }, [id]);

  const fetchRestaurantMenu = async () => {
    const fetchdata = await fetch(
       restaurant + id + "&catalog_qa=undefined&submitAction=ENTER"
    );

    const data = await fetchdata.json();
    console.log(data);

    setResInfo(data?.data?.cards[2]?.card?.card?.info);


    // data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
    //   ?.card?.itemCards;

    // not fetch like this  api not same for all day

    const regularCards = data?.data?.cards.find((c) => c.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    // Extract all itemCards
    const items = [];
    regularCards?.forEach((card) => {
      if (card.card?.card?.itemCards) {
        items.push(...card.card.card.itemCards);
      }
    });

    setMenuList(items || []);
    setLoading(false);
  };

  if (loading) return <RestaurantShimer />;


  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      {/* Restaurant Header */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row justify-between items-center mt-6">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">
            {resinfo.name}
          </h1>
          <p className="text-gray-600 mt-2">{resinfo.cuisines?.join(", ")}</p>
          <div className="flex items-center gap-4 mt-4 text-gray-700">
            <span className="font-medium">⭐ {resinfo.avgRating}</span>
            <span>{resinfo.costForTwoMessage}</span>
          </div>
        </div>
        <img
          className="w-48 h-48 object-contain mt-4 md:mt-0"
          src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png"
          alt="Restaurant"
        />
      </div>

      {/* Menu Section */}
      <div className="max-w-5xl mx-auto mt-10 px-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Top Dishes</h2>

        {/* Grid layout for items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(menulist) && menulist.length > 0 ? (
            menulist.map((item) => {
              const info = item.card.info;
              return (
                <div
                  key={info.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
                >
                  {info.imageId && (
                    <img
                      className="w-full h-40 object-cover"
                      src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_300,c_fit/${info.imageId}`}
                      alt={info.name}
                    />
                  )}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {info.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {info.description}
                    </p>
                    <div className="mt-3 flex justify-between items-center">
                      <span className="text-red-600 font-bold">
                        ₹{(info.price || info.defaultPrice) / 100}
                      </span>
                      <span className="text-gray-500 text-sm">
                        ⭐ {info.ratings?.aggregatedRating?.rating || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center text-xl font-semibold text-gray-500">
              Closed Today
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;




//previous ui code
// import React from 'react'
// import { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import RestaurantShimer from './RestaurantShimer';

// const RestaurantMenu = () => {

//   const [resinfo, setResInfo] = React.useState([]);
//   const [loading, setLoading] = React.useState(false);
//   const [menulist, setMenuList] = React.useState([]);
//   const { id } = useParams();

//   useEffect(() => {fetchRestaurantMenu() }, []);
//   //fetching
//   const fetchRestaurantMenu = async () => {
  
//     const fetchdata = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=21.99740&lng=79.00110&restaurantId="+ id +"&catalog_qa=undefined&submitAction=ENTER")

//     const data = await fetchdata.json();
//     console.log(data);
//     setResInfo(data?.data?.cards[2]?.card?.card?.info);
//     setLoading(true);
//     setMenuList(data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards);
//     console.log(menulist);
    
//   }

  
//   return !loading ? (
//     <RestaurantShimer />
//   ) : (
//     <>
//       {/* hotel name  */}
//       <div className="container mx-auto p-4 bg-white shadow-md rounded-lg my-2 flex flex-wrap justify-between items-center">
//         <div className="">
//           <h1 className="text-2xl font-bold text-gray-800">{resinfo.name}</h1>
//           <div className="text-gray-600">
//             {/* Add restaurant details here */}
//             {/* hotel name ,price ,rating */}

//             <p className="text-lg">{resinfo.cuisines}</p>
//             <p className="text-lg">{resinfo.costForTwoMessage}</p>
//             <p className="text-lg">⭐{resinfo.avgRating}/5</p>
//           </div>
//         </div>
//         <div className="">
//           <img
//             className="w-60 object-contain"
//             src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png?nwm=1&nws=1&industry=food&sf=&txt_keyword=All"
//             alt=""
//           />
//         </div>
//       </div>

//       <h1 className="text-3xl font-bold text-red-600 mx-5">Top food</h1>

//       {menulist?.map(
//         (
//           item // <-- changed {} to () for implicit return
//         ) => (
//           <div
//             key={item.card.info.id} // <-- fixed key
//             className="container mx-auto bg-white rounded-lg my-2 flex flex-wrap justify-between items-center"
//           >
//             <div>
//               <h1 className="text-2xl font-bold text-gray-800">
//                 {item.card.info.name} {/* <-- fixed: correct property */}
//               </h1>
//               <div className="text-gray-600">
//                 <p className="text-lg">{item.card.info.description}</p>
//                 <p className="text-lg">
//                   Price: ₹
//                   {(item.card.info.price || item.card.info.defaultPrice) / 100}
//                 </p>
//                 <p className="text-lg">
//                   Rating: ⭐{" "}
//                   {item.card.info.ratings?.aggregatedRating?.rating || "N/A"}
//                 </p>
//               </div>
//             </div>

//             <div>
//               {item.card.info.imageId && ( // <-- show image only if exists
//                 <img
//                   className="w-32 h-32 object-cover rounded-lg"
//                   src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_300,c_fit/${item.card.info.imageId}`}
//                   alt={item.card.info.name}
//                 />
//               )}
//             </div>
//           </div>
//         )
//       )}
//     </>
//   );
// }

// export default RestaurantMenu