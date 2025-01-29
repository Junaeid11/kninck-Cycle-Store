
import { NavLink } from "react-router-dom";

export interface ICycle {
  _id: string,
  inStock: boolean;
  name: string;
  price: number;
  description: string;
  quantity: number;
  image?: string;
  brand: string;
  type: string
}

export function ProductCard({ product }: { product: ICycle }) {
  return (
    <div className="">
     <div className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg bg-base-content  shadow-md duration-300 hover:scale-105 hover:shadow-lg">
  <img className="h-48 w-full object-cover object-center" src={product.image} alt="Product Image" />
  <p className="text-white text-end  rounded-2xl p-1.5 text-[10px] mx-auto absolute right-1 font-bold">{product.inStock ? (
          <h1 className="text-green-500">Stock available</h1>
        ) : (
          <h1 className="text-red-500">Stock unavailable</h1>
        )}</p>
  <div className="p-4">
    <h2 className="mb-2 text-lg font-medium text-gray-900">{product.name}</h2>
    <div className="flex justify-between">
    
    <div className="flex items-center my-2">
      <h1>Type:</h1>
      <h2 className=" text-lg font-medium text-red-500">{product.type}</h2>
    </div>
    </div>
    <p className="mb-2 text-base  text-gray-700">Brand:{product.brand}</p>
    <div className="flex justify-between">
      <p className="mr-2 text-xl font-bold  text-gray-900 ">${product.price}</p>
      
     <NavLink to={`/details/${product._id}`}>
     <button className="btn btn-primary" >
          Details
        </button>
     </NavLink>
    </div>
  </div>
</div>
    </div>
  );
}
