/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Skeleton } from "antd";
import { useGetOrdersQuery, useUpdateOrderMutation, useDeleteOrderMutation } from "../../redux/services/API/orderManegmentApi";
import { toast, Toaster } from "sonner";
import Header from "../../components/pages/Header";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/services/auth/authSlice";
import { Badge } from "../../components/ui/badge";


export interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

export interface Product {
  product: string;
  quantity: number;
  _id: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: string;
  products: Product[];
  totalPrice: number;
  status: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Orders = () => {
  const { isLoading, data, error, refetch } = useGetOrdersQuery(undefined);
  const [updateOrderData] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const jwtUser = useAppSelector(selectCurrentUser) as { role: string } | null;
  const orderData: Order[] = data?.data || [];

  const handleAcceptOrder = async (orderId: string) => {
    try {
      const updateOrder = {
        id: orderId,
        data: { orderStatus: "Accepted" },
      };
      
       await updateOrderData(updateOrder).unwrap();
      toast.success("Order updated successfully!");
      refetch();
      
    }   
    catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to update the order.");
    }
  };
  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Order deleted successfully!");
      refetch();
    } catch (err: any) {
      toast.error(err?.message || "Failed to delete the order.");
    }
  };
  


  if (error) {
    toast.error("Failed to load data");
  }

  return (
    <div className="text-black">
      <Header />
      {isLoading ? (
        <Skeleton />
      ) : (
        <div className="mx-auto text-black p-10 space-y-8">
          {orderData
            .filter(() => jwtUser?.role === "admin")
            .map((order) => (
              <div
                key={order._id}
                className="border bg-base-content p-4 rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Customer Information</h3>
                    <p>User ID: {order?._id}</p>
                    <h3 className="font-semibold">Order Summary</h3>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    <p>
                      Order Status:
                      <Badge
                        className={
                          order.orderStatus === "Accepted"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }
                      >
                        {order.orderStatus}
                      </Badge>
                    </p>
                    <p>Status: {order.status}</p>
                    <p>
                      Order Date: {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mt-4">Products</h3>
                  <ul className="list-disc pl-5">
                    {order.products.map((product, i) => (
                      <li key={i}>
                        Product ID: {product.product}, Quantity:{" "}
                        {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mt-4">Transaction Details</h3>
                  <p>Transaction ID: {order.transaction.id}</p>
                  <p>Payment Method: {order.transaction.method}</p>
                  <div className=" mt-4">
                    <button
                      className="btn btn-primary mx-2"
                      onClick={() => handleAcceptOrder(order._id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn bg-red-500 mx-2"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button>
                     <Toaster richColors/>
                  </div>
                </div>
              </div>
              
            ))}
        </div>
      )}
     
    </div>
  );
};

export default Orders;
