import { useGetOrdersQuery } from "../../redux/services/API/orderManegmentApi";
import { toast } from "sonner";
import Header from "../../components/pages/Header";
import Skeleton from "../singleComponent/Skeleton/Skeleton";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/services/auth/authSlice";

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

export interface User {
  _id: string;
  email: string;
}

export interface Order {
  transaction: Transaction;
  _id: string;
  user: User;
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const ViewOrder = () => {
  const { isLoading, data, error } = useGetOrdersQuery(undefined);

  const orders: Order[] = data?.data || [];
  const jwtUser = useAppSelector(selectCurrentUser) as { email: string, role: string } | null;

  if (error) {
    toast.error("Failed to load data");
  }

  return (
    <div className="text-black">
      <Header />
      <div className="flex justify-end mb-4">
      </div>

      {isLoading ? (
        <Skeleton />

      ) : error ? (
        <div className="text-red-500 text-center mt-4">Order not placed</div>
      ) : (
        <div className="mx-auto text-black p-10 space-y-8">
          {orders
            .filter((order) => order?.user?.email === jwtUser?.email && jwtUser?.role !== "admin").map((order) => (
              <div
                key={order._id}
                className="border bg-base-content p-4 rounded-lg shadow-sm"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold">Customer Information</h3>
                    <p>User Email: {order.user?.email}</p>
                    <h3 className="font-semibold">Order Summary</h3>
                    <p>Total Price: ${order.totalPrice.toFixed(2)}</p>
                    <p>Status: {order.status}</p>
                    <p>Order Date: {new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mt-4">Products</h3>
                  <ul className="list-disc pl-5">
                    {order.products.map((product, i) => (
                      <li key={i}>
                        Product ID: {product.product}, Quantity: {product.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mt-4">Transaction Details</h3>
                  <p>Transaction ID: {order.transaction.id}</p>
                  <p>Payment Method: {order.transaction.method}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
