"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { CompanyName, CompanyShortName, filterCustomersByEmail } from "@constants";
import { useCustomer } from "../lib/woocommerce";
import { LogoImage } from "@utils/function";
import { usePathname } from "next/navigation";
import {
	BiLogoFacebook,
	BiLogoLinkedin,
	BiLogoTiktok,
	BiLogoWhatsapp,
} from "react-icons/bi";

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
	const { data: customer } = useCustomer("");
	const wc_customer_info = filterCustomersByEmail(customer, email);
	const firstName = wc_customer_info?.first_name;

	const socialIcons = [
		{ id: 1, icon: <BiLogoTiktok />, link: "#" },
		{ id: 2, icon: <BiLogoWhatsapp />, link: "#" },
		{ id: 3, icon: <BiLogoFacebook />, link: "#" },
		{ id: 4, icon: <BiLogoLinkedin />, link: "#" },
	];

	const footerData: footerDataProps[] = [
		{
			title: "User Control",
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
					label: firstName ? "Secure Log Out" : "Account Login",
					href: firstName ? "" : "/user/login",
					function: firstName ? signOut : undefined,
				},
			],
		},
		{
			title: "Hardware Hub",
			links: [
				{ label: "About Vertexem", href: "/about" },
				{ label: "Technical FAQ", href: "/faq" },
				{ label: "Partner Program", href: "/contact-us" },
			],
		},
		{
			title: "Compliance",
			links: [
				{ label: "Terms of Use", href: "/terms-of-use?terms-of-use" },
				{ label: "Privacy Policy", href: "/terms-of-use?privacy-policy" },
				{ label: "Shipping Policy", href: "/terms-of-use?delivery-return" },
				{ label: "Returns & Refunds", href: "/terms-of-use?refund-policy" },
			],
		},
	];

	return (
		<footer className='w-full bg-[#121212] border-t border-zinc-800 pt-16'>
			<div className='max-w-[1440px] mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16'>
				{/* Brand Column */}
				<div className='lg:col-span-4 space-y-8'>
					<div className='flex flex-col gap-4'>
						<LogoImage className='!w-[45px] brightness-0 invert' />
						<h2 className='text-white font-black uppercase tracking-tighter text-xl'>
							{CompanyShortName}<span className='text-[#E83E44]'>.</span>
						</h2>
					</div>

					<p className='text-zinc-500 text-sm leading-relaxed max-w-xs font-medium'>
						The precision-engineered marketplace for high-performance hardware
						components and digital infrastructure.
					</p>

					<div className='flex gap-3'>
						{socialIcons.map((soc) => (
							<motion.a
								key={soc.id}
								href={soc.link}
								whileHover={{ y: -3, backgroundColor: "#E83E44" }}
								className='size-10 rounded-sm bg-zinc-800 flex items-center justify-center text-white text-xl transition-all'
							>
								{soc.icon}
							</motion.a>
						))}
					</div>
				</div>

				{/* Links Columns */}
				<div className='lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8'>
					{footerData.map((section, idx) => (
						<div key={idx} className='space-y-6'>
							<h5 className='text-white text-[11px] font-bold uppercase tracking-[0.25em] border-l-2 border-[#E83E44] pl-3'>
								{section.title}
							</h5>
							<ul className='space-y-3'>
								{section.links.map((link, lIdx) => (
									<li key={lIdx}>
										<Link
											href={link.href}
											onClick={link.function}
											className={`text-sm font-medium transition-all duration-300 ${
												pathname === link.href
													? "text-primary-400"
													: "text-zinc-500 hover:text-white"
											}`}
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>

			{/* 3. Bottom Bar: The "Technical Socket" */}
			<div className='w-full border-t border-zinc-800 py-10 bg-[#0A0A0A]'>
				<div className='max-w-[1440px] mx-auto px-6 lg:px-12 flex flex-col lg:flex-row justify-between items-center gap-8'>
					{/* Status Indicator */}
					<div className='flex items-center gap-6'>
						<div className='text-zinc-600 text-[10px] font-mono uppercase tracking-widest'>
							&copy; {currentYear} {CompanyName}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
