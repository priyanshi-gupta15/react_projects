import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [couponApplied, setCouponApplied] = React.useState(false);

  //always subscribe the small portion of store so that if any random change is happen in store not affect our cart
  const { items, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-center font-bold text-3xl mb-4">Cart</h1>

      {items.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty</p>
      ) : (
        <>
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b py-4"
            >
              <div>
                <p className="font-semibold">{item.name}</p>

                {!couponApplied ? (
                  <p className="text-gray-600 ">
                    ₹{(item.price / 100).toFixed(2)}
                  </p>
                ) : (
                  <>
                    <p className="text-gray-600 line-through">
                      ₹{(item.price / 100).toFixed(2)}
                    </p>
                    <p className="text-gray-600 ">
                      ₹{((item.price / 100) * 0.9).toFixed(2)}
                    </p>
                  </>
                )}
              </div>
              <div className="flex flex-col items-center gap-1">
                <img
                  className="w-20 h-20 object-cover rounded-xl"
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_400,h_300,c_fit/${item.imageId}`}
                  alt={item.name}
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => dispatch(removeItemFromCart(item))}
                    className="bg-gray-300 px-2 rounded text-lg"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch(addItemToCart(item))}
                    className="bg-green-500 text-white px-2 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* //coupan code   check box and let coupon name is Discount10*/}
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              id="discount-coupon"
              className="mr-2"
              onClick={() => setCouponApplied(!couponApplied)}
            />
            <label htmlFor="discount-coupon">Apply Coupon: Discount10</label>
          </div>

          <div className="flex justify-between mt-6 font-bold text-lg">
            <p>Total Items: {totalQuantity}</p>
            {/* if coupn then reduce from price */}
            {!couponApplied ? (
              <p>Total Price: ₹{(totalPrice / 100).toFixed(2)}</p>
            ) : (
              <div className="">
                <p className="line-through">Total Price: ₹{(totalPrice / 100).toFixed(2)}</p>
                <p>Total Price: ₹{((totalPrice / 100) * 0.9).toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className=" flex flex-wrap text-center  justify-between mt-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-6 py-2 rounded"
            >
              Clear Cart
            </button>
            <button className="bg-blue-500 text-white px-6 py-2 rounded">
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
