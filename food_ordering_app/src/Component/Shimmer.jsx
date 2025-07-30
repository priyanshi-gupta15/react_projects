const Shimmer = () => {
  return (
    <>
      {/* // Shimmer effect for loading state //search bar */}
      <div className="max-w-4xl mx-auto p-6 mb-4">
        <input
          type="text"
          placeholder="Search for restaurants..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 animate-pulse"
        />
      </div>
      {/* //cards shimmer */}
      <div className="flex flex-wrap justify-center">
        {Array(10)
          .fill("")
          .map((e, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-4 w-60 m-2"
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
    </>
  );
  
}
export default Shimmer;