// 'use client';

// import { useEffect, useMemo, useState } from 'react';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';

// export default function AdminPage() {
//   const { data: session, status } = useSession();

//   const router = useRouter();

//   const [activeTab, setActiveTab] =
//     useState('products');

//   const [products, setProducts] = useState([]);
//   const [users, setUsers] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [uploading, setUploading] =
//     useState(false);

//   const [saving, setSaving] = useState(false);

//   const [editingProductId, setEditingProductId] =
//     useState(null);

//   const initialProduct = useMemo(
//     () => ({
//       name: '',
//       price: '',
//       stock: '',
//       teamName: '',
//       availableSizes: [],
//       version: 'fan',
//       description: '',
//       offerPrice: '',
//       images: [],
//     }),
//     []
//   );

//   const [productForm, setProductForm] =
//     useState(initialProduct);

//   const fetchProducts = async () => {
//     try {
//       const res = await fetch('/api/products');

//       const data = await res.json();

//       setProducts(data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch('/api/users');

//       const data = await res.json();

//       setUsers(data || []);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const loadAllData = async () => {
//     await Promise.all([
//       fetchProducts(),
//       fetchUsers(),
//     ]);

//     setLoading(false);
//   };

//   useEffect(() => {
//     async function checkAdmin() {
//       if (status === 'loading') return;

//       if (status === 'unauthenticated') {
//         router.push('/login');
//         return;
//       }

//       if (session?.user?.role !== 'admin') {
//         router.push('/');
//         return;
//       }

//       await loadAllData();
//     }

//     checkAdmin();

//     const interval = setInterval(() => {
//       loadAllData();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [status, session, router]);

//   const resetForm = () => {
//     setProductForm(initialProduct);

//     setEditingProductId(null);
//   };

//   const handleImageUpload = async (e) => {
//     try {
//       const files = Array.from(e.target.files);

//       if (!files.length) return;

//       const formData = new FormData();

//       files.forEach((file) => {
//         formData.append('images', file);
//       });

//       setUploading(true);

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       setProductForm((prev) => ({
//         ...prev,
//         images: [...prev.images, ...data.images],
//       }));
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setSaving(true);

//       const url = editingProductId
//         ? `/api/products/${editingProductId}`
//         : '/api/products';

//       const method = editingProductId
//         ? 'PUT'
//         : 'POST';

//       const res = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...productForm,
//           price: Number(productForm.price),
//           stock: Number(productForm.stock),
//           offerPrice: Number(
//             productForm.offerPrice
//           ),
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message);
//         return;
//       }

//       alert(
//         editingProductId
//           ? 'Product Updated'
//           : 'Product Created'
//       );

//       resetForm();

//       await loadAllData();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleEditProduct = (product) => {
//     setEditingProductId(product._id);

//     setProductForm({
//       ...product,
//     });

//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const handleDeleteProduct = async (id) => {
//     const confirmDelete = confirm(
//       'Delete this product?'
//     );

//     if (!confirmDelete) return;

//     try {
//       await fetch(`/api/products/${id}`, {
//         method: 'DELETE',
//       });

//       await loadAllData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleDeleteUser = async (id) => {
//     const confirmDelete = confirm(
//       'Delete this user?'
//     );

//     if (!confirmDelete) return;

//     try {
//       await fetch(`/api/users/${id}`, {
//         method: 'DELETE',
//       });

//       await loadAllData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleRoleUpdate = async (
//     id,
//     role
//   ) => {
//     try {
//       await fetch(`/api/users/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           role,
//         }),
//       });

//       await loadAllData();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   if (loading || status === 'loading') {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         Loading Dashboard...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-4 md:p-8">

//       <div className="max-w-7xl mx-auto space-y-8">

//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//           <div>
//             <h1 className="text-4xl font-bold text-black">
//               Admin Dashboard
//             </h1>

//             <p className="text-gray-500 mt-1">
//               Manage Users & Products
//             </p>
//           </div>

//           <div className="flex gap-3">
//             <button
//               onClick={() =>
//                 setActiveTab('products')
//               }
//               className={`px-5 py-2 rounded-xl font-medium ${
//                 activeTab === 'products'
//                   ? 'bg-black text-white'
//                   : 'bg-white border'
//               }`}
//             >
//               All Products
//             </button>

//             <button
//               onClick={() =>
//                 setActiveTab('users')
//               }
//               className={`px-5 py-2 rounded-xl font-medium ${
//                 activeTab === 'users'
//                   ? 'bg-black text-white'
//                   : 'bg-white border'
//               }`}
//             >
//               All Users
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//           <div className="bg-white rounded-2xl p-6 border shadow-sm">
//             <p className="text-gray-500">
//               Total Products
//             </p>

//             <h2 className="text-4xl font-bold mt-2">
//               {products.length}
//             </h2>
//           </div>

//           <div className="bg-white rounded-2xl p-6 border shadow-sm">
//             <p className="text-gray-500">
//               Total Users
//             </p>

//             <h2 className="text-4xl font-bold mt-2">
//               {users.length}
//             </h2>
//           </div>
//         </div>

//         {activeTab === 'products' && (
//           <>
//             <div className="bg-white rounded-2xl p-6 border shadow-sm">

//               <h2 className="text-2xl font-bold mb-6">
//                 {editingProductId
//                   ? 'Update Product'
//                   : 'Create Product'}
//               </h2>

//               <form
//                 onSubmit={handleSubmit}
//                 className="grid grid-cols-1 md:grid-cols-2 gap-5"
//               >

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Product Name
//                   </label>

//                   <input
//                     type="text"
//                     required
//                     value={productForm.name}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         name: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Team Name
//                   </label>

//                   <input
//                     type="text"
//                     required
//                     value={productForm.teamName}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         teamName: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Price
//                   </label>

//                   <input
//                     type="number"
//                     required
//                     value={productForm.price}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         price: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Offer Price
//                   </label>

//                   <input
//                     type="number"
//                     value={productForm.offerPrice}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         offerPrice: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Stock Quantity
//                   </label>

//                   <input
//                     type="number"
//                     required
//                     value={productForm.stock}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         stock: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Available Sizes
//                   </label>

//                   <input
//                     type="text"
//                     placeholder="S,M,L,XL"
//                     className="w-full border rounded-xl px-4 py-3"
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         availableSizes:
//                           e.target.value.split(','),
//                       })
//                     }
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Product Version
//                   </label>

//                   <select
//                     value={productForm.version}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         version: e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   >
//                     <option value="fan">
//                       Fan Version
//                     </option>

//                     <option value="player">
//                       Player Version
//                     </option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-medium">
//                     Upload Images
//                   </label>

//                   <input
//                     type="file"
//                     multiple
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 <div className="md:col-span-2">
//                   <label className="block mb-2 font-medium">
//                     Product Description
//                   </label>

//                   <textarea
//                     rows="5"
//                     value={productForm.description}
//                     onChange={(e) =>
//                       setProductForm({
//                         ...productForm,
//                         description:
//                           e.target.value,
//                       })
//                     }
//                     className="w-full border rounded-xl px-4 py-3"
//                   />
//                 </div>

//                 {uploading && (
//                   <p className="text-sm text-gray-500">
//                     Uploading Images...
//                   </p>
//                 )}

//                 {productForm.images.length >
//                   0 && (
//                   <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-4">
//                     {productForm.images.map(
//                       (image, index) => (
//                         <Image
//                           key={index}
//                           src={image.url}
//                           alt="product"
//                           width={300}
//                           height={300}
//                           className="w-full h-40 rounded-xl object-cover"
//                         />
//                       )
//                     )}
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   disabled={saving}
//                   className="md:col-span-2 bg-black text-white py-3 rounded-xl font-semibold"
//                 >
//                   {saving
//                     ? 'Saving...'
//                     : editingProductId
//                     ? 'Update Product'
//                     : 'Create Product'}
//                 </button>
//               </form>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

//               {products.map((product) => (
//                 <div
//                   key={product._id}
//                   className="bg-white rounded-2xl overflow-hidden border shadow-sm"
//                 >

//                   <Image
//                     src={
//                       product.images?.[0]
//                         ?.url ||
//                       '/placeholder.png'
//                     }
//                     alt={product.name}
//                     width={600}
//                     height={600}
//                     className="w-full h-64 object-cover"
//                   />

//                   <div className="p-5">

//                     <h3 className="font-bold text-xl">
//                       {product.name}
//                     </h3>

//                     <p className="text-gray-500">
//                       {product.teamName}
//                     </p>

//                     <div className="flex items-center justify-between mt-4">

//                       <div>
//                         <p className="text-2xl font-bold">
//                           ৳{product.price}
//                         </p>

//                         <p className="text-sm text-gray-500">
//                           Stock:{' '}
//                           {product.stock}
//                         </p>
//                       </div>

//                       <span className="text-xs bg-black text-white px-3 py-1 rounded-full capitalize">
//                         {product.version}
//                       </span>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3 mt-5">

//                       <button
//                         onClick={() =>
//                           handleEditProduct(
//                             product
//                           )
//                         }
//                         className="bg-black text-white py-2 rounded-xl"
//                       >
//                         Edit
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDeleteProduct(
//                             product._id
//                           )
//                         }
//                         className="bg-red-500 text-white py-2 rounded-xl"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         )}

//         {activeTab === 'users' && (
//           <div className="bg-white rounded-2xl border shadow-sm overflow-auto p-6">

//             <h2 className="text-2xl font-bold mb-6">
//               All Users
//             </h2>

//             <table className="w-full min-w-[700px]">

//               <thead>
//                 <tr className="border-b">
//                   <th className="text-left py-4">
//                     Name
//                   </th>

//                   <th className="text-left py-4">
//                     Email
//                   </th>

//                   <th className="text-left py-4">
//                     Role
//                   </th>

//                   <th className="text-left py-4">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {users.map((user) => (
//                   <tr
//                     key={user._id}
//                     className="border-b"
//                   >

//                     <td className="py-4">
//                       {user.name}
//                     </td>

//                     <td className="py-4">
//                       {user.email}
//                     </td>

//                     <td className="py-4 capitalize">
//                       {user.role}
//                     </td>

//                     <td className="py-4 flex gap-3">

//                       <button
//                         onClick={() =>
//                           handleRoleUpdate(
//                             user._id,
//                             user.role ===
//                               'admin'
//                               ? 'user'
//                               : 'admin'
//                           )
//                         }
//                         className="bg-black text-white px-4 py-2 rounded-xl text-sm"
//                       >
//                         Make{' '}
//                         {user.role ===
//                         'admin'
//                           ? 'User'
//                           : 'Admin'}
//                       </button>

//                       <button
//                         onClick={() =>
//                           handleDeleteUser(
//                             user._id
//                           )
//                         }
//                         className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminPage() {
  const { data: session, status } =
    useSession();

  const router = useRouter();

  const [activeTab, setActiveTab] =
    useState('products');

  const [showForm, setShowForm] =
    useState(false);

  const [products, setProducts] = useState(
    []
  );

  const [users, setUsers] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [editingProductId, setEditingProductId] =
    useState(null);

  const initialProduct = useMemo(
    () => ({
      name: '',
      price: '',
      stock: '',
      teamName: '',
      availableSizes: [],
      version: 'fan',
      description: '',
      offerPrice: '',
      images: [],
    }),
    []
  );

  const [productForm, setProductForm] =
    useState(initialProduct);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products', {
        cache: 'no-store',
      });

      const data = await res.json();

      setProducts(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users', {
        cache: 'no-store',
      });

      const data = await res.json();

      setUsers(data || []);
    } catch (error) {
      console.log(error);
    }
  };

  const loadAllData = async () => {
    await Promise.all([
      fetchProducts(),
      fetchUsers(),
    ]);

    setLoading(false);
  };

  useEffect(() => {
    async function checkAdmin() {
      if (status === 'loading') return;

      if (status === 'unauthenticated') {
        router.push('/login');
        return;
      }

      if (session?.user?.role !== 'admin') {
        router.push('/');
        return;
      }

      await loadAllData();
    }

    checkAdmin();
  }, [status, session, router]);

  const resetForm = () => {
    setProductForm(initialProduct);

    setEditingProductId(null);

    setShowForm(false);
  };

  const handleImageUpload = async (e) => {
    try {
      const files = Array.from(e.target.files);

      if (!files.length) return;

      const formData = new FormData();

      files.forEach((file) => {
        formData.append('images', file);
      });

      setUploading(true);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      setProductForm((prev) => ({
        ...prev,
        images: [...prev.images, ...data.images],
      }));
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const payload = {
        name: productForm.name,
        teamName: productForm.teamName,
        price: Number(productForm.price),
        offerPrice: Number(
          productForm.offerPrice
        ),
        stock: Number(productForm.stock),
        availableSizes:
          productForm.availableSizes,
        version: productForm.version,
        description:
          productForm.description,
        images: productForm.images,
      };

      const url = editingProductId
        ? `/api/products/${editingProductId}`
        : '/api/products';

      const method = editingProductId
        ? 'PUT'
        : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      await loadAllData();

      resetForm();

      alert(
        editingProductId
          ? 'Product Updated'
          : 'Product Created'
      );
    } catch (error) {
      console.log(error);
    } finally {
      setSaving(false);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProductId(product._id);

    setProductForm({
      name: product.name || '',
      price: product.price || '',
      stock: product.stock || '',
      teamName: product.teamName || '',
      availableSizes:
        product.availableSizes || [],
      version: product.version || 'fan',
      description:
        product.description || '',
      offerPrice:
        product.offerPrice || '',
      images: product.images || [],
    });

    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleDeleteProduct = async (id) => {
    const confirmDelete = confirm(
      'Delete this jersey?'
    );

    if (!confirmDelete) return;

    try {
      await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      await loadAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmDelete = confirm(
      'Delete this user?'
    );

    if (!confirmDelete) return;

    try {
      await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      await loadAllData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleUpdate = async (
    id,
    role
  ) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role,
        }),
      });

      await loadAllData();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading || status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] p-4 md:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div>
            <h1 className="text-3xl font-semibold">
              Admin Panel
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Manage jerseys & users
            </p>
          </div>

          <div className="flex gap-2">

            <button
              onClick={() =>
                setActiveTab('products')
              }
              className={`px-5 py-2 border text-sm ${
                activeTab === 'products'
                  ? 'bg-black text-white'
                  : 'bg-white'
              }`}
            >
              Products
            </button>

            <button
              onClick={() =>
                setActiveTab('users')
              }
              className={`px-5 py-2 border text-sm ${
                activeTab === 'users'
                  ? 'bg-black text-white'
                  : 'bg-white'
              }`}
            >
              Users
            </button>

          </div>
        </div>

        {activeTab === 'products' && (
          <>
            <div className="bg-white border p-5 mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-medium">
                  Available Jerseys
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Total: {products.length}
                </p>
              </div>

              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-black text-white px-5 py-2 text-sm"
              >
                Add New Jersey
              </button>
            </div>

            {showForm && (
              <div className="bg-white border p-6 mb-8">

                <div className="flex items-center justify-between mb-6">

                  <h2 className="text-xl font-medium">
                    {editingProductId
                      ? 'Update Jersey'
                      : 'Add Jersey'}
                  </h2>

                  <button
                    onClick={resetForm}
                    className="border px-4 py-2 text-sm"
                  >
                    Close
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                >

                  <div>
                    <label className="text-sm block mb-2">
                      Product Name
                    </label>

                    <input
                      type="text"
                      required
                      value={productForm.name}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          name: e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Team Name
                    </label>

                    <input
                      type="text"
                      required
                      value={productForm.teamName}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          teamName:
                            e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Price
                    </label>

                    <input
                      type="number"
                      required
                      value={productForm.price}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          price: e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Stock
                    </label>

                    <input
                      type="number"
                      required
                      value={productForm.stock}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          stock: e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Offer Price
                    </label>

                    <input
                      type="number"
                      value={productForm.offerPrice}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          offerPrice:
                            e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Sizes
                    </label>

                    <input
                      type="text"
                      placeholder="S,M,L,XL"
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          availableSizes:
                            e.target.value.split(
                              ','
                            ),
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Version
                    </label>

                    <select
                      value={productForm.version}
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          version:
                            e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    >
                      <option value="fan">
                        Fan Version
                      </option>

                      <option value="player">
                        Player Version
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm block mb-2">
                      Upload Images
                    </label>

                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full border px-4 py-3"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm block mb-2">
                      Description
                    </label>

                    <textarea
                      rows="5"
                      value={
                        productForm.description
                      }
                      onChange={(e) =>
                        setProductForm({
                          ...productForm,
                          description:
                            e.target.value,
                        })
                      }
                      className="w-full border px-4 py-3 outline-none"
                    />
                  </div>

                  {uploading && (
                    <p className="text-sm text-gray-500">
                      Uploading...
                    </p>
                  )}

                  {productForm.images.length >
                    0 && (
                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-5 gap-4">
                      {productForm.images.map(
                        (image, index) => (
                          <Image
                            key={index}
                            src={image.url}
                            alt="product"
                            width={300}
                            height={300}
                            className="w-full h-32 object-cover border"
                          />
                        )
                      )}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-black text-white py-3 mt-2"
                  >
                    {saving
                      ? 'Saving...'
                      : editingProductId
                      ? 'Update Jersey'
                      : 'Create Jersey'}
                  </button>

                </form>
              </div>
            )}

            <div className="bg-white border overflow-hidden">

              <div className="hidden md:grid grid-cols-12 border-b bg-[#fafafa] text-sm font-medium">

                <div className="col-span-5 p-4">
                  Product
                </div>

                <div className="col-span-2 p-4">
                  Price
                </div>

                <div className="col-span-2 p-4">
                  Stock
                </div>

                <div className="col-span-3 p-4 text-right">
                  Actions
                </div>
              </div>

              {products.map((product) => (
                <div
                  key={product._id}
                  className="grid grid-cols-1 md:grid-cols-12 border-b items-center"
                >

                  <div className="col-span-5 p-4 flex items-center gap-4">

                    <Image
                      src={
                        product.images?.[0]
                          ?.url ||
                        '/placeholder.png'
                      }
                      alt={product.name}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover border"
                    />

                    <div>
                      <h3 className="font-medium">
                        {product.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.teamName}
                      </p>
                    </div>
                  </div>

                  <div className="col-span-2 px-4 pb-4 md:pb-0">
                    ৳{product.price}
                  </div>

                  <div className="col-span-2 px-4 pb-4 md:pb-0">
                    {product.stock}
                  </div>

                  <div className="col-span-3 p-4 flex md:justify-end gap-2">

                    <button
                      onClick={() =>
                        handleEditProduct(
                          product
                        )
                      }
                      className="border px-4 py-2 text-sm"
                    >
                      Update
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteProduct(
                          product._id
                        )
                      }
                      className="bg-black text-white px-4 py-2 text-sm"
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-white border overflow-hidden">

            <div className="hidden md:grid grid-cols-12 border-b bg-[#fafafa] text-sm font-medium">

              <div className="col-span-4 p-4">
                Name
              </div>

              <div className="col-span-4 p-4">
                Email
              </div>

              <div className="col-span-2 p-4">
                Role
              </div>

              <div className="col-span-2 p-4 text-right">
                Actions
              </div>
            </div>

            {users.map((user) => (
              <div
                key={user._id}
                className="grid grid-cols-1 md:grid-cols-12 border-b items-center"
              >

                <div className="col-span-4 p-4">
                  {user.name}
                </div>

                <div className="col-span-4 px-4 pb-4 md:pb-0 text-sm text-gray-600">
                  {user.email}
                </div>

                <div className="col-span-2 px-4 pb-4 md:pb-0 capitalize">
                  {user.role}
                </div>

                <div className="col-span-2 p-4 flex md:justify-end gap-2">

                  <button
                    onClick={() =>
                      handleRoleUpdate(
                        user._id,
                        user.role ===
                          'admin'
                          ? 'user'
                          : 'admin'
                      )
                    }
                    className="border px-4 py-2 text-sm"
                  >
                    Change Role
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteUser(
                        user._id
                      )
                    }
                    className="bg-black text-white px-4 py-2 text-sm"
                  >
                    Delete
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