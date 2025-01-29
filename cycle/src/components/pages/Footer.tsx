import logo from "../../assets/—Pngtree—logo bike cycling mtb isolated_5209109.png";
const Footer = () => {
    return (
        <footer className="flex mx-auto mt-20 pt-20 h-full bg-white text-white flex-col space-y-10 justify-center m-10">
            
            
            <div className="flex place-content-center">
            <img src={logo}
                className="h-10 w-20 object-cover rounded-full"
            /><h1 className="text-black text-center font-extrabold text-3xl "> Krinck Store</h1>
            
            </div>
            
            
            <nav className="flex justify-center flex-wrap gap-6 text-gray-500 font-medium">
                <a className="hover:text-gray-900" href="/">Home</a>
                <a className="hover:text-gray-900" href="/product">Product</a>
                <a className="hover:text-gray-900" href="/about">About</a>
              
                <a className="hover:text-gray-900" href="#">Contact</a>
            </nav>

            <div className="flex justify-center space-x-5">
                <a href="https://www.facebook.com/junaeid.ahmed.450013" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600 hover:scale-110 transition-transform"
                    >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3.64l.36-4H14V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                </a>
                <a href="https://github.com/Junaeid11" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-800 hover:scale-110 transition-transform"
                    >
                        <path d="M9 19c-4.418 0-8-1.791-8-4 0-2.209 3.582-4 8-4s8 1.791 8 4c0 2.209-3.582 4-8 4z" />
                        <path d="M9 14v4" />
                        <circle cx="9" cy="9" r="4" />
                        <path d="M20 14v4" />
                        <circle cx="20" cy="9" r="4" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/junaeid-ahmed-tanim-765651285/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-700 hover:scale-110 transition-transform"
                    >
                        <path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-6a6 6 0 0 1 6-6z" />
                        <rect x="2" y="9" width="4" height="12" />
                        <circle cx="4" cy="4" r="2" />
                    </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-400 hover:scale-110 transition-transform"
                    >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 16.88 2c-2.57 0-4.66 2.16-4.66 4.82 0 .38.04.76.13 1.12A13.3 13.3 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.82A7.72 7.72 0 0 0 23 3z" />
                    </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-pink-600 hover:scale-110 transition-transform"
                    >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37a4 4 0 1 1-4.63-4.63 4 4 0 0 1 4.63 4.63z" />
                        <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                    </svg>
                </a>

               
            </div>
            <p className="text-center text-gray-700 font-medium mb-10">&copy; 2025 Noob Ltd. All rights reservered.</p>
        </footer>
    )
}

export default Footer
