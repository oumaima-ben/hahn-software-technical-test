import React, { useState, useEffect, useCallback } from "react";
import apiClient from "../services/api";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

// A new component for just the shopping cart section
function ShoppingCart() {
  const { cart, cartTotal, removeFromCart, updateQuantity, clearCart } =
    useCart();

  const handlePlaceOrder = async () => {
    if (cart.length === 0) return;

    const orderRequest = {
      items: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      await apiClient.post("/orders", orderRequest);
      alert("Order placed successfully!");
      clearCart();
      // The parent component will now handle refreshing the order list
    } catch (error) {
      console.error("Failed to place order:", error);
      const errorMessage =
        error.response?.data?.message ||
        "There was an error placing your order.";
      alert(errorMessage);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">
          Your Cart is Empty
        </h2>
        <Link to="/" className="text-indigo-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>
      <ul className="divide-y divide-gray-200">
        {cart.map((item) => (
          <li key={item.id} className="py-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value) || 1)
                }
                className="w-16 p-1 border border-gray-300 rounded-md text-center"
              />
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-700 font-bold text-lg"
              >
                &times;
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="border-t mt-4 pt-4 flex justify-between items-center">
        <p className="text-lg font-bold">Total: ${cartTotal.toFixed(2)}</p>
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 text-white px-6 py-2 rounded-md font-semibold hover:bg-green-700"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

// The main page component that displays past orders
export default function MyOrdersPage() {
  const [pastOrders, setPastOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { cart } = useCart(); // Get cart state to trigger re-fetch after ordering

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/orders/my-orders");
      // Sort orders by most recent first
      setPastOrders(
        response.data.sort(
          (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
        )
      );
    } catch (err) {
      setError("Failed to fetch your past orders.", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch orders when the component mounts or when the cart becomes empty (after placing an order)
  useEffect(() => {
    fetchOrders();
  }, [fetchOrders, cart.length === 0]);

  const handleDeleteOrder = async (orderId) => {
    if (
      window.confirm(
        "Are you sure you want to delete this order? This will also restock the items."
      )
    ) {
      try {
        await apiClient.delete(`/orders/delete/${orderId}`);
        // Refetch the orders list to show the change
        fetchOrders();
      } catch (err) {
        alert("Failed to delete the order.", err);
      }
    }
  };

  if (loading)
    return <div className="text-center p-10">Loading your orders...</div>;
  if (error)
    return (
      <div className="text-center p-10 text-red-500 bg-red-100 rounded-md p-4">
        {error}
      </div>
    );

  return (
    <div>
      <ShoppingCart />
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Past Orders</h2>
        {pastOrders.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <p className="text-gray-600">You have no past orders.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pastOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      Order #{order.id}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-indigo-600">
                    ${order.totalAmount.toFixed(2)}
                  </p>
                </div>
                <ul className="space-y-2 border-t pt-4 mt-4">
                  {order.orderItems.map((item) => (
                    <li
                      key={`${order.id}-${item.productId}`}
                      className="flex justify-between text-sm text-gray-700"
                    >
                      <span>
                        {item.productName} (x{item.quantity})
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="text-right mt-4">
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
