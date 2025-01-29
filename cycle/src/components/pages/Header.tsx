import { Link, NavLink } from "react-router";
import { Button } from "../ui/button";

import logo from "../../assets/—Pngtree—logo bike cycling mtb isolated_5209109.png";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { logout, selectCurrentUser } from "../../redux/services/auth/authSlice";
import { CartData } from "./CartData";




export default function Header() {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectCurrentUser) as { role: string } | null;
  return (
    <div className="container  mx-auto px-4 md:px-6 lg:px-8">
      <header className="flex  h-20 w-full shrink-0 items-center px-4 lg:px-6">
       <div className=" justify-between flex w-full">
       <div className=" flex">
          <img
            src={logo}
            className="h-10 w-20 object-cover rounded-full"
          />
    <h1 className="text-purple-700 lg:text-4xl font-extrabold">krinck Store</h1>
        </div>
    
       <div className="flex ">
       <Link to="/">
            <Button variant="link" className="px-2 py-1 text-xs">
              Home
            </Button>
          </Link>
          <Link to="/about">
            <Button variant="link" className="px-2 py-1 text-xs">
              About
            </Button>
          </Link>
       </div>
       </div>
        <div className="ml-auto text-end mt-15  lg:mt-0 lg:flex gap-2">
       

           {user?.role ==="customer" ?
           
          <CartData/>
          :
          null
          
          }

          {user ? (
            
            <div className="drawer drawer-end z-50">
              
              <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
              <div className="lg:drawer-content ">
                <label htmlFor="dashboard-drawer" className="drawer-button btn btn-primary">
                  Dashboard
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="dashboard-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>
                <ul className="bg-white shadow-lg rounded-lg lg:w-1/5 h-1/2 text-black">
                  <li className="text-left p-2"><span className="font-extrabold text-l">USER:</span><span className="text-red-500">{user?.role}</span></li>
                  <li className="text-center bg-blue-600 text-white text-2xl font-bold my-4">
                    Profile
                  </li>
                  {user.role === "admin" ? (
                    <>
                      <li className="text-left font-bold pl-5">
                        <NavLink to="/create-product">Add Product</NavLink>
                      </li>
                      <li className="text-left font-bold pl-5">
                        <NavLink to="/all-orders">Orders</NavLink>
                      </li>
                      <li className="text-left font-bold pl-5">
                        <NavLink to="/users">Users</NavLink>
                      </li>
                    </>
                  ) : (
                    <>
                    <li className="text-left font-bold pl-5">
                        <NavLink to="/my-order">
                         View Order
                        </NavLink>
                      </li>
                      <li className="text-left font-bold pl-5">
                        <NavLink to="/change-password">
                         Change password
                        </NavLink>
                      </li>
                      
                    </>
                  )}
                </ul>
              </div>
            </div>
          ) : null}






          {user ? (
            
            <Button onClick={() => dispatch(logout())}>
              logOut
            </Button>

            ) : (
              <>
                <NavLink to="/login">
                  <Button
    
                    className="grid lg:flex justify-self-end px-2 py-1 text-xs"
                  >
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/register">
                  <Button>
                    <Link to="/register">Register</Link>
                  </Button>
                </NavLink>
              </>
            )}
   
         
        </div>
      </header>
    </div>
  );
}


