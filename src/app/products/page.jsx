'use client';

import { useEffect, useMemo, useState } from 'react';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products', {
          cache: 'no-store',
        });

        const data = await res.json();

        setProducts(data || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [products, search]);

  const totalPages = Math.ceil(
    filteredProducts.length / ITEMS_PER_PAGE
  );

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f3]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="mb-10">
          <h1 className="text-4xl font-semibold tracking-tight text-black">
             Premium  Jerseys Collection
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10">

          {/* LEFT SIDEBAR */}

          <div className="space-y-6">

            <div className="bg-white border p-5">
              <h2 className="text-lg font-semibold mb-4">
                Categories
              </h2>

              <div className="space-y-3 text-sm">

                <button className="block hover:text-black text-gray-600">
                  All Jerseys
                </button>

                <button className="block text-gray-400 cursor-not-allowed">
                  Club Jerseys (Coming Soon)
                </button>

              </div>
            </div>

          </div>

          {/* RIGHT CONTENT */}

          <div>

            {/* SEARCH */}

            <div className="mb-8">
              <input
                type="text"
                placeholder="Search jerseys..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full bg-white border px-5 py-4 outline-none text-sm"
              />
            </div>

            {/* PRODUCTS */}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">

              {paginatedProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}

            </div>

            {/* PAGINATION */}

            {totalPages > 1 && (
              <div className="flex justify-center gap-3 mt-14">

                {[...Array(totalPages)].map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setPage(index + 1)
                      }
                      className={`w-10 h-10 border text-sm ${
                        page === index + 1
                          ? 'bg-black text-white'
                          : 'bg-white'
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}