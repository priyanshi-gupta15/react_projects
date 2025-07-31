// import React from 'react'

// const RestaurantShimer = () => {
//   return (
//     <>
//       <div className="max-w-4xl mx-auto mt-10 animate-pulse">
//         <div className="h-40 bg-gray-300 rounded-lg mb-6"></div>
//         <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
//         <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
//         <div className="h-4 bg-gray-300 rounded w-1/4"></div>
//       </div>

//       {/* //cards in grid  */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//         {Array(9)
//           .fill("")
//           .map((e, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-xl shadow-md p-4 w-60 m-2"
//             >
//               <div className="animate-pulse">
//                 <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
//                 <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
//                 <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
//                 <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </>
//   );
// }

// export default RestaurantShimer;

import React from "react";

const RestaurantShimer = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10 animate-pulse">
      {/* Top section placeholder */}
      <div className="h-40 bg-gray-300 rounded-lg mb-6"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-1/4"></div>

      {/* Grid of shimmer cards */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-4"
            aria-hidden="true"
          >
            <div className="animate-pulse">
              <div className="h-40 bg-gray-200 rounded-lg mb-4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantShimer;
