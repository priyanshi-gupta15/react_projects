//in this code we use usestate that are local state hook that manages the state of the dish count for each menu item that show wrong ui

//so we use redux to manage the state globally and avoid prop drilling
//with help of useSelector and useDispatch hooks from react-redux

// import { useState } from "react";
// import { useDispatch } from "react-redux"
// import { addItemToCart} from "../utils/cartSlice";

// const MenuItem = ({ item, cardIndex }) => {
//   //dispatch a function to add item to cart
//   const dispatch = useDispatch(
//     addItemToCart(item)
//   );

//   //update totalquantity

  
// const [dishcount, setDishCount] = useState(0);
//   return (
//     <div
//       key={`${item.id}-${cardIndex}`}
//       className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex w-full justify-between m-2"
//     >
//       {/* Left Content */}
//       <div className="p-4 flex-1">
//         <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//         <p className="text-sm text-gray-600 mt-1 line-clamp-2">
//           {item.description}
//         </p>
//         <div className="mt-3 flex justify-between items-center">
//           <span className="text-red-600 font-bold">
//             ₹{(item.price || item.defaultPrice) / 100}
//           </span>
//           <span className="text-gray-500 text-sm">
//             ⭐ {item.ratings?.aggregatedRating?.rating || "N/A"}
//           </span>
//         </div>
//         {/* Add to Cart Button and remove quantity */}
//         <div className="mt-4 bg-red-600  text-white text-sm px-1 py-1 rounded shadow w-20 flex flex-1 gap-1">
//           {dishcount > 0 && (
//             <button
//               className="text-sm  text-green-600  bg-white font-semibold px-2 py-1 rounded cursor-pointer"
//               onClick={() => {
//                 console.log(`Removed ${item.name} from cart`),
//                   setDishCount(dishcount - 1);
//               }}
//             >
//               -
//             </button>
//           )}
//           <button
//             onClick={() => {
//               console.log(`Added ${item.name} to cart`),
//                 setDishCount(dishcount + 1);
//               dispatch(addItemToCart(item));
//             }}
//             className="px-1"
//           >
//             {dishcount == 0 ? "Add +" : dishcount}
//           </button>

//           {dishcount > 0 && (
//             <button
//               className=" bg-white text-green-600 font-bold px-2 py-1 rounded cursor-pointer"

//               onClick={() => {
//                 console.log(`Added ${item.name} to cart`),
//                   setDishCount(dishcount + 1);
//                 dispatch(addItemToCart(item));
//               }}
//             >
//               +
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Image */}
//       {item.imageId && (
//         <img
//           className="w-38 h-38  object-cover rounded-3xl md:ml-4 p-2 "
//           src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_300,c_fit/${item.imageId}`}
//           alt={item.name}
//         />
//       )}
//     </div>
//   );
// }

// export default MenuItem;



//new code with redux
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../utils/cartSlice";

const MenuItem = ({ item, cardIndex }) => {
  const dispatch = useDispatch();

  // Get quantity from Redux for this specific item
  const quantity = useSelector((state) => {
    const foundItem = state.cart.items.find(
      (cartItem) => cartItem.id === item.id
    );
    return foundItem ? foundItem.quantity : 0;
  });

  return (
    <div
      key={`${item.id}-${cardIndex}`}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden flex w-full justify-between m-2"
    >
      {/* Left Content */}
      <div className="p-4 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {item.description}
        </p>
        <div className="mt-3 flex justify-between items-center">
          <span className="text-red-600 font-bold">
            ₹{(item.price || item.defaultPrice) / 100}
          </span>
          <span className="text-gray-500 text-sm">
            ⭐ {item.ratings?.aggregatedRating?.rating || "N/A"}
          </span>
        </div>

        {/* Quantity Controls */}
        <div className="mt-4 flex items-center gap-2">
          {quantity > 0 ? (
            <div className="flex items-center gap-2 bg-red-100 px-2 py-1 rounded-lg">
              <button
                className="bg-white text-red-600 font-bold px-2 rounded"
                onClick={() => dispatch(removeItemFromCart(item))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="bg-white text-green-600 font-bold px-2 rounded"
                onClick={() => dispatch(addItemToCart(item))}
              >
                +
              </button>
            </div>
          ) : (
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => dispatch(addItemToCart(item))}
            >
              Add +
            </button>
          )}
        </div>
      </div>

      {/* Image */}
      {item.imageId && (
        <img
          className="w-32 h-32 object-cover rounded-3xl md:ml-4 p-2"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_300,c_fit/${item.imageId}`}
          alt={item.name}
        />
      )}
    </div>
  );
};

export default MenuItem;

    