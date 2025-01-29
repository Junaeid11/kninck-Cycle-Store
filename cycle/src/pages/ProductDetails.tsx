
import { useParams } from "react-router-dom";
import Header from "../components/pages/Header"
import {  useGetSingleProductQuery } from "../redux/services/API/productMangementApi"
import { useAppDispatch } from "../redux/hooks";
import { addToCart } from "../redux/services/auth/cartSlice";
import { Skeleton } from "antd";

const ProductDetails = () => {
    const dispatch = useAppDispatch()

    const { id } = useParams();
    const { data, isLoading } = useGetSingleProductQuery(id);


    console.log(data)
    const handleAddCart = async () => {
        dispatch(
            addToCart({
                product: data.data._id,
                name: data.data.name,
                price: data.data.price,
                quantity: 1,
                image: data.data.image || '',



            })

        )
       

  
    }

    return (
        <div>
            <Header />
            {isLoading ? (
            <Skeleton />
          ) : (
            <div className="hero-content flex-col lg:flex-row p-5">

            <img
              src={data.data.image}
              className="max-w-lg rounded-lg p-5"
              alt={data.name}
            />
            <div className="ml-6 flex text-black flex-col justify-between">
              <h1 className="text-5xl text-black font-bold mb-4">{data.data.name}</h1>
              <p className="py-6 text-lg">{data.data.description}</p>
              <span className="flex items-center text-center mb-4">
                <h1 className="text-xl ">Brand: </h1>
                <h2 className="text-2xl mb-1 font-bold text-red-500 ">{data.data.brand}</h2>
              </span>
    
              <span className="flex items-center text-center mb-4">
                <h1 className="text-lg ">Type: </h1>
                <h2 className="text-2xl font-bold  ">{data.data.type}</h2>
              </span>
          
              <span className="flex items-center text-center mb-4">
                <h1 className="text-xl ">Available Quantity: </h1>
                <h2 className="text-2xl font-bold ">{data.data.quantity}</h2>
              </span>
              <span className="flex items-center text-center mb-4">
                <h1 className="text-xl ">Price: </h1>
                <h2 className="text-2xl font-bold ">${data.data.price}</h2>
              </span>
            
              
    
           
              <button
                onClick={handleAddCart}
                className="btn btn-primary bg-blue-500 text-white hover:bg-blue-700 rounded-lg px-6 py-2"
              >
                Add to Cart
              </button>
            </div>
          </div>
          )
        }

        </div>
    )
}

export default ProductDetails