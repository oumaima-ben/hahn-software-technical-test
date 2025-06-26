import { useState, useEffect } from "react";
import apiClient from "../services/api";

const MyOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/orders/my-orders");
        setOrders(response.data);
      } catch (err) {
        setError("Failed to fetch your orders.", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  // NOTE: Deleting orders is not implemented in the backend yet, but this is where the function would go.
  const handleDelete = async (orderId) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      alert(
        `Order ${orderId} would be deleted. (Backend endpoint not implemented).`
      );
      // Example:
      // try {
      //   await apiClient.delete(`/orders/${orderId}`);
      //   setOrders(orders.filter(o => o.id !== orderId));
      // } catch (err) {
      //   setError('Failed to delete order.');
      // }
    }
  };

  if (loading)
    return <div className="text-center p-10">Loading your orders...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-gray-800">My Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have not placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
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
              <ul className="space-y-2">
                {order.orderItems.map((item) => (
                  <li
                    key={item.productId}
                    className="flex justify-between text-sm"
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
                  onClick={() => handleDelete(order.id)}
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
  );
};

export default MyOrdersPage;
