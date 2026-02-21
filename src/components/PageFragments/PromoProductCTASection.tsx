"use client";
import React, { useEffect, useState } from "react";
import { WooCommerce } from "@src/components/lib/woocommerce";
import ProductCard2 from "@src/components/Cards/ProductCard2";
import { FiChevronRight } from "react-icons/fi";

const PromoProductCTASection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPromoProducts = async () => {
      try {
        setIsLoading(true);
        const response = await WooCommerce.get(
          "products?per_page=3&orderby=popularity",
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching promo products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPromoProducts();
  }, []);

  return (
    <section className="w-full py-16 px-6 lg:px-20">
      <div className="max-w-[1540px] mx-auto bg-[#FFF1F3] rounded-[3.5rem] p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* LEFT SIDE: Products with Rounded White Boxes for Images */}
        <div className="w-full lg:w-[62%]">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="aspect-square bg-white animate-pulse rounded-[2.5rem]" />
                  <div className="h-4 w-2/3 bg-white/50 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard2
                  key={product.id}
                  id={product?.id}
                  image={product?.images[0]?.src}
                  oldAmount={product?.regular_price}
                  newAmount={product?.price}
                  description={product?.name}
                  imageBg="bg-white" // Force white box in this section
                />
              ))}
            </div>
          )}
        </div>

        {/* RIGHT SIDE: CTA Section */}
        <div className="flex flex-col items-start lg:w-[32%] space-y-10">
          <div className="space-y-3">
            <p className="text-[#A33D81] text-[12px] font-bold uppercase tracking-[0.15em]">
              Get 10% OFF On Your First Order
            </p>
            <h2 className="text-2xl lg:text-4xl font-black text-[#111111] leading-[1.1]">
              Order Now!
            </h2>
          </div>

          {/* Simple Stats Row */}
          <div className="flex items-start gap-12">
            {[
              { v: "1k+", l: "Items" },
              { v: "20", l: "Minutes" },
              { v: "30%", l: "Up to offers" },
            ].map((s, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="text-3xl font-bold text-[#111111] tracking-tighter">
                  {s.v}
                </span>
                <span className="text-[11px] font-bold text-gray-500 uppercase">
                  {s.l}
                </span>
              </div>
            ))}
          </div>

          <button className="group flex items-center justify-between gap-8 bg-[#A33D81] hover:bg-opacity-90 text-white pl-8 pr-3 py-3.5 rounded-full transition-all duration-300 shadow-xl shadow-[#A33D81]/20">
            <span className="text-sm font-bold uppercase tracking-widest">
              Order Now
            </span>
            <div className="bg-white/20 rounded-full p-2 group-hover:translate-x-1 transition-transform">
              <FiChevronRight size={20} />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PromoProductCTASection;
