"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "../ui/button";
import {
  LogOut,
  ShoppingCart,
  Menu,
  Home,
  Book,
  Contact,
  Info,
  Utensils,
  X,
  ChevronRight,
  CloudFog,
  Bot,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/services/AuthService";
import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
import { protectedRoutes } from "@/contants";
import { useAppSelector } from "@/redux/hooks";
import { orderedProductsSelector } from "@/redux/features/cartSlice";
import Image from "next/image";
import logo from "../../assets/—Pngtree—logo bike cycling mtb isolated_5209109.png";
import { motion, AnimatePresence } from "framer-motion";
import { IUser } from "@/types";
import { jwtDecode } from "jwt-decode";

export default function Navbar() {
  const [user, setUser] = useState<IUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const products = useAppSelector(orderedProductsSelector);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken") || document.cookie.split('; ').find(row => row.startsWith('accessToken='));

    if (accessToken) {
      const decoded: any = jwtDecode(accessToken);
      const userData: any = {
        _id: decoded.userId,
        name: decoded.name,
        email: decoded.email,
        role: decoded.role,
        isActive: decoded.isActive,

      };

      setUser(userData);
    }
  }, []);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    await logout();
    setUser(null);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.replace("/");
    }
  };


  const navLinks = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/find-products", label: "Products", icon: <Utensils className="w-5 h-5" /> },
    { href: "/blogs", label: "Blogs", icon: <Book className="w-5 h-5" /> },
    { href: "/contact", label: "Contact", icon: <Contact className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
    
  ];

  return (
    <header className="sticky bg-[#cee3fbf3] top-0 z-50 mx-5 shadow-md rounded-b-2xl">
      <div className="container mx-auto flex justify-between items-center h-16 px-5">
        <Link href="/" className="flex items-center  group">
          <div
          >
            <Image src={logo} height={150} width={70} alt="logo" />
          </div>

          <h1 className="text-2xl font-extrabold text-black ">
            Krinck Store
          </h1>
        </Link>


        <AnimatePresence>
          {isOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-16 left-0 w-full bg-white shadow-md p-5 z-50 md:hidden"
            >
              <ul className="flex flex-col gap-4 ">
                {navLinks.map(({ href, label, icon }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-2 p-3 rounded-md ${pathname === href ? "text-[#7a20e1] font-bold bg-indigo-100" : "text-black hover:text-[#7B2CBF]"}`}
                    >
                      {icon}
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {user?.email ? (

                <Button onClick={handleLogOut} className="rounded-full bg-amber-500 text-white">Logout</Button>

              ) : (
                <Link href="/login">
                  <Button className="rounded-full bg-red-500 hover:bg-amber-700 text-white">Login</Button>
                </Link>
              )}
            </motion.nav>
          )}
        </AnimatePresence>

        <nav className="hidden md:flex items-center  space-x-2">

  {navLinks.map(({ href, label }) => {
    const isActive = pathname === href;
    return (
      <Link
        key={href}
        href={href}
        className={`
          relative text-sm  px-3 py-2 rounded-md transition-all duration-300
          ${isActive
            ? "text-red-500 font-extrabold underline underline-offset-4"
            : "text-gray-700 hover:text-black "}
          group
        `}
      >
        {label}
        {!isActive && (
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-red-400 transition-all duration-300 group-hover:w-full" />
        )}
      </Link>
    );
  })}




          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center gap-2 ml-5 text-black hover:text-[#7B2CBF]"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              More
              <span className="text-lg">▼</span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-5 mt-2 w-[600px] bg-white shadow-lg rounded-lg p-4 z-50">
                <div className="grid grid-cols-3 gap-4">
                  {/* Category 1 */}
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#7B2CBF]">Explore Sections</h3>
                    <a href="#top-selling" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Top Selling Dishes
                    </a>
                    <a href="#delivery" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Delivery Section
                    </a>
                    <a href="#plans" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Plans Section
                    </a>
                  </div>

                  {/* Category 2 */}
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#7B2CBF]">More Features</h3>
                    <a href="#feature-meals" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Featured Meals
                    </a>
                    <a href="#partners" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Partners
                    </a>
                    <a href="#offers" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Offers & Discounts
                    </a>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2 text-[#7B2CBF]">Information</h3>
                    <a href="#blogs" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Recipe Blogs
                    </a>
                    <a href="#testimonials" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> Testimonials
                    </a>
                    <a href="#faq" className="flex items-center text-gray-600 hover:text-[#7B2CBF] transition">
                      <ChevronRight className="mr-2" size={16} /> FAQs
                    </a>
                  </div>
                </div>
              </div>
            )}

          </div>
        </nav>


        <div className="flex items-center space-x-4">
          {user?.role === "customer" && (
            <Link href="/order-meal">
              <Button variant="outline" className="rounded-full flex items-center gap-1">
                <ShoppingCart className="w-5 h-5" />
                <span className="text-[#E63946] font-bold">{products?.length ?? 0}</span>
              </Button>
            </Link>
          )}
          <div className="hidden lg:flex">
            {user?.email ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740" />
                    <AvatarFallback>User</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href={`/dashboard/${user?.role}/`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="bg-amber-400 text-black cursor-pointer" onClick={handleLogOut}>
                    <LogOut />
                    <span>Log Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/login">
                <Button className="rounded-full bg-red-500 hover:bg-red-400 text-white">Login</Button>
              </Link>
            )}
          </div>
        </div>
        <button className="md:hidden p-2 rounded-md" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>
    </header>
  );
}
