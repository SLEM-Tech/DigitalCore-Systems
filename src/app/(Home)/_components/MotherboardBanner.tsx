"use client";
import { machineImage } from "@public/images";
import Picture from "@src/components/picture/Picture";
import { useRouter } from "next/navigation";
import React from "react";

const MotherboardBanner = () => {
	const router = useRouter();

	return (
		<section className='w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-10'>
			<div className='flex flex-col lg:flex-row w-full min-h-[500px] overflow-hidden rounded-sm'>
				{/* LEFT COLUMN: CONTENT */}
				<div className='relative w-full lg:w-[45%] bg-[#121212] p-10 lg:p-20 flex flex-col justify-center items-start overflow-hidden'>
					{/* Decorative Technical Arcs (SVG or CSS) */}
					<div className='absolute top-0 right-0 w-64 h-64 border border-white/5 rounded-full -translate-y-1/2 translate-x-1/2' />
					<div className='absolute bottom-0 left-0 w-96 h-96 border border-white/5 rounded-full translate-y-1/3 -translate-x-1/4' />
					<div className='absolute bottom-10 left-10 w-48 h-48 border border-white/10 rounded-full' />

					{/* Text Content */}
					<div className='relative z-10 space-y-6'>
						<h2 className='text-3xl lg:text-5xl font-black text-white leading-tight'>
							Shop <br />
							Motherboard
						</h2>

						<p className='text-gray-400 text-sm lg:text-base leading-relaxed max-w-sm'>
							Set up your motherboard with precision using high-quality
							accessories and tools designed for smooth installation, optimal
							performance, and lasting system stability.
						</p>

						<button
							onClick={() => router.push("/category")}
							className='bg-[#E83E44] hover:bg-[#d32f35] text-white px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all active:scale-95 shadow-lg'
						>
							Explore Shop
						</button>
					</div>
				</div>

				{/* RIGHT COLUMN: PRODUCT IMAGE */}
				<div className='w-full lg:w-[55%] bg-[#F7F7F7] flex items-center justify-center p-8 lg:p-0'>
					<Picture
						src={machineImage} // Replace with your actual image path
						alt='MSI Pro Series Motherboard'
						className='w-full h-auto max-w-[600px] object-contain transition-transform duration-700 hover:scale-105'
					/>
				</div>
			</div>
		</section>
	);
};

export default MotherboardBanner;
