import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import api from "../utils/api";

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    return (
      <div className="mx-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[3/4] bg-paper-dim animate-pulse" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-rose py-20">
        {error}
      </p>
    );
  }

  const visibleProducts = products.slice(0, 8);

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

      {products.length > 8 && (
        <div className="mt-10 text-center">
          <Link
            to="/shop"
            className="inline-block border border-ink px-7 py-3 text-xs uppercase tracking-widest font-medium hover:bg-ink hover:text-paper transition"
          >
            Shop All Products
          </Link>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
