import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import api from "../utils/api";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data); // ✅ backend se jo array aa rahi hai
        setError(null);
      } catch (err) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <p className="text-center py-20">Loading products...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-red-500 py-20">
        {error}
      </p>
    );
  }

  // ✅ show limited or all
  const visibleProducts = showAll ? products : products.slice(0, 6);

  return (
    <>
      <div className="mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <ProductCard
            key={product._id}   // ✅ MongoDB correct key
            product={product}
          />
        ))}
      </div>

      {/* Show All Button */}
      {!showAll && products.length > 6 && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(true)}
            className="border border-black px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition"
          >
            Show All Products
          </button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
