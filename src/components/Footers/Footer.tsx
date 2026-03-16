"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import {
	CompanyName,
	CompanyShortName,
	filterCustomersByEmail,
} from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import { FiFacebook, FiTwitter, FiYoutube, FiInstagram } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";
import { SiDhl, SiVisa, SiPaypal, SiMastercard } from "react-icons/si";

interface footerDataProps {
	title: string;
	links: {
		label: string;
		href: string;
		function?: () => void;
	}[];
}

const Footer = () => {
	const { email } = useToken();
	const currentYear = new Date().getFullYear();
	const pathname = usePathname();
	const { data: customer, isLoading, isError } = useCustomer("");
	const wc_customer2_info: Woo_Customer_Type[] = customer ?? [];
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);
	const firstName = wc_customer_info?.first_name;

	const socialIcons = [
		{ id: 1, icon: <FiFacebook />, link: "#" },
		{ id: 2, icon: <FiTwitter />, link: "#" },
		{ id: 3, icon: <FiYoutube />, link: "#" },
		{ id: 4, icon: <FaPinterest />, link: "#" },
		{ id: 5, icon: <FiInstagram />, link: "#" },
	];

	const footerData: footerDataProps[] = [
		{
			title: "Quick Links", // Renamed for design consistency
			links: [
				{
					label: firstName ? "My Dashboard" : "Create Account",
					href: firstName ? "/user/dashboard" : "/user/register",
				},
				{
					label: "Order Tracking",
					href: "/user/my-orders",
				},
				{
					label: firstName ? "Log Out" : "Account Login",
					href: firstName ? "" : "/user/login",
					function: firstName ? signOut : undefined,
				},
			],
		},
		{
			title: "Help & Info", // Renamed for design consistency
			links: [
				{ label: "About Us", href: "/about" },
				{ label: "Technical FAQ", href: "/faq" },
				{ label: "Returns + Exchanges", href: "/terms-of-use?refund-policy" },
				{ label: "Shipping + Delivery", href: "/terms-of-use?delivery-return" },
			],
		},
	];

	return (
		<footer className='w-full bg-[#F9F3E5] border-t border-zinc-100 pt-20'>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-20'>
				{/* Column 1: Brand & Logo */}
				<div className='lg:col-span-4 space-y-8'>
					<div className='flex flex-col gap-4'>
						<LogoImage className='!w-[55px]' />
						<h2 className='text-zinc-900 font-bold uppercase tracking-[0.2em] text-lg'>
							{CompanyShortName}
						</h2>
					</div>

					<p className='text-zinc-400 text-[15px] leading-relaxed max-w-xs font-light'>
						Providing high-performance hardware and digital infrastructure
						solutions designed for precision and reliability.
					</p>

					<div className='flex gap-4'>
						{socialIcons.map((soc) => (
							<motion.a
								key={soc.id}
								href={soc.link}
								whileHover={{ y: -2, color: "#000", borderColor: "#000" }}
								className='text-zinc-400 text-lg border border-zinc-200 rounded-full size-10 flex items-center justify-center transition-all'
							>
								{soc.icon}
							</motion.a>
						))}
					</div>
				</div>

				{/* Columns 2 & 3: Mapped Links */}
				{footerData.map((section, idx) => (
					<div
						key={idx}
						className={
							idx === 0 ? "lg:col-span-2 space-y-8" : "lg:col-span-3 space-y-8"
						}
					>
						<h5 className='text-zinc-900 text-[14px] font-medium uppercase tracking-[0.15em]'>
							{section.title}
						</h5>
						<ul className='space-y-3'>
							{section.links.map((link, lIdx) => (
								<li key={lIdx}>
									<Link
										href={link.href}
										onClick={link.function}
										className='text-zinc-500 hover:text-black text-[13px] uppercase tracking-wide transition-colors font-light'
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}

				{/* Column 4: Contact Us (Static layout with your data) */}
				<div className='lg:col-span-3 space-y-8'>
					<h5 className='text-zinc-900 text-[14px] font-medium uppercase tracking-[0.15em]'>
						Contact Us
					</h5>
					<div className='space-y-6'>
						<div className='space-y-1'>
							<p className='text-zinc-400 text-[14px] font-light'>
								Do you have any questions or suggestions?
							</p>
							<Link
								href='/contact-us'
								className='text-zinc-900 font-medium text-[14px] border-b border-zinc-900 pb-0.5 inline-block'
							>
								Reach out to our team
							</Link>
						</div>
						<div className='space-y-1'>
							<p className='text-zinc-400 text-[14px] font-light'>
								Need technical support?
							</p>
							<p className='text-zinc-900 font-medium text-[14px]'>
								Available Mon - Fri
							</p>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar: Shipping, Payment & Copyright */}
			<div className='w-full border-t border-zinc-100 py-10 bg-[#F9F3E5]'>
				<div className='max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center gap-8'>
					{/* Left Side: Logistics/Payment */}
					<div className='flex flex-wrap items-center gap-x-10 gap-y-4 text-zinc-400 text-[12px] uppercase tracking-widest font-light'>
						<div className='flex items-center gap-4'>
							<span>We ship with:</span>
							<div className='flex items-center gap-3 text-zinc-900 text-2xl'>
								<SiDhl />
							</div>
						</div>
						<div className='flex items-center gap-4'>
							<span>Payment Option:</span>
							<div className='flex items-center gap-5 text-zinc-900 text-lg opacity-60'>
								<SiVisa />
								<SiPaypal />
								<SiMastercard />
							</div>
						</div>
					</div>

					{/* Right Side: Copyright */}
					<div className='text-center md:text-right'>
						<p className='text-zinc-400 text-[12px] font-light leading-relaxed'>
							© Copyright {currentYear} {CompanyName}. All rights reserved.
							<br />
							Powered by{" "}
							<span className='text-zinc-900 font-medium tracking-wide'>
								{CompanyName} Infrastructure
							</span>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
