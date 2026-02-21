"use client";

import React from "react";
import { useCart } from "react-use-cart";
import Link from "next/link";
import Picture from "../picture/Picture";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { convertToSlug } from "@constants";

interface ProductCard2Props {
  id: string | number;
  image: string;
  oldAmount?: string;
  newAmount: string;
  description: string;
  category?: string;
  imageBg?: string; // Allow overriding the box color (e.g., white vs gray)
}

const ProductCard2 = ({
  id,
  image,
  oldAmount,
  newAmount,
  description,
  category = "Wireless Gaming Mouse",
  imageBg = "bg-white",
}: ProductCard2Props) => {
  const { addItem, getItem } = useCart();

  const ID = id.toString();
  const cartItem = getItem(ID);
  const quantity = cartItem?.quantity || 0;
  const price = parseInt(newAmount);
  const slugDesc = convertToSlug(description);

  const addToCart = () => {
    addItem({ id: ID, name: description, price, quantity: 1, image });
  };

  return (
    <div className="group flex flex-col w-full transition-all duration-300">
      {/* --- IMAGE CONTAINER: The "Rounded White Box" --- */}
      <div
        className={`relative aspect-square w-full ${imageBg} rounded-[2.5rem] flex items-center justify-center overflow-hidden mb-5 p-8 transition-transform duration-300 group-hover:-translate-y-1`}
      >
        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="w-full h-full flex items-center justify-center"
        >
          <Picture
            src={image}
            alt={description}
            className="object-contain w-full h-full transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        {/* Subtle Hover Action */}
        <div className="absolute inset-x-0 bottom-4 px-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart();
            }}
            className="w-full bg-primary text-white py-2.5 text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-lg"
          >
            {quantity > 0 ? `In Cart (${quantity})` : "Add to Cart"}
          </button>
        </div>
      </div>

      {/* --- CONTENT AREA: Sits on the Section Background --- */}
      <div className="flex flex-col space-y-1.5 px-2">
        <p className="text-[11px] text-gray-500 font-medium">{category}</p>

        <Link
          href={`/home-item/product/${slugDesc}-${id}`}
          className="text-[13px] font-bold text-[#111111] line-clamp-1 hover:text-primary transition-colors"
        >
          {description}
        </Link>

        <div className="flex flex-col 2xl:flex-row items-start 2xl:items-center gap-3">
          <span className="text-[#111111] font-bold text-base">
            {price ? <FormatMoney2 value={price} /> : "N/A"}
          </span>
          {oldAmount && parseInt(oldAmount) >= price && (
            <span className="text-xs line-through text-gray-400">
              <FormatMoney2 value={parseInt(oldAmount)} />
            </span>
          )}
        </div>

        {/* <div className="flex gap-5 pt-1">
          <span className="text-[11px] font-bold text-primary tracking-tight">
            12 Left
          </span>
          <span className="text-[11px] font-bold text-[#111111] tracking-tight">
            12 Left
          </span>
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard2;
