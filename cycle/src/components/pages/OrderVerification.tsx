import {  Link, useSearchParams } from "react-router-dom";
import { useVerifyOrderQuery } from "../../redux/services/API/orderManegmentApi";
import { OrderData } from "../../types/orderTypes";
import Skeleton from "../singleComponent/Skeleton/Skeleton";
import { Card, CardContent,  CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import logo from "../../assets/—Pngtree—logo bike cycling mtb isolated_5209109.png";






const OrderVerification = () => {
    const [params] = useSearchParams()
    const { data, isLoading } = useVerifyOrderQuery(params.get("order_id"))
    const orderData : OrderData = data?.data?.[0]



    return isLoading ? (
        <Skeleton />
      ) : (
        <div className="container pt-10  text-black mx-auto p-4">
         
          <div className="lg:w-130 justify-center mx-auto">
            <Card className=" bg-red-500 rounded-2xl">
            <div className="flex place-content-center pt-10">
            <img src={logo}
                className="h-10 w-20 object-cover rounded-full"
            /><h1 className="text-white text-center font-extrabold text-3xl "> Krinck Store</h1>
            
            </div>
            <CardHeader >
                <CardTitle> <h1 className="font-black">Customer Information</h1></CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <dl className="grid grid-cols-2 gap-2">
                  <dt className="font-semibold">Name:</dt>
                  <dd>{orderData?.name}</dd>
                  <dt className="font-semibold">Email:</dt>
                  <dd>{orderData?.email}</dd>
                  <dt className="font-semibold">Phone:</dt>
                  <dd>{orderData?.phone_no}</dd>
                </dl>
              </CardContent>
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <dl className="grid grid-cols-2 gap-2">
                  <dt className="font-semibold">Order ID:</dt>
                  <dd>{orderData?.order_id}</dd>
                  <dt className="font-semibold">Amount:</dt>
                  <dd>
                    {orderData?.currency} {orderData?.amount?.toFixed(2)}
                  </dd>
                  <dt className="font-semibold">Status:</dt>
                  <dd>
                    <Badge
                    className={orderData?.bank_status === "Success"
                        ? "bg-green-500"
                        : "bg-red-500"}
                    >
                      {orderData?.bank_status}
                    </Badge>
                  </dd>
                  <dt className="font-semibold">Date:</dt>
                  <dd>{new Date(orderData?.date_time)?.toLocaleString()}</dd>
                </dl>
              </CardContent>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent className="text-white">
                <dl className="grid grid-cols-2 gap-2">
                  <dt className="font-semibold">Method:</dt>
                  <dd>{orderData?.method}</dd>
                  <dt className="font-semibold">Transaction ID:</dt>
                  <dd>{orderData?.bank_trx_id}</dd>
                  <dt className="font-semibold">Invoice No:</dt>
                  <dd>{orderData?.invoice_no}</dd>
                  <dt className="font-semibold">SP Code:</dt>
                  <dd>{orderData?.sp_code}</dd>
                  <dt className="font-semibold">SP Message:</dt>
                  <dd>{orderData?.sp_message}</dd>
                </dl>
                <div className="lg:text-right">
            <Link to="/">
             <button className="btn btn-primary ">Home</button>
             </Link>
            </div>
              </CardContent>
          
             
              
            </Card>
          </div>
        </div>
      );

}

export default OrderVerification
