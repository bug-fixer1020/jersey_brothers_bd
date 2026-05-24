// 'use client';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function ProfilePage() {
//   const { data: session, status } = useSession();
//   const router = useRouter();
//   const [favorites, setFavorites] = useState([]);
//   const [orders, setOrders] = useState([]);
  
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login');
//     }
//   }, [status, router]);
  
//   if (status === 'loading') {
//     return <div className="text-center py-10">Loading...</div>;
//   }
  
//   const handleCancelOrder = async (orderId) => {
//     if (confirm('Are you sure you want to cancel this order?')) {
//       // Order cancellation logic
//       alert('Order cancelled successfully');
//     }
//   };
  
//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h1 className="text-3xl font-bold mb-4">My Profile</h1>
//         <div className="border-t pt-4">
//           <p className="text-gray-700"><strong>Name:</strong> {session?.user?.name}</p>
//           <p className="text-gray-700"><strong>Email:</strong> {session?.user?.email}</p>
//           <p className="text-gray-700"><strong>Role:</strong> {session?.user?.role}</p>
//         </div>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//         <h2 className="text-2xl font-bold mb-4">My Favorites</h2>
//         <div className="text-gray-500 text-center py-8">
//           No favorites added yet
//         </div>
//       </div>
      
//       <div className="bg-white rounded-lg shadow-md p-6">
//         <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//         <div className="space-y-4">
//           <div className="text-gray-500 text-center py-8">
//             No orders placed yet
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export default function ProfilePage() {
  const params = useSearchParams();

  const activeTab =
    params.get('tab') || 'favorites';

  const [favorites, setFavorites] =
    useState([]);

  const [cart, setCart] = useState([]);

  useEffect(() => {
    setFavorites(
      JSON.parse(
        localStorage.getItem(
          'favorites'
        ) || '[]'
      )
    );

    setCart(
      JSON.parse(
        localStorage.getItem('cart') ||
          '[]'
      )
    );
  }, []);

  const items =
    activeTab === 'cart'
      ? cart
      : favorites;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      <div className="flex gap-3 mb-8">

        <Link
          href="/profile?tab=favorites"
          className={`px-5 py-2 border ${
            activeTab === 'favorites'
              ? 'bg-black text-white'
              : ''
          }`}
        >
          Favorites
        </Link>

        <Link
          href="/profile?tab=cart"
          className={`px-5 py-2 border ${
            activeTab === 'cart'
              ? 'bg-black text-white'
              : ''
          }`}
        >
          Cart
        </Link>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">

        {items.map((item) => (
          <div
            key={item._id}
            className="border bg-white"
          >

            <Image
              src={
                item.images?.[0]?.url ||
                '/placeholder.png'
              }
              alt={item.name}
              width={500}
              height={500}
              className="w-full aspect-[4/5] object-cover"
            />

            <div className="p-4">

              <h3 className="font-medium">
                {item.name}
              </h3>

              <p className="mt-2">
                ৳
                {item.offerPrice ||
                  item.price}
              </p>

              {activeTab === 'cart' && (
                <p className="text-sm text-gray-500 mt-1">
                  Quantity:{' '}
                  {item.quantity || 1}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}