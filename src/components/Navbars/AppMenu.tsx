"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { MdInventory, MdStorefront } from "react-icons/md";
import Drawer from "rc-drawer";
import "rc-drawer/assets/index.css";
import ProductTable from "../Tables/ProductTable";
import { useCart } from "react-use-cart";
import useToken from "../hooks/useToken";
import { signOut } from "@utils/lib";
import { useCustomer, useOrders } from "../lib/woocommerce";
import { filterCustomersByEmail } from "@constants";
import {
	FiHome,
	FiShoppingBag,
	FiBox,
	FiShoppingCart,
	FiUser,
	FiLogIn,
	FiGrid,
	FiPackage,
	FiCpu,
} from "react-icons/fi";

const AppMenu = () => {
	const pathname = usePathname();
	const router = useRouter();
	const { totalItems } = useCart();
	const { data: customer, isLoading, isError } = useCustomer("");

	const { email } = useToken();
	const wc_customer2_info: Woo_Customer_Type[] = customer ?? [];
	const wc_customer_info: Woo_Customer_Type | undefined =
		filterCustomersByEmail(wc_customer2_info, email);
	const firstName = wc_customer_info?.first_name;
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
	const [activeTab, setActiveTab] = useState(pathname);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;
	const isLoggedIn = !!firstName;

	const onOpenCart = () => setIsCartOpen(true);
	const onCloseCart = () => setIsCartOpen(false);

	const handleTabClick = (url: string, onClick?: () => void) => {
		if (onClick) {
			onClick();
		} else if (url) {
			setActiveTab(url);
			router.push(url);
		}
	};

	const {
		data: ordersData,
		isLoading: isLoadingOrders,
		isError: isErrorOrders,
	} = useOrders(undefined, currentPage, itemsPerPage);

	const OrderData: OrderGetType[] = ordersData?.data;
	const totalOrderedItems = ordersData?.totalItems || 0;

	const mobileHeaderLinkUrl = [
		{
			id: "home",
			url: "/",
			link: "Home",
			// FiGrid feels like a system dashboard/hub rather than just a 'house'
			icon: FiGrid,
			onClick: () => handleTabClick("/"),
		},
		{
			id: "shop",
			url: totalOrderedItems > 0 ? "/user/my-orders" : "/category",
			link: totalOrderedItems > 0 ? "Orders" : "Shop",
			// FiCpu is the perfect 'Hardware' metaphor for a components shop
			// FiPackage represents the industrial/hardware shipping aspect
			icon: totalOrderedItems > 0 ? FiPackage : FiCpu,
			onClick:
				totalOrderedItems > 0
					? () => handleTabClick("/user/my-orders")
					: () => handleTabClick("/category"),
		},
		{
			id: "cart",
			url: "#cart",
			link: "Cart",
			// FiShoppingBag looks sleeker and more 'boutique tech' than a cart
			icon: FiShoppingBag,
			badge: totalItems,
			onClick: onOpenCart,
		},
		{
			id: "account",
			url: isLoggedIn ? "#account" : "/user/login",
			link: isLoggedIn ? "Account" : "Login",
			// FiUser is consistent, but you could use FiTarget for a more modern look
			icon: isLoggedIn ? FiUser : FiLogIn,
			onClick: isLoggedIn
				? () => handleTabClick("/user/dashboard")
				: () => handleTabClick("/user/login"),
		},
	];

	return <></>;
};

export default AppMenu;
