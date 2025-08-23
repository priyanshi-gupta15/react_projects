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

const RestaurantMenuShimmer = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 animate-pulse">
      {/* Restaurant header section */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
        <div className="h-6 bg-gray-300 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
      </div>

      {/* Accordion Sections */}
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="mb-6 border-b border-gray-200 pb-4">
          {/* Accordion Header */}
          <div className="flex justify-between items-center bg-gray-200 rounded p-4 mb-4">
            <div className="h-6 bg-gray-300 rounded w-1/3"></div>
            <div className="h-6 bg-gray-300 rounded w-6"></div>
          </div>

          {/* Accordion Content (Menu Items) */}
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((__, i) => (
              <div key={i} className="flex items-center">
                {/* Text Content */}
                <div className="flex-1">
                  <div className="h-5 bg-gray-300 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                </div>
                {/* Image Placeholder */}
                <div className="w-20 h-20 bg-gray-300 rounded mr-4"></div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenuShimmer;
