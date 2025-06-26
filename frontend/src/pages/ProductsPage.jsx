import { useState, useEffect } from "react";
import apiClient from "../services/api";
import ProductCard from "../components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    apiClient
      .get("/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((err) => {
        setError(
          "Failed to load products. Please ensure the backend is running.",
          err
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="text-center p-10 font-semibold">Loading Products...</div>
    );
  if (error)
    return (
      <div className="text-center p-10 text-red-600 bg-red-100 rounded-md p-4">
        {error}
      </div>
    );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
