"use client";
import React, {
  useMemo,
  useState,
  useTransition,
  Fragment,
  useRef,
  useEffect,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useCart } from "react-use-cart";
import { useAppDispatch, useAppSelector } from "../hooks";
import Drawer from "rc-drawer";
import { useCustomer } from "../lib/woocommerce";
import {
  currencyOptions,
  filterCustomersByEmail,
  headerNavLinks,
} from "@constants";
import { getFirstCharacter, signOut } from "@utils/lib";
import { LogoImage } from "@utils/function";
import Picture from "../picture/Picture";
import { APICall } from "@utils";
import { fetchExchangeRate } from "@utils/endpoints";
import { setBaseCurrency, setExchangeRate } from "../Redux/Currency";
import FormToast from "../Reusables/Toast/SigninToast";
import useToken from "../hooks/useToken";

// Headless UI Components
import { Menu, Transition } from "@headlessui/react";
import {
  FiSearch,
  FiShoppingBag,
  FiLogOut,
  FiMenu,
  FiShoppingCart,
  FiX,
} from "react-icons/fi";
import { SlArrowDown } from "react-icons/sl";
import Flag from "react-world-flags";
import GlobalLoader from "../modal/GlobalLoader";
import MobileNav from "./MobileNav";
import ProductTable from "../Tables/ProductTable";
import { FaCartArrowDown, FaShoppingBag } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { ImSpinner2 } from "react-icons/im";
import Link from "@node_modules/next/link";
import { logoImage } from "@public/images";

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email } = useToken();
  const { totalItems } = useCart();

  const { baseCurrency } = useAppSelector((state) => state.currency);
  const [isPending, startTransition] = useTransition();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [isSearchExpanded, setIsSearchExpanded] = useState(true);
  const searchRef = useRef<HTMLInputElement>(null);

  const { data: customer } = useCustomer("");
  const wc_customer_info = useMemo(
    () => filterCustomersByEmail(customer as Woo_Customer_Type[], email),
    [customer, email],
  );

  useEffect(() => {
    if (isSearchExpanded && searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearchExpanded]);

  const onOpenCart = () => setIsCartOpen(true);
  const onCloseCart = () => setIsCartOpen(false);

  const handleCurrencyChange = async (code: string) => {
    const selectedObj = currencyOptions.find((c) => c.code === code);
    if (!selectedObj) return;

    try {
      const data = await APICall(fetchExchangeRate, ["NGN", code], true, true);
      if (data) {
        dispatch(setExchangeRate(data));
        dispatch(setBaseCurrency(selectedObj));
        FormToast({ message: `Switched to ${code}`, success: true });
      }
    } catch (error) {
      FormToast({ message: "Currency switch failed", success: false });
    }
  };

  const handleSearch = () => {
    if (!searchValue) return;
    startTransition(() => {
      router.push(`/search?q=${searchValue}`);
    });
  };

  const userDropDownLinks = [
    { id: 1, href: "/user/dashboard", icon: <BiUser />, label: "My Account" },
    {
      id: 2,
      href: "/user/my-orders",
      icon: <FaCartArrowDown />,
      label: "Orders",
    },
    { id: 3, onClick: onOpenCart, icon: <FiShoppingCart />, label: "Cart" },
  ];

  return (
    <>
      <header className="flex flex-col w-full bg-[#F9F3E5] z-[100] fixed top-0 transition-all duration-300">
        {/* Main Desktop Header */}
        <div className="hidden slg:flex items-center justify-between w-full py-4 max-w-[1440px] px-16 mx-auto gap-4">
          {/* 1. Logo Section */}
          <div className="shrink-0">
            <Link href="/">
              <Picture
                src={logoImage}
                alt="logo"
                priority
                loading="lazy"
                className={`w-48 duration-300 hover:scale-105 transition-[.3] hover:animate-pulse`}
              />
            </Link>
          </div>

          {/* 2. Navigation Section */}
          <nav className="flex items-center gap-12 ml-auto pr-10">
            {headerNavLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={`poppins-medium transition-colors hover:text-[#E68A45] ${
                  pathname === link.href || link.text === "About us"
                    ? "text-[#E68A45]"
                    : "text-[#111111]"
                }`}
              >
                {link.text}
              </Link>
            ))}
          </nav>

          {/* 3. Search Bar */}
          <div className="relative flex items-center w-full max-w-[340px]">
            <div className="flex items-center w-full rounded-full bg-white px-6 py-3.5 shadow-sm border border-gray-100/50 transition-all focus-within:shadow-md">
              <FiSearch className="text-black text-xl mr-3 shrink-0" />
              <input
                ref={searchRef}
                type="text"
                placeholder="Cappuccino"
                className="w-full bg-transparent text-[15px] text-gray-800 outline-none placeholder:text-gray-400 font-medium"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              {isPending && (
                <ImSpinner2 className="text-gray-400 animate-spin size-4 ml-2 shrink-0" />
              )}
            </div>
          </div>

          {/* 4. Cart & User Controls */}
          <div className="flex items-center gap-6 shrink-0">
            <div
              className="flex items-center cursor-pointer relative group p-2"
              onClick={onOpenCart}
            >
              <FiShoppingCart
                size={28}
                className="text-black group-hover:text-[#E68A45] transition-colors"
              />
              {totalItems > 0 && (
                <span className="absolute top-1.5 right-0.5 size-3 bg-[#E68A45] rounded-full border-2 border-[#F9F3E5]"></span>
              )}
            </div>

            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center outline-none">
                <div className="size-10 rounded-full bg-white text-gray-700 flex items-center justify-center font-bold text-sm shadow-sm border border-gray-100 overflow-hidden hover:border-[#E68A45] transition-all">
                  {wc_customer_info?.shipping?.address_2 ? (
                    <Picture
                      src={wc_customer_info.shipping.address_2}
                      alt="user"
                      className="size-full object-cover"
                    />
                  ) : (
                    getFirstCharacter(wc_customer_info?.first_name || "U")
                  )}
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition duration-200 ease-out"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
              >
                <Menu.Items className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-[110] outline-none">
                  <div className="px-4 py-3 border-b border-gray-50 mb-1">
                    <p className="text-sm font-bold text-black">
                      {wc_customer_info?.first_name || "Guest User"}
                    </p>
                  </div>
                  <div className="space-y-1">
                    {userDropDownLinks.map((item) => (
                      <Menu.Item key={item.id}>
                        {({ active }) => (
                          <button
                            onClick={(e) => {
                              if (item.onClick) {
                                e.preventDefault();
                                item.onClick();
                              } else if (item.href) {
                                router.push(item.href);
                              }
                            }}
                            className={`${active ? "bg-[#F9F3E5] text-[#E68A45]" : "text-gray-600"} flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all`}
                          >
                            {item.label}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                  <Menu.Item>
                    <button
                      onClick={() => signOut()}
                      className="w-full text-left px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl mt-1 transition-all"
                    >
                      Log Out
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="slg:hidden flex flex-col w-full p-6 gap-5 bg-[#F9F3E5] border-b border-black/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <button
                onClick={() => setDrawerVisible(true)}
                className="p-2 rounded-xl bg-white shadow-sm border border-gray-100"
              >
                <FiMenu className="text-2xl text-black" />
              </button>
              <div className="shrink-0">
                <Link href="/">
                  <Picture
                    src={logoImage}
                    alt="logo"
                    priority
                    loading="lazy"
                    className={`w-32 duration-300 hover:scale-105 transition-[.3] hover:animate-pulse`}
                  />
                </Link>
              </div>
            </div>
            <div
              onClick={onOpenCart}
              className="relative p-3 rounded-xl bg-white shadow-sm border border-gray-100"
            >
              <FiShoppingCart className="text-2xl text-black" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 size-5 bg-[#E68A45] border-2 border-[#F9F3E5] rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Cappuccino"
              className="w-full h-14 text-[16px] bg-white text-black rounded-full px-14 border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-[#E68A45]/20"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-black text-xl" />
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <Drawer
        open={isCartOpen}
        onClose={onCloseCart}
        placement="right"
        width={
          typeof window !== "undefined" && window.innerWidth > 768
            ? 500
            : "100%"
        }
        className="bg-white shadow-2xl"
      >
        <ProductTable onClose={onCloseCart} />
      </Drawer>

      <GlobalLoader isPending={isPending} />
      <MobileNav
        closeDrawer={() => setDrawerVisible(false)}
        drawerVisible={drawerVisible}
      />
    </>
  );
};

export default Header;
