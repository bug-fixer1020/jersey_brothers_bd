'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailsPage() {
  const params = useParams();

  const [product, setProduct] =
    useState(null);

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedImage, setSelectedImage] =
    useState('/placeholder.png');

  const [selectedSize, setSelectedSize] =
    useState('');

  const [quantity, setQuantity] =
    useState(1);

  const [showFaq, setShowFaq] =
    useState(false);

  const [showReviewPopup, setShowReviewPopup] =
    useState(false);

  const [reviewForm, setReviewForm] =
    useState({
      name: '',
      rating: 5,
      comment: '',
    });

  useEffect(() => {
    async function loadData() {
      try {
        const [productRes, productsRes] =
          await Promise.all([
            fetch(
              `/api/products/${params.id}`
            ),
            fetch('/api/products'),
          ]);

        const productData =
          await productRes.json();

        const productsData =
          await productsRes.json();

        setProduct(productData);

        setProducts(productsData || []);

        setSelectedImage(
          productData?.images?.[0]?.url ||
            '/placeholder.png'
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      loadData();
    }
  }, [params?.id]);

  const handleAddToCart = () => {
    const cart =
      JSON.parse(
        localStorage.getItem('cart')
      ) || [];

    const exists = cart.find(
      (item) => item._id === product._id
    );

    let updatedCart = [];

    if (exists) {
      updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity:
                item.quantity + quantity,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity,
          selectedSize,
        },
      ];
    }

    localStorage.setItem(
      'cart',
      JSON.stringify(updatedCart)
    );

    alert('Added To Cart');
  };

  const handleFavorite = () => {
    const favorites =
      JSON.parse(
        localStorage.getItem(
          'favorites'
        )
      ) || [];

    const exists = favorites.find(
      (item) => item._id === product._id
    );

    if (exists) {
      alert(
        'Already Added To Favorite'
      );

      return;
    }

    favorites.push(product);

    localStorage.setItem(
      'favorites',
      JSON.stringify(favorites)
    );

    alert('Added To Favorite');
  };

  const handleAddReview = () => {
    if (
      !reviewForm.name ||
      !reviewForm.comment
    ) {
      alert('Please fill all fields');

      return;
    }

    const updatedProduct = {
      ...product,
      reviews: [
        ...(product.reviews || []),
        reviewForm,
      ],
    };

    setProduct(updatedProduct);

    setReviewForm({
      name: '',
      rating: 5,
      comment: '',
    });

    setShowReviewPopup(false);

    alert('Review Added');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">

      {/* REVIEW POPUP */}

      {showReviewPopup && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">

          <div className="bg-white w-full max-w-lg p-8 relative">

            <button
              onClick={() =>
                setShowReviewPopup(false)
              }
              className="absolute top-4 right-4 text-2xl"
            >
              ×
            </button>

            <h2 className="text-2xl font-semibold mb-6">
              Add Review
            </h2>

            <div className="space-y-5">

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Your Name
                </label>

                <input
                  type="text"
                  value={reviewForm.name}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Rating
                </label>

                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      rating: Number(
                        e.target.value
                      ),
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 outline-none"
                >
                  <option value={5}>
                    5 Star
                  </option>

                  <option value={4}>
                    4 Star
                  </option>

                  <option value={3}>
                    3 Star
                  </option>

                  <option value={2}>
                    2 Star
                  </option>

                  <option value={1}>
                    1 Star
                  </option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Comment
                </label>

                <textarea
                  rows="5"
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      comment:
                        e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 px-4 py-3 outline-none resize-none"
                />
              </div>

              <button
                onClick={handleAddReview}
                className="w-full bg-black text-white py-3"
              >
                Submit Review
              </button>

            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">

          {/* LEFT */}

          <div>

            <div className="bg-gray-100 border overflow-hidden">

              <Image
                src={selectedImage}
                alt={product.name}
                width={1000}
                height={1000}
                priority
                className="w-full h-[650px] object-cover"
              />
            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto">

              {product.images?.map(
                (image, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedImage(
                        image.url
                      )
                    }
                    className={`border overflow-hidden ${
                      selectedImage ===
                      image.url
                        ? 'border-black'
                        : 'border-gray-200'
                    }`}
                  >

                    <Image
                      src={image.url}
                      alt="thumb"
                      width={100}
                      height={100}
                      className="w-[90px] h-[90px] object-cover"
                    />

                  </button>
                )
              )}
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-7">

            <div>

              <p className="uppercase tracking-[4px] text-sm text-gray-500">
                Premium Football Jersey
              </p>

              <h1 className="text-4xl md:text-5xl font-semibold mt-4 leading-tight">
                {product.name}
              </h1>

              {/* STARS */}

              <div className="flex items-center gap-1 mt-5">

                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <span
                      key={star}
                      className={`text-2xl ${
                        star <= 4
                          ? 'text-yellow-500'
                          : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  )
                )}

                <span className="text-gray-500 ml-3">
                  (
                  {product.reviews
                    ?.length || 0}{' '}
                  Reviews)
                </span>
              </div>

              {/* PRICE */}

              <div className="flex items-center gap-4 mt-6">

                <h2 className="text-4xl font-bold">
                  ৳
                  {product.offerPrice ||
                    product.price}
                </h2>

                {product.offerPrice >
                  0 && (
                  <p className="text-xl text-gray-400 line-through">
                    ৳{product.price}
                  </p>
                )}
              </div>

              <p className="mt-5 text-gray-600">
                Stock Available:{' '}
                <span className="font-semibold text-black">
                  {product.stock}
                </span>
              </p>
            </div>

            {/* SIZE */}

            <div>

              <h3 className="font-medium mb-4">
                Select Size
              </h3>

              <div className="flex flex-wrap gap-3">

                {product.availableSizes?.map(
                  (size, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setSelectedSize(
                          size
                        )
                      }
                      className={`px-5 py-3 border text-sm transition ${
                        selectedSize ===
                        size
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* QUANTITY */}

            <div>

              <h3 className="font-medium mb-4">
                Quantity
              </h3>

              <div className="flex items-center border w-fit">

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev > 1
                        ? prev - 1
                        : 1
                    )
                  }
                  className="px-5 py-3 border-r"
                >
                  -
                </button>

                <span className="px-8">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      prev + 1
                    )
                  }
                  className="px-5 py-3 border-l"
                >
                  +
                </button>
              </div>
            </div>

            {/* BUTTONS */}

            <div className="flex items-center gap-3 pt-3">

              <button
                onClick={handleAddToCart}
                className="bg-black text-white px-8 py-3 text-sm font-medium hover:opacity-90 transition"
              >
                Buy Now
              </button>

              <button
                onClick={handleAddToCart}
                className="border border-gray-300 px-4 py-3 text-sm hover:bg-gray-100 transition"
              >
                Cart
              </button>

              <button
                onClick={handleFavorite}
                className="border border-gray-300 px-4 py-3 text-sm hover:bg-gray-100 transition"
              >
                ♥
              </button>

            </div>

            {/* DESCRIPTION */}

            <div className="border-t pt-8">

              <h3 className="text-xl font-semibold mb-4">
                Description
              </h3>

              <p className="text-gray-600 leading-8">
                {product.description}
              </p>
            </div>

            {/* FAQ */}

            <div className="border-t pt-8">

              <button
                onClick={() =>
                  setShowFaq(!showFaq)
                }
                className="w-full flex items-center justify-between"
              >

                <h3 className="text-xl font-semibold">
                  FAQ
                </h3>

                <span className="text-2xl">
                  {showFaq ? '-' : '+'}
                </span>

              </button>

              {showFaq && (

                <div className="mt-6 space-y-5 text-gray-600 leading-7">

                  <div>
                    <h4 className="font-semibold text-black">
                      Is this original quality?
                    </h4>

                    <p>
                      Yes. Premium export quality jersey.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-black">
                      Delivery time?
                    </h4>

                    <p>
                      Usually 2-5 working days.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-black">
                      Can I exchange size?
                    </h4>

                    <p>
                      Yes within 3 days.
                    </p>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        {/* REVIEWS */}

        <div className="mt-24 border-t pt-14">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

            <div>

              <h2 className="text-3xl font-semibold">
                Customer Reviews
              </h2>

              <p className="text-gray-500 mt-2">
                Real reviews from buyers
              </p>

            </div>

            <div className="flex items-center gap-4">

              <div className="text-right">

                <div className="flex items-center justify-end gap-1">

                  {[1,2,3,4,5].map((star)=>(
                    <span
                      key={star}
                      className="text-yellow-500 text-xl"
                    >
                      ★
                    </span>
                  ))}

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {product.reviews?.length || 0} Reviews
                </p>

              </div>

              <button
                onClick={() =>
                  setShowReviewPopup(true)
                }
                className="bg-black text-white px-6 py-3 text-sm"
              >
                Add Review
              </button>

            </div>
          </div>

          {product.reviews?.length > 0 ? (

            <div className="space-y-5">

              {product.reviews.map(
                (review, index) => (

                  <div
                    key={index}
                    className="border border-gray-200 p-6 bg-white"
                  >

                    <div className="flex items-start justify-between">

                      <div>

                        <h4 className="font-semibold text-lg">
                          {review.name}
                        </h4>

                        <p className="text-sm text-gray-500 mt-1">
                          Verified Purchase
                        </p>

                      </div>

                      <div className="flex gap-1">

                        {[1,2,3,4,5].map((star)=>(
                          <span
                            key={star}
                            className={`text-lg ${
                              star <= review.rating
                                ? 'text-yellow-500'
                                : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}

                      </div>
                    </div>

                    <p className="text-gray-700 leading-7 mt-5">
                      {review.comment}
                    </p>

                  </div>
                )
              )}

            </div>

          ) : (

            <div className="border border-dashed border-gray-300 p-14 text-center bg-gray-50">

              <h3 className="text-xl font-medium">
                No Reviews Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Be the first customer to review this jersey.
              </p>

            </div>

          )}
        </div>

        {/* BEST SELLING */}

        <div className="mt-24">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-semibold">
              Best Selling
            </h2>

          </div>

          <div className="flex gap-5 overflow-x-auto pb-2">

            {products
              .filter(
                (p) => p._id !== product._id
              )
              .slice(0, 8)
              .map((item, index) => (

                <div
                  key={item._id || index}
                  className="min-w-[280px] flex-shrink-0"
                >

                  <ProductCard
                    product={item}
                  />

                </div>
              ))}
          </div>
        </div>

        {/* ALL COLLECTION */}

        <div className="mt-24 pb-10">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-3xl font-semibold">
              All Collection
            </h2>

          </div>

          <div className="flex gap-5 overflow-x-auto pb-2">

            {products
              .slice(0, 10)
              .map((item, index) => (

                <div
                  key={item._id || index}
                  className="min-w-[280px] flex-shrink-0"
                >

                  <ProductCard
                    product={item}
                  />

                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}