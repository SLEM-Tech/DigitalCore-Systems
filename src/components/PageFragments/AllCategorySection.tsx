"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import { Rubik } from "next/font/google";
import HeroCarousel from "../Cards/HeroCarousel";
import AboutUs from "./AboutUs";
import StatsSection from "./StatsSection";
import WhyChooseUs from "./WhyChooseUs";
import { FiCheckCircle, FiArrowRight, FiShoppingCart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const rubik = Rubik({
	subsets: ["latin-ext"],
	weight: ["300", "400", "500", "600", "700", "800", "900"],
	display: "swap",
});

const AllCategorySection = () => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [maxScrollTotal, setMaxScrollTotal] = useState(0);
	const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const dispatch = useDispatch();
	const router = useRouter();

	// State to hold products by category
	const [categoryProductsMap, setCategoryProductsMap] = useState<{
		[key: string]: ProductType[];
	}>({});
	// WooCommerce API Category
	const {
		data: categories,
		isLoading: categoryWpIsLoading,
		isError: categoryIsError,
	} = useCategories("");

	const Categories: CategoryType[] = categories ?? [];
	const TotalCatgory = Categories?.length - 1;

	useEffect(() => {
		const fetchCategoryProducts = async () => {
			try {
				setIsLoading(true);

				const filteredCategories = categories
					?.filter((category: CategoryType) => category?.count > 0)
					?.slice(0, 5);

				if (filteredCategories) {
					const productsPromises = filteredCategories.map(
						async (category: CategoryType) => {
							const response = await WooCommerce.get(
								`products?category=${category?.id}`,
							);

							// Check if there is at least one product in the category
							const firstProductImage =
								response?.data.length > 0
									? response?.data[0]?.images[0]?.src
									: null;

							return {
								categoryId: category?.id,
								firstProductImage: firstProductImage,
							};
						},
					);

					const productsResults = await Promise.all(productsPromises);

					// Update the state with the first product images mapped by category
					const productsMap = productsResults.reduce(
						(acc: any, result: any) => ({
							...acc,
							[result.categoryId]: result.firstProductImage,
						}),
						{},
					);

					setCategoryProductsMap(productsMap);
				}
			} catch (error) {
				console.error("Error fetching category products:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (categories?.length) {
			fetchCategoryProducts();
		}
	}, [categories]);

	const handleNext = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);

			sliderRef.current.scrollLeft += 600;
			setCurrentIndex((prevIndex) =>
				prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
			);
		}
	};

	const handlePrev = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
			const maxScroll = scrollWidth - clientWidth;
			setScrollLeftTotal(scrollLeft);
			setMaxScrollTotal(maxScroll);
			if (scrollLeft > 0) {
				sliderRef.current.scrollLeft -= 600;
				setCurrentIndex((prevIndex) =>
					prevIndex > 0 ? prevIndex - 1 : prevIndex,
				);
			}
		}
	};

	return (
		<>
			<section className='w-full min-h-[85vh] flex flex-col lg:flex-row bg-[#F9F3E5] overflow-hidden relative'>
				{/* LEFT COLUMN: CONTENT */}
				<div className='w-full lg:w-[55%] flex flex-col justify-center px-6 py-16 lg:pl-16 lg:pr-12 z-10'>
					<div className='max-w-xl space-y-4 lg:space-y-6'>
						<h1
							className={`poppins-semibold text-3xl lg:text-5xl text-[#2D2926] space-y-1 lg:space-y-3 tracking-tight`}
						>
							<span className='block'>
								Enjoy your <span className='text-[#E68A45]'>comfort</span>{" "}
							</span>
							{/* <br className="hidden lg:block" /> */}
							<span className='block'>before your activity</span>
						</h1>

						<p className='text-[#2D2926]/60 text-base lg:text-xl font-medium leading-relaxed max-w-md'>
							Boost your productivity and build your{" "}
							<br className='hidden lg:block' /> mood with an order from us
						</p>

						<div className='flex items-center gap-8 pt-6'>
							{/* Order Now Button with Cart Badge */}
							<button
								onClick={() => router.push("/category")}
								className='flex items-center gap-3 bg-[#2D2926] text-white pl-8 pr-2 py-2 rounded-full poppins-medium transition-all hover:bg-black active:scale-95 shadow-xl shadow-black/10'
							>
								<span className='text-sm lg:text-[15px]'>Order now</span>
								<div className='bg-[#E68A45] p-2.5 rounded-full flex items-center justify-center'>
									<FiShoppingCart size={14} className='text-white' />
								</div>
							</button>

							{/* More Menu Link */}
							<button
								onClick={() => router.push("/category")}
								className='text-[#E68A45] poppins-medium text-sm lg:text-[15px] hover:underline transition-all'
							>
								More menu
							</button>
						</div>
					</div>
				</div>

				{/* RIGHT COLUMN: IMAGE & FLOATING BADGES */}
				<div className='w-full lg:w-[45%] relative flex items-center justify-center lg:justify-start'>
					<div className='relative w-full max-w-[550px] lg:max-w-none h-full flex items-center'>
						{/* The Main Device Image */}
						<div className='relative z-10 scale-110 lg:scale-[1.2] lg:translate-x-[-10%] lg:pt-36 lg:pr-16 pl-16 lg:pl-0'>
							<Picture
								src={heroBg}
								alt='Product View'
								className='w-3/4 lg:w-full h-auto object-contain'
							/>
						</div>

						{/* Floating Label: 18K */}
						<div className='absolute left-0 lg:-left-28 bottom-[10%] lg:bottom-[5%] z-20 bg-white px-8 py-2 rounded-[30px] shadow-2xl shadow-black/5 border border-white'>
							<span className='text-black poppins-semibold text-base lg:text-lg'>
								18K
							</span>
						</div>

						{/* Floating Label: Rating */}
						<div className='absolute right-6 lg:right-16 top-8 lg:top-[40%] z-20 bg-white px-6 py-1.5 rounded-[30px] shadow-2xl shadow-black/5 border border-white flex items-center gap-2'>
							<span className='text-black poppins-semibold text-base lg:text-lg'>
								4.8
							</span>
							<FaStar className='text-[#E68A45] text-xl' />
						</div>
					</div>
				</div>
			</section>

			{/* <StatsSection /> */}
		</>
	);
};

export default AllCategorySection;
