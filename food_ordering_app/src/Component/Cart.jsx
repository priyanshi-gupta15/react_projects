import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../utils/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
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
                <p className="text-gray-600">
                  ₹{(item.price / 100).toFixed(2)}
                </p>
              </div>

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
          ))}

          <div className="flex justify-between mt-6 font-bold text-lg">
            <p>Total Items: {totalQuantity}</p>
            <p>Total Price: ₹{(totalPrice / 100).toFixed(2)}</p>
          </div>

          <div className=" flex flex-wrap text-center  justify-between mt-4">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-6 py-2 rounded"
            >
              Clear Cart
              </button>
              <button  className="bg-blue-500 text-white px-6 py-2 rounded">
                Checkout
              </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
