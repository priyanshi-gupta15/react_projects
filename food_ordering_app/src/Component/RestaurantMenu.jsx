import React , {useEffect,useState} from "react";
import RestaurantShimer from "./RestaurantShimer";
import { useParams } from "react-router-dom";
import { useMenuItem } from "../utils/useMenuItem";


const RestaurantMenu = () => {
  const [resinfo, setResInfo] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [menulist, setMenuList] = React.useState([]);
  const { id } = useParams();
  const data = useMenuItem(id);
  const [dishcount, setDishCount] = useState(0);
  const [openIndex, setOpenIndex] = useState(null); // Track which accordion is open

  //mistake here i am not using useffect after making custom hook

  // Process data only when `data` changes
  useEffect(() => {
    if (!data || !data.data) return;

    // restaurant info
    setResInfo(data?.data?.cards[2]?.card?.card?.info);

    // find menu cards dynamically
    // data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
    //   ?.card?.itemCards;

    // not fetch like this  api not same for all day
    const regularCards = data?.data?.cards.find((c) => c.groupedCard)
      ?.groupedCard?.cardGroupMap?.REGULAR?.cards;

    // Extract all itemCards
    const items = [];
    regularCards?.forEach((card) => {
      if (card.card?.card?.itemCards) {
        items.push(card.card.card);
      }
    });
    setMenuList(items || []);
    console.log("all items");
    console.log(items);
    setLoading(false);
  }, [data]);

  if (loading) return <RestaurantShimer />;

  return (
    <div className="bg-gray-50 min-h-screen pb-10">

      {/* Restaurant Header */}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg  flex flex-col md:flex-row justify-between items-center mt-6">
        <div className="m-1">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {resinfo.name}
          </h1>
          <p className="text-gray-600 mt-1">{resinfo.cuisines?.join(", ")}</p>
          <div className="flex items-center gap-4 mt-2 text-gray-700">
            <span className="font-medium">⭐ {resinfo.avgRating}</span>
            <span>{resinfo.costForTwoMessage}</span>
          </div>
        </div>
        <img
          className="w-48 h-48 object-contain "
          src="https://www.logodesign.net/logo/smoking-burger-with-lettuce-3624ld.png"
          alt="Restaurant"
        />
      </div>

      {/* all categories */}

      {/* make accordian for categories */}
      <div className="max-w-5xl mx-auto mt-6 px-4">
        {Array.isArray(menulist) && menulist.length > 0 ? (
          menulist.map((item, index) => {
            const { title, itemCards } = item;
            return (
              // <div key={index} className="mt-4">
              //   <div className="flex items-center justify-between  p-2  cursor-pointer">
              //     <h2 className="text-xl font-extrabold text-gray-800 p-2">
              //       {title} ({itemCards.length})
              //     </h2>
              //     <button
              //       className="text-gray-600 focus:outline-none"
              //       onClick={() => setIsOpen(!isOpen)}
              //     >
              //       <span>{isOpen ? "▲" : "▼"}</span>
              //     </button>
              //   </div>
              //   <div className="flex flex-wrap gap-6">
              // {isOpen &&


              
              <div key={index} className="mt-4 border-b border-gray-300">
                {/* Accordion Header */}
                <div
                  className="flex items-center justify-between p-3 bg-white cursor-pointer"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                >
                  <h2 className="text-lg font-bold text-gray-800">
                    {title} ({itemCards.length})
                  </h2>
                  <span>{openIndex === index ? "▲" : "▼"}</span>
                </div>

                {/* Accordion Content */}
                {openIndex === index && (
                  <div className="p-4 bg-gray-50">
                    {Array.isArray(itemCards) && itemCards.length > 0 ? (
                      itemCards.map((card, cardIndex) => {
                        const info = card.card.info;
                        return (
                          <div
                            key={`${info.id}-${cardIndex}`}
                            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex w-full justify-between m-2"
                          >
                            {/* Left Content */}
                            <div className="p-4 flex-1">
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
                                  ⭐{" "}
                                  {info.ratings?.aggregatedRating?.rating ||
                                    "N/A"}
                                </span>
                              </div>
                              {/* Add to Cart Button and remove quantity */}
                              <div className="mt-4 bg-black  text-white text-sm px-1 py-1 rounded shadow w-28 ">
                                {dishcount > 0 && (
                                  <button
                                    className="text-sm 
                                    text-green-600  bg-white font-semibold px-2 py-1 rounded"
                                    onClick={() => {
                                      console.log(
                                        `Removed ${info.name} from cart`
                                      ),
                                        setDishCount(dishcount - 1);
                                    }}
                                  >
                                    -
                                  </button>
                                )}
                                <button
                                  onClick={() => {
                                    console.log(`Added ${info.name} to cart`),
                                      setDishCount(dishcount + 1);
                                  }}
                                  className="px-1"
                                >
                                  Add +
                                </button>

                                {dishcount > 0 && (
                                  <span className="ml-2 bg-white text-green-600 font-bold px-2 py-1 rounded">
                                    {dishcount}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Image */}
                            {info.imageId && (
                              <img
                                className="w-38 h-38  object-cover rounded-3xl md:ml-4 p-2 "
                                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_300,c_fit/${info.imageId}`}
                                alt={info.name}
                              />
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="col-span-2 text-center text-xl font-semibold text-gray-500">
                        No Items Found
                      </p>
                    )}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center text-xl font-semibold text-gray-500">
            Closed Today
          </div>
        )}
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