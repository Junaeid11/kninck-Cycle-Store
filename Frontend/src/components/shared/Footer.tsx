import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";

import logo from "../../assets/—Pngtree—logo bike cycling mtb isolated_5209109.png"; 

const Footer = () => {
  return (
    <footer className="bg-[#96c6e9cb] text-[#333] px-6 md:px-16 pt-12 pb-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image src={logo} alt="EcoElectric Logo" width={40} height={40} />
            <div>
              <h2 className="text-lg font-bold text-red-600">Krinck Store</h2> 
            </div>
          </div>
          <p className="text-sm text-gray-600">
            Delivering high-quality electric scooters and bikes at competitive prices, ensuring exceptional value for customers.
          </p>
          <div className="flex gap-3 mt-4">
            <button className="bg-red-100 p-2 rounded-md">
              <Facebook className="text-red-600 w-5 h-5" />
            </button>
            <button className="bg-red-100 p-2 rounded-md">
              <Twitter className="text-red-600 w-5 h-5" />
            </button>
            <button className="bg-red-100 p-2 rounded-md">
              <Instagram className="text-red-600 w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products */}
        <div>
          <h3 className="font-bold text-red-500 mb-4">Products</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li><Link href="#">Electric Scooters</Link></li>
            <li><Link href="#">Electric Bikes</Link></li>
            <li><Link href="#">Used Electric Scooters</Link></li>
            <li><Link href="#">Used Electric Bikes</Link></li>
            <li><Link href="#">Accessories</Link></li>
            <li><Link href="#">Return Policy</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold text-red-500  mb-4">Quick Links</h3>
          <ul className="text-sm space-y-2 text-gray-700">
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Scooter and Bike FAQs</Link></li>
            <li><Link href="#">Reviews</Link></li>
            <li><Link href="#">Affiliates</Link></li>
            <li><Link href="#">Guides and Tips</Link></li>
            <li><Link href="#">Terms and Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="font-bold text-red-500   mb-4">Contact Us</h3>
          <ul className="text-sm space-y-4 text-gray-700">
            <li className="flex items-center gap-3">
              <span className="bg-green-100 p-2 rounded-md"><Phone className="text-green-600 w-4 h-4" /></span>
              (202) 555-0126
            </li>
            <li className="flex items-center gap-3">
              <span className="bg-green-100 p-2 rounded-md"><Mail className="text-green-600 w-4 h-4" /></span>
              ecoelectric@gmail.com
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-green-100 p-2 rounded-md mt-1"><MapPin className="text-green-600 w-4 h-4" /></span>
              4140 Parker Rd. Allentown,<br />New Mexico 31134
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="border-t mt-10 pt-4 flex flex-col lg:flex-row justify-between items-center text-sm text-gray-500">
        <p>© 2024 EcoElectric. All Rights Reserved.</p>
        <div className="flex gap-4 mt-2 lg:mt-0">
          </div>
      </div>
    </footer>
  );
};

export default Footer;
