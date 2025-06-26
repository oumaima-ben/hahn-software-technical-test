import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    addToCart(product, quantity);
    alert(`${quantity} of "${product.name}" was added to your cart.`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl flex flex-col">
      <div className="p-6 flex-grow">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 mb-4 h-12 overflow-y-auto">
          {product.description}
        </p>
      </div>
      <div className="p-6 bg-gray-50 border-t">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-sm font-medium text-gray-500">
            In Stock: {product.stockQuantity}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            min="1"
            max={product.stockQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
            className="w-16 p-2 border border-gray-300 rounded-md text-center"
            aria-label="Quantity"
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stockQuantity === 0}
            className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
