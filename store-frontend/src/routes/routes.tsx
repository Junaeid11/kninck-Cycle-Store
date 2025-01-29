import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateProduct from "../pages/admin/CreateProduct";
import ProductsData from "../pages/admin/ProductsData";
import UsersData from "../pages/admin/UsersData";
import OrderVerification from "../components/pages/OrderVerification";
import ViewOrder from "../components/pages/ViewOrder";
import AllProducts from "../pages/customer/AllProducts";
import ProductDetails from "../pages/ProductDetails";
import ChangePassword from "../pages/customer/ChangePassword";
import Orders from "../pages/admin/Orders";
import About from "../pages/About";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        
    },
    {
        path:'/create-product',
        element:<CreateProduct/>
    },
    {
        path:"/products",
        element:<ProductsData/>

    },
    {
        path:"/details/:id",
        element:<ProductDetails/>

    },
    {
        path:"/all-products",
        element:<AllProducts/>

    },
    {
        path:"/users",
        element:<UsersData/>

    },
    {
     path: "/order",
     element:<OrderVerification/>
    },
    {
     path: "/my-order",
     element:<ViewOrder/>
    },
    {
     path: "/all-orders",
     element:<Orders/>
    },

    {
        path: "/login",
        element:<Login/>
    },
    {
        path: "/about",
        element:<About/>
    },
    {
        path: "/change-Password",
        element:<ChangePassword/>
    },
    {
        path: "/register",
        element:<Register/>
    },
    
])
export default router;