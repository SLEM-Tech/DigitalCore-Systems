"use client";
import React, { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import { FiChevronLeft, FiChevronRight, FiShoppingCart } from "react-icons/fi";
import { useCart } from "react-use-cart";
import Link from "next/link";
import { convertToSlug } from "@constants";

/**
 * ProductCardCompact: Logic exactly mirrored from your working ProductCard2
 */
const ProductCardCompact = ({
  id,
  image,
  title,
  price: amount,
  rating,
  metric,
}: any) => {
  const { addItem, getItem } = useCart();

  // EXACT LOGIC FROM PRODUCTCARD2
  const ID = id.toString(); // Ensure ID is a string
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(amount); // Ensure price is a number
  const slugDesc = convertToSlug(title);

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Use the exact addItem structure from your reference
    addItem({ id: ID, name: title, price, quantity: 1, image });
  };

  return (
    <div className="group bg-white rounded-xl p-5 shadow-2xl shadow-black/[0.04] transition-all duration-300 hover:-translate-y-2 w-full flex flex-col">
      {/* Image Container */}
      <Link
        href={`/home-item/product/${slugDesc}-${id}`}
        className="relative aspect-square w-full bg-[#EFEFEF] rounded-xl overflow-hidden flex items-center justify-center p-6"
      >
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-sm z-10">
          <span className="text-[11px] font-bold text-gray-800">{rating}</span>
          <svg
            className="w-2.5 h-2.5 text-orange-400 fill-current"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </Link>

      {/* Content */}
      <div className="pt-6 pb-2">
        <div className="flex justify-between items-start mb-1">
          <Link
            href={`/home-item/product/${slugDesc}-${id}`}
            className="text-[#2D2D2D] poppins-medium text-base lg:text-lg truncate pr-2 hover:text-[#F58B3C] transition-colors"
          >
            {title}
          </Link>
          <span className="text-[#2D2D2D] poppins-medium text-base lg:text-lg shrink-0">
            {metric}
          </span>
        </div>

        <div className="flex justify-between items-center mt-4">
          <p className="text-[#F58B3C] poppins-semibold text-lg lg:text-xl">
            ₦{price ? price.toLocaleString() : ""}
          </p>

          <button
            onClick={addToCart}
            className="relative bg-[#F58B3C] text-white p-3 rounded-full shadow-lg shadow-orange-500/30 hover:bg-[#e17d2e] active:scale-90 transition-all"
          >
            <FiShoppingCart size={18} strokeWidth={3} />
            {/* Quantity Badge */}
            {quantity > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#2D2926] text-white text-[10px] font-bold size-5 flex items-center justify-center rounded-full border-2 border-white">
                {quantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        setIsLoading(true);
        const response = await WooCommerce.get(
          "products?per_page=12&orderby=date&order=desc",
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewArrivals();
  }, []);

  return (
    <section className="w-full flex flex-col items-center bg-[#F9F3E5] pb-32">
      <div className="w-full max-w-[1540px] px-6 lg:px-20 py-16 space-y-8">
        <h2 className="text-2xl lg:text-3xl poppins-medium text-[#2D2D2D] mb-8 ml-4">
          Popular{" "}
          <span className="relative">
            Now
            <span className="absolute left-0 -bottom-2 w-full h-1.5 bg-[#F58B3C] rounded-full"></span>
          </span>
        </h2>

        <div className="relative min-h-[400px]">
          {/* Layered Background Container */}
          <div className="bg-[#F9D9AA] w-full z-10 h-80 rounded-[30px] px-8 lg:px-16 py-16 lg:py-24 shadow-sm absolute -bottom-36 hidden lg:block"></div>

          <div className="relative z-20 w-[95%] lg:w-[90%] mt-16 mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-white/50 animate-pulse rounded-[2.5rem]"
                  />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {products.slice(0, 3).map((product: any) => (
                  <ProductCardCompact
                    key={product.id}
                    id={product.id} // Passing raw id, converted to string inside component
                    image={product?.images[0]?.src}
                    title={product?.name}
                    price={product?.price}
                    rating="4.8"
                    metric="21 K"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <GlobalLoader isPending={isPending} />
    </section>
  );
};

export default SortedProducts;
