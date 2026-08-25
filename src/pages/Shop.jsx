import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get("/products");
        setProducts(res.data);
      } catch (err) {
        setError("Could not load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category || "Uncategorized"));
    return ["All", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    let list = [...products];

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (category !== "All") {
      list = list.filter((p) => (p.category || "Uncategorized") === category);
    }

    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "newest")
      list.sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      );

    return list;
  }, [products, query, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
      {/* HEADER */}
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-widest text-brass mb-3">
          Full Catalogue
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-medium">
          Shop the Collection
        </h1>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between mb-8 sticky top-[68px] z-30 bg-paper/95 backdrop-blur py-3 border-b border-line">
        {/* SEARCH */}
        <div className="relative w-full sm:max-w-xs">
          <Search
            size={17}
            strokeWidth={1.6}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-soft/50"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full border border-line bg-white/70 pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-brass"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* MOBILE FILTER TOGGLE */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="sm:hidden flex items-center gap-1.5 border border-line px-3 py-2.5 text-sm"
          >
            <SlidersHorizontal size={15} strokeWidth={1.6} />
            Filters
          </button>

          {/* CATEGORY - desktop */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="hidden sm:block border border-line bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:border-brass"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="border border-line bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:border-brass"
          >
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* MOBILE FILTER PANEL */}
      {filtersOpen && (
        <div className="sm:hidden mb-6 border border-line p-4 bg-white/70">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs uppercase tracking-widest text-ink-soft/60">
              Category
            </p>
            <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-3 py-1.5 text-xs border ${
                  category === c
                    ? "bg-ink text-paper border-ink"
                    : "border-line text-ink-soft"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-paper-dim animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <p className="text-center text-rose py-20">{error}</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-24">
          <p className="font-display italic text-xl text-ink-soft/70">
            Nothing matches that search.
          </p>
          <p className="text-sm text-ink-soft/50 mt-2">
            Try a different keyword or clear your filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
