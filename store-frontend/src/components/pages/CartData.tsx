/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShoppingBagIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Badge } from "../ui/badge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
    clearCart,
  removeFromCart,
  updateQuantity,
} from "../../redux/services/auth/cartSlice";


import { useCreateOrderMutation } from "../../redux/services/API/orderManegmentApi";
import { toast, Toaster } from "sonner";
import { Button } from "antd";


export const CartData = () => {
    const dispatch = useAppDispatch();
    const cartData = useAppSelector((state) => state.cart);
    const [createOrder] = useCreateOrderMutation();
 
    
  const onSubmit = async () => {
            const toastId = toast.loading("Placing your order...");
            const products = cartData.items.map((item) => ({
                product: item.product,
                quantity: item.quantity,
              }));
          
               const order ={
                products
               }
          
            try {
              const res = await createOrder(order);  
              if (res.error) {
                toast.error(`Empty Credential`, { id: toastId });
              } else {
                dispatch(clearCart())
                toast.success("Order placed successfully!", { id: toastId });


                if(res.data){
                  window.location.href = res.data.data
                }
                

              }
            } catch (err: any) {
              toast.error(err.message || "Failed to place order", { id: toastId });
            }
          
      };
      
  
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="link" className="relative">
            <ShoppingBagIcon className="h-6 w-6" />
            <Badge className="absolute right-0 top-0 bg-red-600 text-white rounded-full text-xs p-1">
              {cartData.totalQuantity}
            </Badge>
          </Button>
        </SheetTrigger>
  
        <SheetContent className="flex flex-col gap-4 p-6 bg-white  shadow-lg rounded-lg max-w-md">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="text-xl font-semibold text-black">
              Your Cart
            </SheetTitle>
            <SheetDescription className="text-sm text-gray-500">
              Review your items and proceed to checkout.
            </SheetDescription>
          </SheetHeader>
  
          <div className="flex-1 overflow-y-auto">
            {cartData.items.length > 0 ? (
              <ul className="space-y-4">
                {cartData.items.map((item) => (
                  <li key={item.product} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-16 w-16 rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm text-black font-medium">
                        {item.name}
                      </h4>
                      <div className="flex text-black items-center gap-2 mt-1">
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.product,
                                quantity: Math.max(item.quantity - 1, 1),
                              })
                            )
                          }
                          className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                          -
                        </button>
                        <span className="text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            dispatch(
                              updateQuantity({
                                id: item.product,
                                quantity: item.quantity + 1,
                              })
                            )
                          }
                          className="w-6 h-6 bg-gray-200 text-black rounded hover:bg-gray-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-semibold text-gray-800">
                      ${(item.quantity * item.price)}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.product))}
                      className="text-red-600 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            )}
  
            <div className="border-b my-3"></div>
  
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Total Quantity:
              </span>
              <span className="text-lg font-bold text-black">
                {cartData.totalQuantity}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-gray-700">
                Total Price:
              </span>
              <span className="text-lg font-bold text-black">
                ${cartData.totalPrice.toFixed()}
              </span>
            </div>
          </div>
              <button className="btn btn-primary " onClick={onSubmit}>Buy now</button>
        </SheetContent>
        <Toaster richColors/>
      </Sheet>
      
    );
  };
  