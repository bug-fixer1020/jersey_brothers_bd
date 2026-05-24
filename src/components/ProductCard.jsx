// "use client";

// import Image from "next/image";
// import Link from "next/link";

// export default function ProductCard({ product }) {
//   return (
//     <Link
//       href={`/products/${product._id}`}
//       className="group bg-white border overflow-hidden hover:shadow-lg transition duration-300"
//     >
//       <div className="relative aspect-[3/4] bg-[#efefef] overflow-hidden">
//         <Image
//           src={product.images?.[0]?.url || "/placeholder.svg"}
//           alt={product.name}
//           fill
//           className="object-cover group-hover:scale-105 transition duration-500"
//         />
//       </div>

//       <div className="p-4">
//         <h3
//           className="text-sm font-medium text-black overflow-hidden min-h-[40px]"
//           style={{
//             display: "-webkit-box",
//             WebkitLineClamp: 2,
//             WebkitBoxOrient: "vertical",
//           }}
//         >
//           {product.name}
//         </h3>

//         <p className="text-xs text-gray-400 mt-1">{product.teamName}</p>

//         <div className="mt-3 flex items-center justify-between">
//           <p className="text-sm font-semibold">৳ {product.price}</p>

//           <button className="text-xs border px-3 py-1 hover:bg-black hover:text-white transition">
//             View
//           </button>
//         </div>
//       </div>
//     </Link>
//   );
// }


// 'use client';

// import Image from 'next/image';
// import Link from 'next/link';
// import { useState } from 'react';

// export default function ProductCard({
//   product,
// }) {
//   const [hovered, setHovered] =
//     useState(false);

//   const firstImage =
//     product?.images?.[0]?.url ||
//     '/placeholder.png';

//   const secondImage =
//     product?.images?.[1]?.url ||
//     firstImage;

//   return (
//     <Link
//       href={`/products/${product._id}`}
//       className="group block"
//     >
//       <div
//         className="bg-white border border-gray-200 overflow-hidden transition-all duration-300 hover:border-black"
//         onMouseEnter={() =>
//           setHovered(true)
//         }
//         onMouseLeave={() =>
//           setHovered(false)
//         }
//       >

//         <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">

//           <Image
//             src={
//               hovered
//                 ? secondImage
//                 : firstImage
//             }
//             alt={product.name}
//             fill
//             className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
//             sizes="(max-width:768px) 100vw, 33vw"
//             priority={false}
//           />

//           {product.offerPrice > 0 && (
//             <div className="absolute top-3 left-3 bg-black text-white text-[11px] px-2 py-1 tracking-wide">
//               SALE
//             </div>
//           )}

//           {product.stock <= 0 && (
//             <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-sm font-medium tracking-wide">
//               OUT OF STOCK
//             </div>
//           )}
//         </div>

//         <div className="p-4">

//           <div className="flex items-start justify-between gap-3">

//             <div>
//               <h3 className="text-[15px] font-medium text-black line-clamp-1">
//                 {product.name}
//               </h3>

//               <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">
//                 {product.teamName}
//               </p>
//             </div>

//             <span className="text-[11px] border px-2 py-1 uppercase">
//               {product.version}
//             </span>
//           </div>

//           <div className="flex items-center gap-2 mt-4">

//             {product.offerPrice > 0 ? (
//               <>
//                 <p className="text-[15px] font-semibold">
//                   ৳
//                   {product.offerPrice}
//                 </p>

//                 <p className="text-sm text-gray-400 line-through">
//                   ৳{product.price}
//                 </p>
//               </>
//             ) : (
//               <p className="text-[15px] font-semibold">
//                 ৳{product.price}
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// }



'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function ProductCard({
  product,
}) {
  const [hovered, setHovered] =
    useState(false);

  const [favorite, setFavorite] =
    useState(false);

  const firstImage =
    product?.images?.[0]?.url ||
    '/placeholder.png';

  const secondImage =
    product?.images?.[1]?.url ||
    firstImage;

  useEffect(() => {
    const favorites = JSON.parse(
      localStorage.getItem('favorites') ||
        '[]'
    );

    const exists = favorites.find(
      (item) => item._id === product._id
    );

    setFavorite(!!exists);
  }, [product]);

  const handleFavorite = (e) => {
    e.preventDefault();

    let favorites = JSON.parse(
      localStorage.getItem('favorites') ||
        '[]'
    );

    const exists = favorites.find(
      (item) => item._id === product._id
    );

    if (exists) {
      favorites = favorites.filter(
        (item) => item._id !== product._id
      );

      setFavorite(false);
    } else {
      favorites.push(product);

      setFavorite(true);
    }

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    );

    window.dispatchEvent(
      new Event('favoritesUpdated')
    );
  };

  const handleAddToCart = (e) => {
    e.preventDefault();

    let cart = JSON.parse(
      localStorage.getItem('cart') || '[]'
    );

    const exists = cart.find(
      (item) => item._id === product._id
    );

    if (exists) {
      cart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity:
                (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem(
      'cart',
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event('cartUpdated')
    );

    alert('Added to cart');
  };

  return (
    <Link
      href={`/products/${product._id}`}
      className="group block"
    >
      <div
        className="bg-white border border-gray-200 overflow-hidden hover:border-black transition-all duration-300"
        onMouseEnter={() =>
          setHovered(true)
        }
        onMouseLeave={() =>
          setHovered(false)
        }
      >

        <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">

          <Image
            src={
              hovered
                ? secondImage
                : firstImage
            }
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
          />

          <div className="absolute top-3 right-3 flex flex-col gap-2">

            <button
              onClick={handleFavorite}
              className={`w-10 h-10 border bg-white flex items-center justify-center text-lg transition ${
                favorite
                  ? 'text-red-500 border-red-500'
                  : 'text-black'
              }`}
            >
              ♥
            </button>

            <button
              onClick={handleAddToCart}
              className="w-10 h-10 border bg-white flex items-center justify-center text-lg"
            >
              🛒
            </button>

          </div>

          {product.offerPrice > 0 && (
            <div className="absolute top-3 left-3 bg-black text-white text-xs px-2 py-1">
              SALE
            </div>
          )}
        </div>

        <div className="p-4">

          <div className="flex items-start justify-between gap-3">

            <div>
              <h3 className="text-[15px] font-medium line-clamp-1">
                {product.name}
              </h3>

              <p className="text-xs text-gray-500 mt-1 uppercase">
                {product.teamName}
              </p>
            </div>

            <span className="text-[11px] border px-2 py-1 uppercase">
              {product.version}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-4">

            {product.offerPrice > 0 ? (
              <>
                <p className="font-semibold">
                  ৳
                  {product.offerPrice}
                </p>

                <p className="text-gray-400 line-through text-sm">
                  ৳{product.price}
                </p>
              </>
            ) : (
              <p className="font-semibold">
                ৳{product.price}
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}